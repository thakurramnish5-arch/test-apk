"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { categories } from "@/data/categories";
import { vehicles } from "@/data/vehicles";
import { cn } from "@/lib/utils";
import type { VehicleCategory } from "@/types";

type CategoryFilter = VehicleCategory | "all";

const tabs: { id: CategoryFilter; label: string; count: number }[] = [
  { id: "all", label: "All", count: vehicles.length },
  ...categories.map((c) => ({
    id: c.id,
    label: c.id === "jcb" ? "JCB" : c.pluralName,
    count: vehicles.filter((v) => v.category === c.id).length,
  })),
];

export function VehicleBrowser() {
  const searchParams = useSearchParams();
  // Deep links such as /vehicles?category=car preselect the category.
  // SUVs were merged into cars, so old ?category=suv links land on cars.
  const requestedCategory = searchParams.get("category") ?? "all";
  const initialCategory =
    requestedCategory === "suv" ? "car" : requestedCategory;

  const [category, setCategory] = useState<CategoryFilter>(
    tabs.some((t) => t.id === initialCategory)
      ? (initialCategory as CategoryFilter)
      : "all",
  );

  const selectCategory = (id: CategoryFilter) => {
    setCategory(id);
    // Keep the URL shareable without triggering a navigation.
    const url = id === "all" ? "/vehicles" : `/vehicles?category=${id}`;
    window.history.replaceState(null, "", url);
  };

  const filtered =
    category === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.category === category);

  return (
    <div>
      {/* Category tabs — one horizontal scroll row on phones */}
      <div
        role="tablist"
        aria-label="Vehicle category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const active = category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(tab.id)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                active
                  ? "border-forest-700 bg-forest-700 text-white"
                  : "border-charcoal-300 bg-white text-charcoal-700 hover:border-forest-400 hover:text-forest-700",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-bold",
                  active
                    ? "bg-white/20 text-white"
                    : "bg-charcoal-100 text-charcoal-500",
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div
        className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        aria-live="polite"
      >
        {filtered.map((vehicle, index) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
