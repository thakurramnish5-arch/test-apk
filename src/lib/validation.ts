import type { EnquiryDetails } from "@/types";

export type EnquiryErrors = Partial<Record<keyof EnquiryDetails, string>>;

/** Indian mobile numbers: exactly 10 digits, starting 6-9. */
export function isValidIndianPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.trim());
}

/** True when the value is 10 digits, whatever it starts with. */
function isTenDigits(value: string): boolean {
  return /^\d{10}$/.test(value.trim());
}

export interface ValidationOptions {
  /**
   * Which fields the surface actually renders. A form must never demand a
   * field it did not show — the widget omits vehicle type and purpose, which
   * only exist on the full form.
   */
  requireContact?: boolean;
  /** Mobile number is part of the contact details unless explicitly off. */
  requirePhone?: boolean;
  requireVehicleType?: boolean;
  requirePickup?: boolean;
  requireFromDate?: boolean;
  requireDrop?: boolean;
  requireToDate?: boolean;
  requirePurpose?: boolean;
}

/**
 * Shared validation for the hero widget and the full enquiry form so
 * both surfaces report identical, user-friendly messages.
 * A field is only validated when the calling form displays it.
 */
export function validateEnquiry(
  values: EnquiryDetails,
  options: ValidationOptions = {},
): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const requirePhone = options.requirePhone ?? options.requireContact;

  if (options.requireContact) {
    if (!values.name.trim()) {
      errors.name = "Please enter your name.";
    } else if (values.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }
  }

  if (requirePhone) {
    if (!values.phone.trim()) {
      errors.phone = "Please enter your mobile number.";
    } else if (!isValidIndianPhone(values.phone)) {
      errors.phone = isTenDigits(values.phone)
        ? "Indian mobile numbers start with 6, 7, 8 or 9."
        : "Enter a valid 10-digit Indian mobile number.";
    }
  } else if (values.phone.trim() && !isValidIndianPhone(values.phone)) {
    // Optional, but still checked when the visitor chooses to fill it in.
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  if (options.requireVehicleType && !values.vehicleType) {
    errors.vehicleType = "Please select a vehicle type.";
  }

  if (options.requirePickup && !values.pickupLocation.trim()) {
    errors.pickupLocation = "Please enter a pickup location.";
  }

  if (options.requireDrop && !values.dropLocation?.trim()) {
    errors.dropLocation = "Please enter a drop location.";
  }

  if (options.requireFromDate && !values.fromDate) {
    errors.fromDate = "Please choose a start date.";
  }

  if (options.requireToDate && !values.toDate) {
    errors.toDate = "Please choose an end date.";
  }

  if (values.fromDate && values.toDate && values.toDate < values.fromDate) {
    errors.toDate = "End date cannot be before the start date.";
  }

  if (options.requirePurpose && !values.purpose) {
    errors.purpose = "Please select the purpose of booking.";
  }

  if (values.passengers) {
    const count = Number(values.passengers);
    const max = values.vehicleType === "Car" ? 9 : 60;
    if (!/^\d+$/.test(values.passengers) || count < 1) {
      errors.passengers = "Enter a valid number of passengers.";
    } else if (count > max) {
      errors.passengers =
        values.vehicleType === "Car"
          ? "A car seats up to 9. For more people, choose Bus."
          : `Enter up to ${max} passengers.`;
    }
  }

  return errors;
}
