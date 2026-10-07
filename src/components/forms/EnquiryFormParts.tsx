"use client";

import { cn } from "@/lib/utils";

/*
 * Date and time inputs ignore `placeholder`, so an empty one shows a blank
 * box on phones. This draws the hint over the input until a value is picked
 * (or, on desktop, until it is focused for typing).
 */
export function PickerInput({
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
