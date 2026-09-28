import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import { validateEnquiry } from "@/lib/validation";
import { formatDate, formatTime } from "@/lib/whatsapp";
import type { EnquiryDetails } from "@/types";

export const runtime = "nodejs";

/*
 * Receives an enquiry from any form on the site and emails it to the
 * booking team through Gmail.
 *
 * Set these in Vercel → Settings → Environment Variables (never in .env,
 * which is committed):
 *   GMAIL_USER          the Gmail address that sends the email
 *   GMAIL_APP_PASSWORD  a Google "App password" for that account
 *   ENQUIRY_EMAIL_TO    where enquiries arrive (defaults to GMAIL_USER)
 */

const TEXT_FIELDS: (keyof EnquiryDetails)[] = [
  "name",
  "phone",
  "vehicleType",
  "pickupLocation",
  "dropLocation",
  "fromDate",
  "toDate",
  "pickupTime",
  "tripType",
  "passengers",
  "purpose",
  "message",
  "vehicleName",
];

/** Keeps only known string fields, trimmed and capped, from untrusted JSON. */
function readEnquiry(body: Record<string, unknown>): EnquiryDetails {
  const details: Record<string, unknown> = {};
  for (const key of TEXT_FIELDS) {
    const value = body[key];
    details[key] = typeof value === "string" ? value.trim().slice(0, 1000) : "";
  }
  details.isAdvanceBooking = body.isAdvanceBooking === true;
  return details as unknown as EnquiryDetails;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Label/value rows for the email, skipping anything left empty. */
function enquiryRows(d: EnquiryDetails): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Name", d.name],
    ["Mobile", d.phone && `+91 ${d.phone}`],
    ["Vehicle", d.vehicleName],
    ["Vehicle Type", d.vehicleType],
    ["Passengers", d.passengers],
    ["Pickup", d.pickupLocation],
    ["Drop", d.dropLocation],
    ["Trip", d.tripType],
    ["From", formatDate(d.fromDate)],
    ["To", formatDate(d.toDate)],
    ["Pickup Time", formatTime(d.pickupTime)],
    ["Purpose", d.purpose],
    ["Message", d.message],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

function buildEmail(d: EnquiryDetails) {
  const kind = d.isAdvanceBooking ? "Advance Booking" : "New Enquiry";
  const subject = `${kind}: ${d.vehicleName || d.vehicleType} — ${d.name} (+91 ${d.phone})`;
  const rows = enquiryRows(d);

  const text = [
    `${kind} from the website`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const tel = `tel:+91${d.phone}`;
  const wa = `https://wa.me/91${d.phone}`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;color:#1f2937">
  <h2 style="margin:0 0 4px;color:#1e4d3a">${kind}</h2>
  <p style="margin:0 0 16px;color:#6b7280;font-size:13px">
    Received from ${escapeHtml(siteConfig.brand.name)} website
  </p>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${rows
      .map(
        ([label, value]) => `
    <tr>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:130px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td>
    </tr>`,
      )
      .join("")}
  </table>
  <p style="margin:20px 0 0">
    <a href="${tel}" style="display:inline-block;padding:10px 18px;background:#1e4d3a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Call customer</a>
    &nbsp;
    <a href="${wa}" style="display:inline-block;padding:10px 18px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">WhatsApp customer</a>
  </p>
</div>`;

  return { subject, text, html };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Bots that do get a
  // normal-looking reply so they do not retry.
  if (typeof body.website === "string" && body.website) {
    return Response.json({ ok: true });
  }

  const enquiry = readEnquiry(body);
  const errors = validateEnquiry(enquiry, {
    requireContact: true,
    requirePhone: true,
    requirePickup: true,
    requireFromDate: true,
    requireVehicleType: true,
  });
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Invalid details.", errors }, { status: 422 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("Enquiry email not sent: GMAIL_USER / GMAIL_APP_PASSWORD missing");
    return Response.json({ error: "Email is not set up." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${siteConfig.brand.name} Website" <${user}>`,
      to: process.env.ENQUIRY_EMAIL_TO || user,
      ...buildEmail(enquiry),
    });
  } catch (error) {
    console.error("Enquiry email failed", error);
    return Response.json({ error: "Could not send." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
