"use client";

import { useEffect, useId, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MoveRight,
  MessageCircle,
  Phone,
  Repeat,
  Send,
  Users,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  passengerVehicleTypeOptions,
  vehicleTypeOptions,
} from "@/data/categories";
import { buildEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { telHref } from "@/lib/whatsapp";
import { cn, todayISO } from "@/lib/utils";
import { validateEnquiry, type EnquiryErrors } from "@/lib/validation";
import type { BookingPurpose, EnquiryDetails, TripType } from "@/types";

const purposeOptions: BookingPurpose[] = [
  "Tourism",
  "Family Trip",
  "Business",
  "Goods Transportation",
  "Shifting",
  "Construction",
  "Agriculture",
  "Event/Wedding",
  "Other",
];

/** Reasons someone travels to a destination — no cargo or site work. */
const travelPurposeOptions: BookingPurpose[] = [
  "Tourism",
  "Family Trip",
  "Business",
  "Event/Wedding",
  "Other",
];

const tripTypeOptions: {
  value: TripType;
  label: string;
  icon: typeof Repeat;
}[] = [
  { value: "One Way", label: "One Way", icon: MoveRight },
  { value: "Round Trip", label: "Round Trip", icon: Repeat },
];

/** Most enquiries are for a car, so the selector starts there. */
const DEFAULT_VEHICLE_TYPE = "Car";

/** Vehicle types that carry people, so the form asks how many. */
const PASSENGER_VEHICLE_TYPES = ["Car", "Bus"];

/** Largest passenger count per type: a car here seats up to 9 (Tata Sumo). */
const MAX_PASSENGERS: Record<string, number> = { Car: 9, Bus: 60 };

type Status = "idle" | "submitting" | "success" | "error";

interface EnquiryFormProps {
  /**
   * "compact" — the hero widget (fewer fields, dense layout).
   * "full"    — the contact page form with grouped sections.
   * "modal"   — the full field set without its own card chrome, for a dialog.
   */
  variant?: "compact" | "full" | "modal";
  /** Drops the compact card's border, padding and shadow when it sits inside another card. */
  bare?: boolean;
  /** Pre-selects a vehicle type, e.g. from a vehicle detail page. */
  defaultVehicleType?: string;
  /** Pre-fills the drop location, e.g. from a destination card. */
  defaultDropLocation?: string;
  /** Pre-fills the pickup location, e.g. on a local area page. */
  defaultPickupLocation?: string;
  /**
   * Narrows the vehicle-type and purpose lists to passenger travel.
   * A trip to a destination is never a JCB, tractor or truck job.
   */
  passengerOnly?: boolean;
  /** Names a specific vehicle in the enquiry. */
  vehicleName?: string;
  className?: string;
  /** Renders on a dark background (hero overlay). */
  tone?: "light" | "dark";
}

const emptyValues: EnquiryDetails = {
  name: "",
  phone: "",
  vehicleType: "",
  pickupLocation: "",
  dropLocation: "",
  fromDate: "",
  toDate: "",
  pickupTime: "",
  tripType: "One Way",
  passengers: "",
  purpose: "",
  message: "",
};

export function EnquiryForm({
  variant = "full",
  bare = false,
  defaultVehicleType = "",
  defaultDropLocation = "",
  defaultPickupLocation = "",
  passengerOnly = false,
  vehicleName,
  className,
  tone = "light",
}: EnquiryFormProps) {
  const uid = useId();
  const isCompact = variant === "compact";
  // The dialog draws its own border, padding and heading, so the form
  // inside it renders bare.
  const isModal = variant === "modal";
  const vehicleTypes = passengerOnly
    ? passengerVehicleTypeOptions
    : vehicleTypeOptions;
  const purposes = passengerOnly ? travelPurposeOptions : purposeOptions;
  const initialVehicleType =
    defaultVehicleType ||
    (vehicleTypes.includes(DEFAULT_VEHICLE_TYPE) ? DEFAULT_VEHICLE_TYPE : "");

  const [values, setValues] = useState<EnquiryDetails>({
    ...emptyValues,
    vehicleType: initialVehicleType,
    pickupLocation: defaultPickupLocation,
    dropLocation: defaultDropLocation,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<EnquiryDetails | null>(null);
  /** Set when the email could not be sent, so the visitor can use WhatsApp. */
  const [sendFailed, setSendFailed] = useState(false);
  /** Hidden honeypot field — only bots fill it in. */
  const [website, setWebsite] = useState("");

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  const asksPassengers = PASSENGER_VEHICLE_TYPES.includes(values.vehicleType);

  const update = (name: keyof EnquiryDetails, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
      // A car count is not a bus count, so switching type starts it fresh.
      ...(name === "vehicleType" && { passengers: "" }),
    }));
    // Clear the error for a field as soon as the user corrects it
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (advanceBooking: boolean) => {
    if (status === "submitting") return;
    const payload: EnquiryDetails = {
      ...values,
      // The hero widget does not show these, so never send stale values.
      ...(isCompact && { pickupTime: "" }),
      ...(!asksPassengers && { passengers: "" }),
      vehicleName,
      isAdvanceBooking: advanceBooking,
    };

    // Each variant validates only what it renders: the widget asks for the
    // journey and contact details, the full form additionally for vehicle
    // type and purpose.
    const validationErrors = validateEnquiry(payload, {
      // The enquiry arrives by email, so every form needs a name and number
      // for the driver to call back on.
      requireContact: true,
      requirePhone: true,
      requirePickup: true,
      requireFromDate: true,
      // Every surface now shows the vehicle type field, so all of them
      // validate it.
      requireVehicleType: true,
      requirePurpose: !isCompact,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      // Move focus to the first invalid field for keyboard/screen reader users
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(fieldId(firstKey))?.focus();
      return;
    }

    setErrors({});
    setSendFailed(false);
    setStatus("submitting");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website }),
      });
      if (!response.ok) throw new Error(`Enquiry failed: ${response.status}`);
    } catch {
      setSubmitted(payload);
      setSendFailed(true);
      setStatus("idle");
      return;
    }

    setSubmitted(payload);
    setStatus("success");
    // The form starts fresh behind the confirmation, ready for another one.
    setValues({
      ...emptyValues,
      vehicleType: initialVehicleType,
      pickupLocation: defaultPickupLocation,
      dropLocation: defaultDropLocation,
    });
  };

  const resetForm = () => {
    setValues({
      ...emptyValues,
      vehicleType: initialVehicleType,
      pickupLocation: defaultPickupLocation,
      dropLocation: defaultDropLocation,
    });
    setSubmitted(null);
    setSendFailed(false);
    setStatus("idle");
    setErrors({});
  };

  // ---------------------------------------------------------- success state
  const successContent = submitted && (
    <div className="py-4 text-center" role="status" aria-live="polite">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 ring-8 ring-forest-50/50">
        <CheckCircle2 className="h-9 w-9 text-forest-600" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-charcoal-900">
        Thank you, {submitted.name.split(" ")[0]}!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-charcoal-600">
        Your {submitted.isAdvanceBooking ? "advance booking" : "enquiry"} has
        reached our team. A driver will call you shortly on{" "}
        <strong className="font-semibold text-charcoal-800">
          +91 {submitted.phone}
        </strong>{" "}
        with availability and the rate.
      </p>
      <p className="mt-3 text-xs text-charcoal-500">
        Need it urgently? Call us right away.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Button onClick={resetForm} size="lg">
          Done
        </Button>
        <LinkButton href={telHref} variant="outline" size="lg">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </LinkButton>
      </div>
    </div>
  );

  // Inside a dialog the confirmation replaces the form; everywhere else it
  // pops up over the page.
  if (isModal && status === "success") {
    return <div className={className}>{successContent}</div>;
  }

  const successDialog = (
    <Modal
      open={status === "success"}
      onClose={resetForm}
      title="Enquiry submitted"
    >
      {successContent}
    </Modal>
  );

  const isSubmitting = status === "submitting";
  const hasErrors = Object.keys(errors).length > 0;

  // ------------------------------------------------------------ form fields
  const nameField = (
    <Field
      id={fieldId("name")}
      label="Full Name"
      error={errors.name}
      errorId={errorId("name")}
      required
    >
      <input
        id={fieldId("name")}
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your full name"
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        className={cn("field-input", errors.name && "field-input-error")}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? errorId("name") : undefined}
        required
      />
    </Field>
  );

  const phoneField = (
    <Field
      id={fieldId("phone")}
      label="Mobile Number"
      error={errors.phone}
      errorId={errorId("phone")}
      required
    >
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-charcoal-200 px-3 text-sm font-semibold text-charcoal-600"
          aria-hidden="true"
        >
          +91
        </span>
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="98765 43210"
          value={values.phone}
          // Digits only, 10 at most. A pasted "+91 98765-43210" or
          // "098765 43210" is trimmed down to the 10-digit number.
          // Indian mobiles start with 6-9, so any other first digit is
          // refused as it is typed, with the reason shown straight away.
          onChange={(e) => {
            const phone = e.target.value
              .replace(/\D/g, "")
              .replace(/^(?:91|0)(?=\d{10}$)/, "")
              .slice(0, 10);
            if (/^[0-5]/.test(phone)) {
              setErrors((prev) => ({
                ...prev,
                phone: "Mobile number must start with 6, 7, 8 or 9.",
              }));
              return;
            }
            update("phone", phone);
          }}
          className={cn(
            "field-input pl-14",
            errors.phone && "field-input-error",
          )}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? errorId("phone") : undefined}
          required
        />
      </div>
    </Field>
  );

  const vehicleField = (
    <Field
      id={fieldId("vehicleType")}
      label="Vehicle Type"
      error={errors.vehicleType}
      errorId={errorId("vehicleType")}
      required
    >
      <select
        id={fieldId("vehicleType")}
        name="vehicleType"
        value={values.vehicleType}
        onChange={(e) => update("vehicleType", e.target.value)}
        className={cn("field-input", errors.vehicleType && "field-input-error")}
        aria-invalid={!!errors.vehicleType}
        aria-describedby={
          errors.vehicleType ? errorId("vehicleType") : undefined
        }
        required
      >
        <option value="">Select vehicle type</option>
        {vehicleTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );

  const pickupField = (
    <Field
      id={fieldId("pickupLocation")}
      label="Pickup Location"
      error={errors.pickupLocation}
      errorId={errorId("pickupLocation")}
      icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
      required
    >
      <input
        id={fieldId("pickupLocation")}
        name="pickupLocation"
        type="text"
        placeholder="e.g. Salooni"
        value={values.pickupLocation}
        onChange={(e) => update("pickupLocation", e.target.value)}
        className={cn(
          "field-input",
          errors.pickupLocation && "field-input-error",
        )}
        aria-invalid={!!errors.pickupLocation}
        aria-describedby={
          errors.pickupLocation ? errorId("pickupLocation") : undefined
        }
        required
      />
    </Field>
  );

  const dropField = (
    <Field
      id={fieldId("dropLocation")}
      label="Drop Location"
      error={errors.dropLocation}
      errorId={errorId("dropLocation")}
      icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
    >
      <input
        id={fieldId("dropLocation")}
        name="dropLocation"
        type="text"
        placeholder="e.g. Pathankot"
        value={values.dropLocation}
        onChange={(e) => update("dropLocation", e.target.value)}
        className={cn(
          "field-input",
          errors.dropLocation && "field-input-error",
        )}
        aria-invalid={!!errors.dropLocation}
        aria-describedby={
          errors.dropLocation ? errorId("dropLocation") : undefined
        }
      />
    </Field>
  );

  const tripTypeField = (
    <div>
      <span id={fieldId("tripType")} className="field-label">
        Trip Type
      </span>
      <div
        role="radiogroup"
        aria-labelledby={fieldId("tripType")}
        className="grid grid-cols-2 gap-1 rounded-xl border border-charcoal-200 bg-charcoal-50 p-1"
      >
        {tripTypeOptions.map(({ value, label, icon: Icon }) => {
          const selected = values.tripType === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => update("tripType", value)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200",
                selected
                  ? "bg-forest-700 text-white shadow-sm"
                  : "text-charcoal-600 hover:bg-white hover:text-charcoal-900",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const fromDateField = (
    <Field
      id={fieldId("fromDate")}
      label="From Date"
      error={errors.fromDate}
      errorId={errorId("fromDate")}
      required
    >
      <PickerInput
        placeholder="Select date"
        id={fieldId("fromDate")}
        name="fromDate"
        type="date"
        min={todayISO()}
        value={values.fromDate}
        onChange={(e) => update("fromDate", e.target.value)}
        className={cn("field-input", errors.fromDate && "field-input-error")}
        aria-invalid={!!errors.fromDate}
        aria-describedby={errors.fromDate ? errorId("fromDate") : undefined}
        required
      />
    </Field>
  );

  const toDateField = (
    <Field
      id={fieldId("toDate")}
      label={values.tripType === "Round Trip" ? "Return Date" : "To Date"}
      error={errors.toDate}
      errorId={errorId("toDate")}
    >
      <PickerInput
        placeholder="Select date"
        id={fieldId("toDate")}
        name="toDate"
        type="date"
        min={values.fromDate || todayISO()}
        value={values.toDate}
        onChange={(e) => update("toDate", e.target.value)}
        className={cn("field-input", errors.toDate && "field-input-error")}
        aria-invalid={!!errors.toDate}
        aria-describedby={errors.toDate ? errorId("toDate") : undefined}
      />
    </Field>
  );

  const timeField = (
    <Field
      id={fieldId("pickupTime")}
      label="Pickup Time"
      icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}
    >
      <PickerInput
        placeholder="Select time"
        id={fieldId("pickupTime")}
        name="pickupTime"
        type="time"
        value={values.pickupTime}
        onChange={(e) => update("pickupTime", e.target.value)}
        className="field-input"
      />
    </Field>
  );

  // Shown only for a car or bus, where the head count decides the vehicle.
  const maxPassengers = MAX_PASSENGERS[values.vehicleType] ?? 60;
  const passengersField = asksPassengers && (
    <Field
      id={fieldId("passengers")}
      label="Passengers"
      error={errors.passengers}
      errorId={errorId("passengers")}
      icon={<Users className="h-3.5 w-3.5" aria-hidden="true" />}
    >
      <input
        id={fieldId("passengers")}
        name="passengers"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        placeholder={`1 to ${maxPassengers}`}
        value={values.passengers}
        // Digits only — letters and symbols are dropped as they are typed.
        onChange={(e) =>
          update("passengers", e.target.value.replace(/\D/g, ""))
        }
        className={cn("field-input", errors.passengers && "field-input-error")}
        aria-invalid={!!errors.passengers}
        aria-describedby={errors.passengers ? errorId("passengers") : undefined}
      />
    </Field>
  );

  const purposeField = (
    <Field
      id={fieldId("purpose")}
      label="Purpose of Booking"
      error={errors.purpose}
      errorId={errorId("purpose")}
      required={!isCompact}
    >
      <select
        id={fieldId("purpose")}
        name="purpose"
        value={values.purpose}
        onChange={(e) => update("purpose", e.target.value)}
        className={cn("field-input", errors.purpose && "field-input-error")}
        aria-invalid={!!errors.purpose}
        aria-describedby={errors.purpose ? errorId("purpose") : undefined}
      >
        <option value="">Select purpose</option>
        {purposes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );

  const messageField = (
    <Field
      id={fieldId("message")}
      label={isCompact ? "Additional Requirement" : "Additional Message"}
    >
      <textarea
        id={fieldId("message")}
        name="message"
        rows={isCompact ? 2 : 3}
        placeholder="Luggage space, child seat, specific route, load details…"
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        className="field-input resize-none"
      />
    </Field>
  );

  const honeypot = (
    <input
      type="text"
      name="website"
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );

  const sendError = sendFailed && submitted && (
    <div
      className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-800"
      role="alert"
    >
      <p className="flex items-start gap-2 font-medium">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          Your enquiry could not be sent right now. Please try again, or send
          it to us on WhatsApp or by phone.
        </span>
      </p>
      <div className="mt-2.5 flex gap-2">
        <LinkButton
          href={buildEnquiryWhatsAppUrl(submitted)}
          variant="whatsapp"
          size="sm"
          external
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </LinkButton>
        <LinkButton href={telHref} variant="outline" size="sm">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </LinkButton>
      </div>
    </div>
  );

  const errorSummary = hasErrors && (
    <div
      className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Please correct the highlighted{" "}
        {Object.keys(errors).length === 1 ? "field" : "fields"} and try again.
      </span>
    </div>
  );

  const actions = (
    <div className="flex flex-row gap-2.5">
      <Button
        onClick={() => handleSubmit(false)}
        disabled={isSubmitting}
        size="lg"
        fullWidth
        className="min-w-0 flex-1 basis-0 px-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              <span className="@[27rem]/form:hidden">Enquire Now</span>
              <span className="hidden @[27rem]/form:inline">
                Start an Enquiry
              </span>
            </span>
          </>
        )}
      </Button>
      <Button
        onClick={() => handleSubmit(true)}
        disabled={isSubmitting}
        variant="soft"
        size="lg"
        fullWidth
        className="min-w-0 flex-1 basis-0 px-3"
      >
        <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="truncate">
          <span className="@[27rem]/form:hidden">Book Advance</span>
          <span className="hidden @[27rem]/form:inline">Book in Advance</span>
        </span>
      </Button>
    </div>
  );

  // -------------------------------------------------------- compact (hero)
  if (isCompact) {
    return (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(false);
        }}
        className={cn(
          "@container/form bg-white",
          !bare &&
            "rounded-2xl border border-charcoal-200 p-4 shadow-xl sm:p-5",
          className,
        )}
        aria-label="Quick vehicle enquiry"
      >
        {/* A bare form sits inside a card that already has its own heading */}
        {!bare && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-charcoal-900">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-600" />
                </span>
                <RotatingHeadline />
              </h2>
              <p className="mt-0.5 text-xs text-charcoal-500">
                Car, bus, truck, tractor or JCB — fill this in and a driver
                calls you back with the rate.
              </p>
            </div>
          </div>
        )}

        {/*
          Vehicle type comes first — it is the one thing that decides which
          vehicle we look for. The rest is the journey and how to reach you.
        */}
        {honeypot}
        {/* Small phones get one field per row; two columns once there's room */}
        <div className="grid grid-cols-1 gap-3 @[19rem]/form:grid-cols-2">
          {nameField}
          {phoneField}
          {/* Vehicle type spans the row unless passengers sits beside it */}
          <div
            className={cn(
              "min-w-0",
              !asksPassengers && "@[19rem]/form:col-span-2",
            )}
          >
            {vehicleField}
          </div>
          {passengersField}
          {pickupField}
          {dropField}
          <div className="@[19rem]/form:col-span-2">{tripTypeField}</div>
          {fromDateField}
          {toDateField}
        </div>

        <div className="mt-4 space-y-3">
          {errorSummary}
          {sendError}
          {actions}
        </div>
        {successDialog}
      </form>
    );
  }

  // ---------------------------------------------------------- full variant
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(false);
      }}
      className={cn(
        "@container/form bg-white",
        isModal
          ? ""
          : "rounded-2xl border border-charcoal-200 p-5 shadow-lg sm:p-7",
        !isModal && tone === "dark" && "border-white/15",
        className,
      )}
      aria-label="Vehicle booking enquiry form"
    >
      {honeypot}
      <fieldset disabled={isSubmitting} className="space-y-7">
        <FormSection
          step="01"
          title="Personal Information"
          description="So our booking team can reach you."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {nameField}
            {phoneField}
          </div>
        </FormSection>

        <FormSection
          step="02"
          title="Journey Information"
          description="Where you are going and when."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cn(!asksPassengers && "sm:col-span-2")}>
              {vehicleField}
            </div>
            {passengersField}
            {pickupField}
            {dropField}
            <div className="sm:col-span-2">{tripTypeField}</div>
            {fromDateField}
            {toDateField}
            {timeField}
          </div>
        </FormSection>

        <FormSection
          step="03"
          title="Your Requirement"
          description="Anything that helps us pick the right vehicle."
        >
          <div className="grid gap-4">
            {purposeField}
            {messageField}
          </div>
        </FormSection>
      </fieldset>

      <div className="mt-4 space-y-3">
        {errorSummary}
        {sendError}
        {actions}
        <p className="text-center text-xs text-charcoal-500">
          Your details go straight to our booking team and a driver calls you
          back. No payment is taken at this stage.
        </p>
      </div>
      {!isModal && successDialog}
    </form>
  );
}

// ------------------------------------------------------------- sub-components

const HEADLINES = [
  "Bookings Open — What Do You Need?",
  "Going Anywhere? Book Your Ride Now",
  "Any Route, Any Vehicle — Book Today",
  "From Anywhere to Anywhere — We Drive",
];

/*
  Cycles the form heading every 3s. Every line sits in the same grid cell,
  so the box is always as tall as the longest one and nothing around it moves.
*/
function RotatingHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HEADLINES.length),
      3000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="grid min-w-0">
      <span className="sr-only">{HEADLINES[0]}</span>
      {HEADLINES.map((line, i) => (
        <span
          key={line}
          aria-hidden="true"
          className={cn(
            "col-start-1 row-start-1 transition-all duration-500",
            i === index ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          {line}
        </span>
      ))}
    </span>
  );
}

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-2 flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-xs font-bold text-forest-700">
          {step}
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-charcoal-900">{title}</h3>
          <p className="text-xs text-charcoal-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

/*
 * Date and time inputs ignore `placeholder`, so an empty one shows a blank
 * box on phones. This draws the hint over the input until a value is picked
 * (or, on desktop, until it is focused for typing).
 */
function PickerInput({
  placeholder,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { placeholder: string }) {
  const empty = !props.value;
  return (
    <div className="relative">
      <input
        {...props}
        data-empty={empty || undefined}
        className={cn("peer", className)}
      />
      {empty && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-base text-charcoal-400 peer-focus:hidden sm:text-sm"
        >
          {placeholder}
        </span>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  errorId,
  icon,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId?: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    // min-w-0 lets the field shrink inside a grid column — iOS date inputs
    // otherwise push past it
    <div className="min-w-0">
      <label htmlFor={id} className="field-label">
        <span className="inline-flex items-center gap-1.5">
          {icon}
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>
      {children}
      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
