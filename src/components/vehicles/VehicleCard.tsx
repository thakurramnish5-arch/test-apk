import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Users } from "lucide-react";
import { AvailabilityBadge, Badge } from "@/components/ui/Badge";
import { categoryMap } from "@/data/categories";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";
import type { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  /** Hint for next/image sizing when used in narrower grids. */
  sizes?: string;
  priority?: boolean;
}

export function VehicleCard({
  vehicle,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: VehicleCardProps) {
  const category = categoryMap[vehicle.category];

  return (
    <article className="group card-surface relative flex flex-col overflow-hidden hover:-translate-y-1 hover:border-forest-300 hover:shadow-lg">
      {/* Image */}
      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-charcoal-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} available for booking in ${vehicle.location}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="forest" className="bg-white/95 shadow-sm">
            {category.name}
          </Badge>
        </div>
        <div className="absolute right-3 top-3">
          <AvailabilityBadge
            availability={vehicle.availability}
            className="bg-white/95 shadow-sm"
          />
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[15px] font-bold leading-snug text-charcoal-900">
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="transition-colors before:absolute before:inset-0 hover:text-forest-700"
            >
              {vehicle.name}
            </Link>
          </h3>
        </div>

        {/* Meta */}
        <dl className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
          <div className="flex items-center gap-1.5 text-charcoal-600">
            <Users
              className="h-3.5 w-3.5 shrink-0 text-charcoal-400"
              aria-hidden="true"
            />
            <dt className="sr-only">Capacity</dt>
            <dd className="truncate">{vehicle.capacity}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-charcoal-600">
            <MapPin
              className="h-3.5 w-3.5 shrink-0 text-charcoal-400"
              aria-hidden="true"
            />
            <dt className="sr-only">Location</dt>
            <dd className="truncate">{vehicle.location}</dd>
          </div>
        </dl>

        {/* Suitable for */}
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-charcoal-500">
          <span className="font-semibold text-charcoal-700">Suitable for: </span>
          {vehicle.suitableFor.join(", ")}
        </p>

        {/* Price + actions */}
        <div className="mt-auto pt-4">
          <p className="mb-3 text-[13px] font-semibold text-charcoal-700">
            Fair rate · Quote on WhatsApp
          </p>

          {/* Above the card-wide link overlay so both remain clickable */}
          <div className="relative z-10 flex items-center gap-2">
            <a
              href={generalWhatsAppUrl(`the ${vehicle.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-forest-700 px-3 text-[13px] font-semibold text-white transition-colors hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700"
              aria-label={`Enquire about the ${vehicle.name} on WhatsApp`}
            >
              Enquire Now
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={telHref}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-charcoal-300 text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
              aria-label={`Call to book the ${vehicle.name}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
