"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  sizes?: string;
  /** Detailed variant adds the description and "popular for" tags. */
  detailed?: boolean;
}

export function DestinationCard({
  destination,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  detailed = false,
}: DestinationCardProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <article
      id={destination.slug}
      className="group card-surface relative flex h-full scroll-mt-24 flex-col overflow-hidden hover:-translate-y-1 hover:border-forest-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
        <Image
          src={destination.image}
          alt={`View of ${destination.name}, ${destination.region}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-lg font-bold text-white">
            {destination.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {destination.region}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {detailed && (
          <p className="text-[13px] leading-relaxed text-charcoal-600">
            {destination.description}
          </p>
        )}

        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-charcoal-700">
          <Navigation
            className="h-3.5 w-3.5 shrink-0 text-forest-600"
            aria-hidden="true"
          />
          {destination.driveNote}
        </p>

        {detailed && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {destination.popularFor.map((item) => (
              <li
                key={item}
                className="rounded-md bg-charcoal-100 px-2 py-0.5 text-[11px] font-medium text-charcoal-600"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => setIsEnquiryOpen(true)}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-charcoal-300 px-3 text-[13px] font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:bg-forest-50 hover:text-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
          >
            Plan a trip to {destination.name}
          </button>
        </div>
      </div>

      <Modal
        open={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        title={`Plan a trip to ${destination.name}`}
        description={`${destination.region} · ${destination.driveNote}`}
      >
        <EnquiryForm
          variant="modal"
          defaultDropLocation={destination.name}
          passengerOnly
        />
      </Modal>
    </article>
  );
}
