import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * Server-only helpers for the Meta Graph API, used by the WhatsApp
 * coexistence connect flow and the webhook. Never import from a client
 * component — they read the app secret.
 */

export const GRAPH_API_VERSION = process.env.WHATSAPP_API_VERSION || "v23.0";

/** Compares two secrets without leaking their contents through timing. */
export function secretsMatch(given: string | null | undefined, expected: string | undefined): boolean {
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Checks Meta's X-Hub-Signature-256 header against the raw request body. */
export function isValidMetaSignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !header) return false;
  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  return secretsMatch(header, expected);
}

export interface GraphResult {
  ok: boolean;
  status: number;
  data: unknown;
}

/** Calls the Graph API and returns the parsed JSON, never throwing. */
export async function graphRequest(
  path: string,
  token: string,
  init: { method?: "GET" | "POST"; body?: Record<string, unknown> } = {},
): Promise<GraphResult> {
  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${path}`, {
      method: init.method ?? "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init.body && { "Content-Type": "application/json" }),
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: AbortSignal.timeout(15_000),
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 0, data: { error: String(error) } };
  }
}
