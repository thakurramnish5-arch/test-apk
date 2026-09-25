"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index of the question expanded on first render. */
  defaultOpen?: number;
}

export function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    items[defaultOpen]?.id ?? null,
  );

  return (
    <div className="divide-y divide-charcoal-200 overflow-hidden rounded-xl border border-charcoal-200 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-charcoal-50 sm:px-5"
              >
                <span className="text-[14px] font-semibold text-charcoal-900 sm:text-[15px]">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-charcoal-500 transition-transform duration-200",
                    isOpen && "rotate-180 text-forest-700",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4 sm:px-5"
            >
              <p className="text-[13px] leading-relaxed text-charcoal-600 sm:text-sm">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
