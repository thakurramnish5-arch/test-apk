import { mkdir, appendFile } from "fs/promises";
import path from "path";
import type { JcbEnquiryDetails } from "@/types";
import type { JcbPriceBreakdown } from "@/lib/jcb-pricing";

/** Flat record shape for JSONL / future database import. */
export interface StoredJcbLead {
  vehicle_type: "JCB";
  name: string;
  phone: string;
  machine_type: string;
  work_location: string;
  work_type: string;
  required_date: string;
  start_time: string;
  working_hours: string;
  number_of_days: string;
  operator_required: string;
  diesel_option: string;
  site_access: string;
  additional_details: string;
  booking_type: "enquiry" | "advance";
  vehicle_name?: string;
  pricing?: JcbPriceBreakdown | null;
  created_at: string;
}

function toStoredLead(
  details: JcbEnquiryDetails,
  pricing: JcbPriceBreakdown | null,
): StoredJcbLead {
  return {
    vehicle_type: "JCB",
    name: details.name,
    phone: details.phone,
    machine_type: details.machineType,
    work_location: details.workLocation,
    work_type: details.workType,
    required_date: details.requiredDate,
    start_time: details.startTime,
    working_hours: details.workingHours,
    number_of_days: details.numberOfDays,
    operator_required: details.operatorRequired,
    diesel_option: details.dieselOption,
    site_access: details.siteAccess,
    additional_details: details.additionalDetails ?? "",
    booking_type: details.isAdvanceBooking ? "advance" : "enquiry",
    vehicle_name: details.vehicleName,
    pricing,
    created_at: new Date().toISOString(),
  };
}

/**
 * Optional JSONL persistence when LEADS_DATA_DIR is set (e.g. on a VPS).
 * On serverless hosts without writable disk, enquiries still arrive by email.
 */
export async function storeJcbLead(
  details: JcbEnquiryDetails,
  pricing: JcbPriceBreakdown | null,
): Promise<void> {
  const dir = process.env.LEADS_DATA_DIR;
  if (!dir) return;

  const record = toStoredLead(details, pricing);

  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "jcb-leads.jsonl"),
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
}
