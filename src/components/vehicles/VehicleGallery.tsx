"use client";

import Image from "next/image";
import { useState } from "react";
import { photoCredits } from "@/data/photoCredits";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
  images: string[];
  vehicleName: string;
}

/** Large image with selectable thumbnails. */
export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [];

  if (gallery.length === 0) return null;

  const credit = photoCredits[gallery[active]];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-charcoal-100 shadow-sm">
        <Image
          src={gallery[active]}
          alt={`${vehicleName} — view ${active + 1} of ${gallery.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {credit && (
        <p className="mt-1.5 text-[11px] text-charcoal-400">
          Photo:{" "}
          <a
            href={credit.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {credit.author}
          </a>
          , {credit.license}, via Wikimedia Commons (edited)
        </p>
      )}

      {gallery.length > 1 && (
        <div
          className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4"
          role="group"
          aria-label={`${vehicleName} image gallery`}
        >
          {gallery.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1} of ${vehicleName}`}
              aria-pressed={active === index}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border-2 bg-charcoal-100 transition-all",
                active === index
                  ? "border-forest-600 ring-2 ring-forest-600/20"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 640px) 15vw, 30vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
