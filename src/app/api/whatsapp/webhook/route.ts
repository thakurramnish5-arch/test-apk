import { isValidMetaSignature, secretsMatch } from "@/lib/metaGraph";

export const runtime = "nodejs";

/*
 * WhatsApp Cloud API webhook.
 *
 * GET  — Meta's one-time verification when the Callback URL is saved in
 *        App Dashboard → WhatsApp → Configuration.
 * POST — event notifications (messages, history, smb_app_state_sync,
 *        smb_message_echoes, account_update). Each is signature-checked
 *        and summarised in the server log; chats stay in the WhatsApp
 *        Business app, so nothing is stored here.
 *
 * Needs WHATSAPP_WEBHOOK_VERIFY_TOKEN and META_APP_SECRET.
 */

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  if (
    params.get("hub.mode") === "subscribe" &&
    secretsMatch(params.get("hub.verify_token"), process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN)
  ) {
    return new Response(params.get("hub.challenge") ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

interface WebhookChange {
  field?: string;
  value?: Record<string, unknown>;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!isValidMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    console.error("WhatsApp webhook: invalid or missing signature");
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody) as { entry?: { changes?: WebhookChange[] }[] };
    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value ?? {};
        // Counts only — the payloads carry customers' messages and numbers.
        const counts = Object.fromEntries(
          Object.entries(value)
            .filter(([, item]) => Array.isArray(item))
            .map(([key, item]) => [key, (item as unknown[]).length]),
        );
        if (change.field === "account_update") {
          console.warn("WhatsApp webhook: account_update", value);
        } else {
          console.info("WhatsApp webhook:", change.field, counts);
        }
      }
    }
  } catch (error) {
    console.error("WhatsApp webhook: could not read payload", error);
  }

  // Always acknowledge quickly, or Meta retries and eventually disables it.
  return new Response("OK", { status: 200 });
}
