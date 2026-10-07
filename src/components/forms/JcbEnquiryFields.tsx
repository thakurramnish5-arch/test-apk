"use client";

import { AlertCircle, Clock, MapPin } from "lucide-react";
import {
  jcbMachineTypeOptions,
  jcbSiteAccessOptions,
  jcbWorkTypeOptions,
  jcbWorkingHoursOptions,
} from "@/data/jcb-options";
import { cn, todayISO } from "@/lib/utils";
import { nowInIndia } from "@/lib/validation";
import type { JcbEnquiryDetails, JcbEnquiryErrors } from "@/types";
import { PickerInput } from "@/components/forms/EnquiryFormParts";

type JcbEnquiryFieldsProps = {
  values: JcbEnquiryDetails;
  errors: JcbEnquiryErrors;
  fieldId: (name: string) => string;
  errorId: (name: string) => string;
  onChange: (name: keyof JcbEnquiryDetails, value: string) => void;
  /** Compact hero layout vs full form spacing. */
  compact?: boolean;
};

export function JcbEnquiryFields({
  values,
  errors,
  fieldId,
  errorId,
  onChange,
  compact = false,
}: JcbEnquiryFieldsProps) {
  const showDays = values.workingHours === "Multiple Days";
  const now = nowInIndia();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        compact && "@[19rem]/form:grid-cols-2",
        !compact && "sm:grid-cols-2",
      )}
    >
      <Field
        id={fieldId("machineType")}
        label="JCB / Machine Type"
        error={errors.machineType}
        errorId={errorId("machineType")}
        required
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      >
        <select
          id={fieldId("machineType")}
          name="machineType"
          value={values.machineType}
          onChange={(e) => onChange("machineType", e.target.value)}
          className={cn(
            "field-input",
            errors.machineType && "field-input-error",
          )}
          aria-invalid={!!errors.machineType}
          aria-describedby={
            errors.machineType ? errorId("machineType") : undefined
          }
          required
        >
          <option value="">Select machine type</option>
          {jcbMachineTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId("workLocation")}
        label="Work Location"
        error={errors.workLocation}
        errorId={errorId("workLocation")}
        icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
        required
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      >
        <input
          id={fieldId("workLocation")}
          name="workLocation"
          type="text"
          placeholder="e.g. Salooni, Chamba"
          value={values.workLocation}
          onChange={(e) => onChange("workLocation", e.target.value)}
          className={cn(
            "field-input",
            errors.workLocation && "field-input-error",
          )}
          aria-invalid={!!errors.workLocation}
          aria-describedby={
            errors.workLocation ? errorId("workLocation") : undefined
          }
          required
        />
      </Field>

      <Field
        id={fieldId("workType")}
        label="Work Type"
        error={errors.workType}
        errorId={errorId("workType")}
        required
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      >
        <select
          id={fieldId("workType")}
          name="workType"
          value={values.workType}
          onChange={(e) => onChange("workType", e.target.value)}
          className={cn("field-input", errors.workType && "field-input-error")}
          aria-invalid={!!errors.workType}
          aria-describedby={errors.workType ? errorId("workType") : undefined}
          required
        >
          <option value="">Select work type</option>
          {jcbWorkTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId("requiredDate")}
        label="Required Date"
        error={errors.requiredDate}
        errorId={errorId("requiredDate")}
        required
      >
        <PickerInput
          placeholder="Select date"
          id={fieldId("requiredDate")}
          name="requiredDate"
          type="date"
          min={todayISO()}
          value={values.requiredDate}
          onChange={(e) => onChange("requiredDate", e.target.value)}
          className={cn(
            "field-input",
            errors.requiredDate && "field-input-error",
          )}
          aria-invalid={!!errors.requiredDate}
          aria-describedby={
            errors.requiredDate ? errorId("requiredDate") : undefined
          }
          required
        />
      </Field>

      <Field
        id={fieldId("workingHours")}
        label="Expected Working Hours"
        error={errors.workingHours}
        errorId={errorId("workingHours")}
        required
      >
        <select
          id={fieldId("workingHours")}
          name="workingHours"
          value={values.workingHours}
          onChange={(e) => onChange("workingHours", e.target.value)}
          className={cn(
            "field-input",
            errors.workingHours && "field-input-error",
          )}
          aria-invalid={!!errors.workingHours}
          aria-describedby={
            errors.workingHours ? errorId("workingHours") : undefined
          }
          required
        >
          <option value="">Select duration</option>
          {jcbWorkingHoursOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      {showDays && (
        <Field
          id={fieldId("numberOfDays")}
          label="Number of Days"
          error={errors.numberOfDays}
          errorId={errorId("numberOfDays")}
          required
        >
          <input
            id={fieldId("numberOfDays")}
            name="numberOfDays"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={values.numberOfDays}
            onChange={(e) =>
              onChange("numberOfDays", e.target.value.replace(/\D/g, ""))
            }
            className={cn(
              "field-input",
              errors.numberOfDays && "field-input-error",
            )}
            aria-invalid={!!errors.numberOfDays}
            aria-describedby={
              errors.numberOfDays ? errorId("numberOfDays") : undefined
            }
            required
          />
        </Field>
      )}

      <Field
        id={fieldId("startTime")}
        label="Start Time"
        error={errors.startTime}
        errorId={errorId("startTime")}
        icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}
        required
        className={cn(
          showDays && (compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"),
        )}
      >
        <PickerInput
          placeholder="Select time"
          id={fieldId("startTime")}
          name="startTime"
          type="time"
          min={values.requiredDate === now.date ? now.time : undefined}
          value={values.startTime}
          onChange={(e) => onChange("startTime", e.target.value)}
          className={cn("field-input", errors.startTime && "field-input-error")}
          aria-invalid={!!errors.startTime}
          aria-describedby={errors.startTime ? errorId("startTime") : undefined}
          required
        />
      </Field>

      <RadioField
        id={fieldId("operatorRequired")}
        label="Operator Required?"
        error={errors.operatorRequired}
        errorId={errorId("operatorRequired")}
        value={values.operatorRequired}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        onChange={(v) => onChange("operatorRequired", v)}
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      />

      <RadioField
        id={fieldId("dieselOption")}
        label="Diesel"
        error={errors.dieselOption}
        errorId={errorId("dieselOption")}
        value={values.dieselOption}
        options={[
          { value: "Diesel Included", label: "Diesel Included" },
          {
            value: "Customer Will Provide Diesel",
            label: "Customer Will Provide Diesel",
          },
        ]}
        onChange={(v) => onChange("dieselOption", v)}
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      />

      <Field
        id={fieldId("siteAccess")}
        label="Site Access / Road Condition"
        error={errors.siteAccess}
        errorId={errorId("siteAccess")}
        required
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      >
        <select
          id={fieldId("siteAccess")}
          name="siteAccess"
          value={values.siteAccess}
          onChange={(e) => onChange("siteAccess", e.target.value)}
          className={cn(
            "field-input",
            errors.siteAccess && "field-input-error",
          )}
          aria-invalid={!!errors.siteAccess}
          aria-describedby={
            errors.siteAccess ? errorId("siteAccess") : undefined
          }
          required
        >
          <option value="">Select road condition</option>
          {jcbSiteAccessOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId("additionalDetails")}
        label="Additional Details"
        className={compact ? "@[19rem]/form:col-span-2" : "sm:col-span-2"}
      >
        <textarea
          id={fieldId("additionalDetails")}
          name="additionalDetails"
          rows={compact ? 2 : 3}
          placeholder="Describe the work, site condition or any special requirement"
          value={values.additionalDetails ?? ""}
          onChange={(e) => onChange("additionalDetails", e.target.value)}
          className="field-input resize-none"
        />
      </Field>
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
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId?: string;
  icon?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
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
          <AlertCircle
            className="mt-0.5 h-3 w-3 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

function RadioField({
  id,
  label,
  error,
  errorId,
  value,
  options,
  onChange,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  errorId?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <span id={id} className="field-label">
        {label}
        <span className="text-red-500" aria-hidden="true">
          {" "}
          *
        </span>
      </span>
      <div
        role="radiogroup"
        aria-labelledby={id}
        className="grid grid-cols-2 gap-1 rounded-xl border border-charcoal-200 bg-charcoal-50 p-1"
      >
        {options.map(({ value: optValue, label: optLabel }) => {
          const selected = value === optValue;
          return (
            <button
              key={optValue}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(optValue)}
              className={cn(
                "rounded-lg px-2 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
                selected
                  ? "bg-forest-700 text-white shadow-sm"
                  : "text-charcoal-600 hover:bg-white hover:text-charcoal-900",
              )}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle
            className="mt-0.5 h-3 w-3 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}
