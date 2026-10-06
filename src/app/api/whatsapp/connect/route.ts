import { GRAPH_API_VERSION, graphRequest, secretsMatch, type GraphResult } from "@/lib/metaGraph";

export const runtime = "nodejs";

/*
 * Finishes WhatsApp Business app coexistence onboarding after the admin
 * completes Embedded Signup on /admin/whatsapp-connect.
 *
 * Coexistence keeps the number on the WhatsApp Business app, so this route
 * deliberately does NOT call /register (that would log the phone app out).
 * It only:
 *   1. exchanges the Embedded Signup code for a business token,
 *   2. subscribes this app to the WhatsApp account's webhooks,
 *   3. starts the one-time contacts and chat-history sync (Meta requires
 *      both within 24 hours of onboarding),
 *   4. reads back the number's status so the result can be checked.
 *
 * Needs META_APP_ID, META_APP_SECRET and ADMIN_CONNECT_SECRET.
 */

const isGraphId = (value: unknown): value is string =>
  typeof value === "string" && /^\d{5,25}$/.test(value);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!secretsMatch(typeof body.key === "string" ? body.key : null, process.env.ADMIN_CONNECT_SECRET)) {
    return Response.json({ error: "Not allowed." }, { status: 403 });
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    return Response.json({ error: "META_APP_ID / META_APP_SECRET missing." }, { status: 503 });
  }

  const { code, wabaId, phoneNumberId } = body;
  if (typeof code !== "string" || !code || !isGraphId(wabaId) || !isGraphId(phoneNumberId)) {
    return Response.json({ error: "Missing code, WABA ID or phone number ID." }, { status: 422 });
  }

  // 1. The code expires about 30 seconds after Embedded Signup returns it.
  const exchangeUrl = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/oauth/access_token`);
  exchangeUrl.search = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    code,
  }).toString();
  let businessToken: string | undefined;
  try {
    const response = await fetch(exchangeUrl, { signal: AbortSignal.timeout(15_000) });
    const data = await response.json();
    businessToken = data.access_token;
    if (!businessToken) {
      console.error("WhatsApp connect: token exchange failed", data);
      return Response.json({ error: "Token exchange failed.", details: data }, { status: 502 });
    }
  } catch (error) {
    console.error("WhatsApp connect: token exchange failed", error);
    return Response.json({ error: "Token exchange failed." }, { status: 502 });
  }

  const steps: Record<string, GraphResult> = {};

  // 2. Deliver this account's webhooks (messages, history, echoes…) to us.
  steps.subscribeWebhooks = await graphRequest(`${wabaId}/subscribed_apps`, businessToken, {
    method: "POST",
  });

  // 3. One-time syncs — each can only be started once per onboarding.
  steps.syncContacts = await graphRequest(`${phoneNumberId}/smb_app_data`, businessToken, {
    method: "POST",
    body: { messaging_product: "whatsapp", sync_type: "smb_app_state_sync" },
  });
  steps.syncHistory = await graphRequest(`${phoneNumberId}/smb_app_data`, businessToken, {
    method: "POST",
    body: { messaging_product: "whatsapp", sync_type: "history" },
  });

  // 4. Expect is_on_biz_app: true and platform_type: CLOUD_API.
  steps.numberStatus = await graphRequest(
    `${phoneNumberId}?fields=display_phone_number,verified_name,is_on_biz_app,platform_type,status`,
    businessToken,
  );

  console.info("WhatsApp connect finished", { wabaId, phoneNumberId, steps });
  return Response.json({ ok: Object.values(steps).every((step) => step.ok), wabaId, phoneNumberId, steps });
}
