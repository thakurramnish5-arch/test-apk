import { siteConfig } from "@/config/site";
import type { EnquiryDetails, JcbEnquiryDetails } from "@/types";

/** Formats an ISO date (yyyy-mm-dd) as "12 Oct 2026". Falls back to raw input. */
export function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Converts 24h "08:00" into "08:00 AM". Falls back to raw input. */
export function formatTime(value?: string): string {
  if (!value) return "";
  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  if (Number.isNaN(hour) || minutePart === undefined) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(displayHour).padStart(2, "0")}:${minutePart} ${suffix}`;
}

/**
 * Builds the formatted WhatsApp enquiry message.
 * Only fields the customer actually filled in are included.
 */
export function buildEnquiryMessage(details: EnquiryDetails): string {
  const heading = details.isAdvanceBooking
    ? "*Advance Vehicle Booking Enquiry*"
    : "*New Vehicle Booking Enquiry*";

  const lines: string[] = [heading, ""];

  // The short hero widget sends only a couple of fields, so every line is
  // conditional — the message never carries empty labels.
  const contact: string[] = [];
  if (details.name.trim()) contact.push(`Name: ${details.name.trim()}`);
  if (details.phone.trim()) contact.push(`Phone: +91 ${details.phone.trim()}`);
  if (contact.length) {
    lines.push("*Customer Details*", ...contact, "");
  }

  const booking: string[] = [];
  if (details.vehicleName) booking.push(`Vehicle: ${details.vehicleName}`);
  if (details.vehicleType) booking.push(`Vehicle Type: ${details.vehicleType}`);
  if (details.pickupLocation.trim())
    booking.push(`Pickup: ${details.pickupLocation.trim()}`);
  if (details.dropLocation?.trim())
    booking.push(`Drop: ${details.dropLocation.trim()}`);
  if (details.tripType) booking.push(`Trip: ${details.tripType}`);
  if (details.fromDate) booking.push(`From: ${formatDate(details.fromDate)}`);
  if (details.tripType === "Round Trip" && details.toDate)
    booking.push(`Return: ${formatDate(details.toDate)}`);
  if (details.pickupTime)
    booking.push(`Time: ${formatTime(details.pickupTime)}`);
  if (details.passengers) booking.push(`Passengers: ${details.passengers}`);
  if (booking.length) {
    lines.push("*Booking Details*", ...booking);
  }

  if (details.purpose) {
    lines.push("", "*Purpose*", details.purpose);
  }

  if (details.message?.trim()) {
    lines.push("", "*Additional Requirement*", details.message.trim());
  }

  lines.push("", "Please share availability and quotation.");

  return lines.join("\n");
}

/** Returns a wa.me URL with the message correctly URL-encoded. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Convenience: enquiry object straight to a ready-to-open WhatsApp URL. */
export function buildEnquiryWhatsAppUrl(details: EnquiryDetails): string {
  return buildWhatsAppUrl(buildEnquiryMessage(details));
}

export function buildJcbEnquiryMessage(details: JcbEnquiryDetails): string {
  const heading = details.isAdvanceBooking
    ? "*JCB Advance Booking*"
    : "*New JCB / Excavator Enquiry*";

  const lines: string[] = [
    heading,
    "",
    "*Customer Details*",
    `Name: ${details.name.trim()}`,
    `Phone: +91 ${details.phone.trim()}`,
    "",
    "*Work & Machine*",
    `Machine: ${details.machineType}`,
    `Work location: ${details.workLocation.trim()}`,
    `Work type: ${details.workType}`,
    `Date: ${formatDate(details.requiredDate)}`,
    `Start time: ${formatTime(details.startTime)}`,
    `Working hours: ${details.workingHours}${
      details.workingHours === "Multiple Days"
        ? ` (${details.numberOfDays} days)`
        : ""
    }`,
    `Operator: ${details.operatorRequired}`,
    `Diesel: ${details.dieselOption}`,
    `Site access: ${details.siteAccess}`,
  ];

  if (details.additionalDetails?.trim()) {
    lines.push("", "*Additional Details*", details.additionalDetails.trim());
  }

  lines.push("", "Please share availability and quotation.");
  return lines.join("\n");
}

export function buildJcbEnquiryWhatsAppUrl(details: JcbEnquiryDetails): string {
  return buildWhatsAppUrl(buildJcbEnquiryMessage(details));
}

/** WhatsApp URL for a general (non-form) enquiry. */
export function generalWhatsAppUrl(context?: string): string {
  const message = context
    ? `Hello ${siteConfig.brand.name}, I would like to enquire about ${context}. Please share availability and booking details.`
    : `Hello ${siteConfig.brand.name}, I would like to enquire about a vehicle booking. Please share availability and booking details.`;
  return buildWhatsAppUrl(message);
}

/** tel: link for every call button on the site. */
export const telHref = `tel:${siteConfig.contact.phoneNumber}`;
