/**
 * JCB rates — set numbers here (or later from an admin panel) to enable
 * automatic quote calculation on enquiry. Leave null to quote by phone only.
 */
export interface JcbPricingConfig {
  hourlyRate: number | null;
  halfDayRate: number | null;
  fullDayRate: number | null;
  extraHourRate: number | null;
  multiDayRate: number | null;
  operatorCharge: number | null;
  /** Added when diesel is included in the hire rate. */
  dieselIncludedSurcharge: number | null;
  /** Mobilization / site reach charge for hill roads (Chamba–Salooni). */
  siteMobilizationCharge: number | null;
}

/** Default: no fixed prices shown or calculated until rates are configured. */
export const jcbPricing: JcbPricingConfig = {
  hourlyRate: null,
  halfDayRate: null,
  fullDayRate: null,
  extraHourRate: null,
  multiDayRate: null,
  operatorCharge: null,
  dieselIncludedSurcharge: null,
  siteMobilizationCharge: null,
};
