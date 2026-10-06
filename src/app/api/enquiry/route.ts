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

/** Label/value rows for the trip section, skipping anything left empty. */
function tripRows(d: EnquiryDetails): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Vehicle", d.vehicleName],
    ["Vehicle type", d.vehicleType],
    ["Passengers", d.passengers],
    ["Pickup", d.pickupLocation],
    ["Drop", d.dropLocation],
    ["Trip", d.tripType],
    ["From date", formatDate(d.fromDate)],
    ["Return date", d.tripType === "Round Trip" ? formatDate(d.toDate) : ""],
    ["Pickup time", formatTime(d.pickupTime)],
    ["Purpose", d.purpose],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

/** A button that renders in Gmail, Outlook and phone mail apps alike. */
function emailButton(href: string, label: string, color: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td align="center" bgcolor="${color}" style="border-radius:6px">
        <a href="${href}" style="display:block;padding:10px 8px;font-size:13px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px">${label}</a>
      </td></tr></table>`;
}

function buildEmail(d: EnquiryDetails) {
  const isAdvance = Boolean(d.isAdvanceBooking);
  const kind = isAdvance ? "Advance Booking" : "New Enquiry";
  const vehicle = d.vehicleName || d.vehicleType;
  const route = d.dropLocation
    ? `${d.pickupLocation} → ${d.dropLocation}`
    : d.pickupLocation;
  const subject = `${kind}: ${vehicle}, ${route} — ${d.name}`;
  const rows = tripRows(d);
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    `${kind} from the website (${receivedAt})`,
    "",
    `Name: ${d.name}`,
    `Mobile: +91 ${d.phone}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(d.message ? ["", `Message: ${d.message}`] : []),
  ].join("\n");

  const firstName = d.name.split(" ")[0];
  const tel = `tel:+91${d.phone}`;
  const tripDetails = [
    `🚗 Vehicle: ${vehicle}`,
    `📍 Route: ${route}`,
    d.fromDate && `📅 Date: ${formatDate(d.fromDate)}`,
    d.tripType === "Round Trip" &&
      d.toDate &&
      `🔁 Return date: ${formatDate(d.toDate)}`,
    d.pickupTime && `⏰ Pickup time: ${formatTime(d.pickupTime)}`,
    d.passengers && `👥 Passengers: ${d.passengers}`,
  ].filter(Boolean);
  const wa = `https://wa.me/91${d.phone}?text=${encodeURIComponent(
    [
      `Hello ${firstName} 🙏`,
      `Welcome to ${siteConfig.brand.name}!`,
      "",
      "We have received your enquiry:",
      ...tripDetails,
      "",
      "We will share the vehicle details and price with you shortly.",
      "",
      "Thank you,",
      `Team ${siteConfig.brand.name}`,
    ].join("\n"),
  )}`;
  const accent = isAdvance ? "#b45309" : "#1f5547";
  const summary = [
    vehicle,
    d.passengers && `${d.passengers} passengers`,
    formatDate(d.fromDate),
  ]
    .filter(Boolean)
    .join(" · ");
  const brand = escapeHtml(siteConfig.brand.name);
  const label = (text: string) =>
    `<div style="font-size:11px;font-weight:bold;letter-spacing:0.8px;color:#6b7280;text-transform:uppercase">${text}</div>`;

  const rowHtml = rows
    .map(
      ([name, value], i) => `
          <tr>
            <td width="42%" style="padding:8px 0;${i ? "border-top:1px solid #f0f1f3;" : ""}font-size:13px;color:#6b7280;vertical-align:top">${name}</td>
            <td style="padding:8px 0;${i ? "border-top:1px solid #f0f1f3;" : ""}font-size:13px;font-weight:bold;color:#111827">${escapeHtml(value)}</td>
          </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f5f7">
<tr><td align="center" style="padding:16px 10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:460px;background:#ffffff;border:1px solid #e6e8eb;border-radius:10px;font-family:Arial,Helvetica,sans-serif">

  <tr><td bgcolor="#1f5547" style="padding:12px 18px;border-radius:10px 10px 0 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-size:14px;font-weight:bold;color:#ffffff">${brand}</td>
      <td align="right"><span style="display:inline-block;padding:3px 9px;border-radius:999px;background:${isAdvance ? "#f59e0b" : "#ffffff"};color:${isAdvance ? "#ffffff" : accent};font-size:11px;font-weight:bold">${kind}</span></td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:18px 18px 4px">
    <div style="font-size:18px;font-weight:bold;color:#111827">${escapeHtml(route)}</div>
    <div style="margin-top:3px;font-size:13px;color:#6b7280">${escapeHtml(summary)}</div>
  </td></tr>

  <tr><td style="padding:14px 18px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6faf8;border:1px solid #e1eee7;border-radius:8px">
      <tr><td style="padding:12px 14px">
        ${label("Customer")}
        <div style="margin-top:4px;font-size:15px;font-weight:bold;color:#111827">${escapeHtml(d.name)}</div>
        <div style="font-size:14px;color:#374151">+91 ${d.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px"><tr>
          <td width="50%" style="padding-right:5px">${emailButton(tel, "Call", "#1f5547")}</td>
          <td width="50%" style="padding-left:5px">${emailButton(wa, "WhatsApp", "#1faa59")}</td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:18px 18px 0">
    ${label("Booking details")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px">${rowHtml}
    </table>
  </td></tr>
${
  d.message
    ? `
  <tr><td style="padding:12px 18px 0">
    ${label("Message")}
    <div style="margin-top:6px;padding:10px 12px;background:#f9fafb;border-left:3px solid ${accent};border-radius:4px;font-size:13px;line-height:1.5;color:#374151;white-space:pre-wrap">${escapeHtml(d.message)}</div>
  </td></tr>`
    : ""
}
  <tr><td style="padding:18px;font-size:11px;color:#9ca3af">
    Received ${receivedAt} via ${brand} website
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;

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
