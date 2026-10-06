/*
 * Server-only: sends the "enquiry received" confirmation to the customer
 * through the official Meta WhatsApp Cloud API. Never import this from a
 * client component — it reads the access token.
 *
 * A customer who filled in the website form has not messaged us on
 * WhatsApp, so Meta only allows an approved message template here (free-form
 * text works only inside the 24-hour window after the customer writes to us).
 *
 * Environment variables (set in .env.local and in Vercel, never in .env):
 *   WHATSAPP_ACCESS_TOKEN     permanent system-user token
 *   WHATSAPP_PHONE_NUMBER_ID  the sending number's ID from Meta
 *   WHATSAPP_TEMPLATE_NAME    approved template name (default enquiry_received)
 *   WHATSAPP_TEMPLATE_LANG    template language code (default en)
 *   WHATSAPP_API_VERSION      Graph API version (default v23.0)
 */

/** Normalises an Indian mobile number to "91XXXXXXXXXX", or null if invalid. */
export function normalizeIndianPhone(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `91${digits}` : null;
}

// Best-effort guard against a double-submitted form messaging the customer
// twice. It lives in memory, so it only covers repeats that hit the same
// server instance — which is what an accidental double tap does.
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const recentlySent = new Map<string, number>();

function isDuplicate(to: string): boolean {
  const now = Date.now();
  for (const [number, sentAt] of recentlySent) {
    if (now - sentAt > DUPLICATE_WINDOW_MS) recentlySent.delete(number);
  }
  if (recentlySent.has(to)) return true;
  recentlySent.set(to, now);
  return false;
}

/**
 * Sends the enquiry confirmation template to the customer. Never throws:
 * any failure is logged so the enquiry itself is never affected.
 */
export async function sendEnquiryConfirmation(name: string, phone: string): Promise<void> {
  try {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!token || !phoneNumberId) {
      console.error("WhatsApp confirmation not sent: WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID missing");
      return;
    }

    const to = normalizeIndianPhone(phone);
    if (!to) {
      console.error("WhatsApp confirmation not sent: invalid phone number");
      return;
    }
    if (isDuplicate(to)) {
      console.warn("WhatsApp confirmation skipped: already sent to this number moments ago");
      return;
    }

    const version = process.env.WHATSAPP_API_VERSION || "v23.0";
    const response = await fetch(
      `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: process.env.WHATSAPP_TEMPLATE_NAME || "enquiry_received",
            language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
            components: [
              {
                type: "body",
                parameters: [{ type: "text", text: name.trim() || "there" }],
              },
            ],
          },
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      // Let a later genuine retry go through after a failed attempt.
      recentlySent.delete(to);
      console.error("WhatsApp confirmation failed", response.status, await response.text());
    }
  } catch (error) {
    console.error("WhatsApp confirmation failed", error);
  }
}
