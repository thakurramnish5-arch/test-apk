"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Rendered in the sticky header and announced as the dialog's name. */
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/** Elements that can hold focus inside the dialog, for the focus trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog rendered into document.body.
 * Closes on Escape and on backdrop click, traps Tab focus, and restores
 * focus to whatever opened it.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;

    // Lock background scrolling, compensating for the scrollbar so the
    // page behind the overlay does not shift sideways.
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    // Focus the first field so the customer can start typing straight away.
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    const firstField = panelRef.current?.querySelector<HTMLElement>(
      "input, select, textarea",
    );
    (firstField ?? focusables?.[0] ?? panelRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((item) => item.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="thin-scrollbar fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto overscroll-contain bg-charcoal-950/60 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-4"
      onMouseDown={(event) => {
        // Only a click that starts on the backdrop closes — dragging a text
        // selection out of the panel must not dismiss the form.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId.current}
        tabIndex={-1}
        className={cn(
          "thin-scrollbar relative my-0 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:my-8 sm:max-w-2xl sm:rounded-2xl",
          className,
        )}
      >
        <div className="sticky top-0 z-10 flex items-start gap-4 border-b border-charcoal-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div className="min-w-0 flex-1">
            <h2
              id={titleId.current}
              className="font-display text-lg font-bold text-charcoal-900"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-xs text-charcoal-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-charcoal-100 hover:text-charcoal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-2 sm:px-7 sm:py-2">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
