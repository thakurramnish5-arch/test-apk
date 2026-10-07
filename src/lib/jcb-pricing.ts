import { jcbPricing, type JcbPricingConfig } from "@/data/jcbPricing";
import type { JcbEnquiryDetails } from "@/types";

export interface JcbPriceBreakdown {
  baseLabel: string;
  baseAmount: number;
  operatorAmount: number;
  dieselLabel: string;
  mobilizationAmount: number;
  total: number;
}

function hoursFromOption(workingHours: string): number | null {
  if (workingHours === "2 Hours") return 2;
  if (workingHours === "4 Hours") return 4;
  if (workingHours === "6 Hours") return 6;
  if (workingHours === "8 Hours") return 8;
  if (workingHours === "Full Day") return 8;
  return null;
}

/**
 * Returns a rupee total only when every rate needed for this booking is set.
 * Otherwise null — the team quotes manually (no price shown on the site).
 */
export function calculateJcbPrice(
  details: JcbEnquiryDetails,
  config: JcbPricingConfig = jcbPricing,
): JcbPriceBreakdown | null {
  let baseLabel = "";
  let baseAmount: number | null = null;

  if (details.workingHours === "Multiple Days") {
    const days = Math.max(1, Number(details.numberOfDays) || 1);
    if (config.multiDayRate == null) return null;
    baseLabel = `${days} day(s) @ ₹${config.multiDayRate}/day`;
    baseAmount = config.multiDayRate * days;
  } else if (details.workingHours === "Full Day") {
    if (config.fullDayRate != null) {
      baseLabel = "Full day";
      baseAmount = config.fullDayRate;
    } else if (config.hourlyRate != null) {
      baseLabel = "Full day (8 hrs)";
      baseAmount = config.hourlyRate * 8;
    } else return null;
  } else if (details.workingHours === "4 Hours") {
    if (config.halfDayRate != null) {
      baseLabel = "Half day (4 hrs)";
      baseAmount = config.halfDayRate;
    } else if (config.hourlyRate != null) {
      baseLabel = "4 hours";
      baseAmount = config.hourlyRate * 4;
    } else return null;
  } else if (details.workingHours === "8 Hours") {
    if (config.fullDayRate != null) {
      baseLabel = "8 hours (day rate)";
      baseAmount = config.fullDayRate;
    } else if (config.hourlyRate != null) {
      baseLabel = "8 hours";
      baseAmount = config.hourlyRate * 8;
    } else return null;
  } else {
    const hrs = hoursFromOption(details.workingHours);
    if (hrs == null || config.hourlyRate == null) return null;
    baseLabel = `${hrs} hour(s)`;
    baseAmount = config.hourlyRate * hrs;
  }

  let operatorAmount = 0;
  if (details.operatorRequired === "Yes") {
    if (config.operatorCharge == null) return null;
    operatorAmount = config.operatorCharge;
  }

  const mobilizationAmount = config.siteMobilizationCharge ?? 0;

  let dieselLabel: string = details.dieselOption;
  if (
    details.dieselOption === "Diesel Included" &&
    config.dieselIncludedSurcharge != null
  ) {
    baseAmount += config.dieselIncludedSurcharge;
    dieselLabel = `Diesel included (+₹${config.dieselIncludedSurcharge})`;
  }

  const total = baseAmount + operatorAmount + mobilizationAmount;
  return {
    baseLabel,
    baseAmount,
    operatorAmount,
    dieselLabel,
    mobilizationAmount,
    total,
  };
}
