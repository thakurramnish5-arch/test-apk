import type { CategoryInfo, VehicleCategory } from "@/types";

/**
 * DEMO DATA — vehicle categories.
 * Replace images and copy here to change the "Choose Your Ride" section,
 * listing filters and footer links all at once.
 */
export const categories: CategoryInfo[] = [
  {
    id: "car",
    name: "Car",
    pluralName: "Cars",
    description:
      "Local taxis from Alto, WagonR and Dzire to 7-seaters like Ertiga, Bolero, Scorpio and Innova — for families, village roads, Chamba runs and station drops.",
    suitableUse: "Chamba trips, Pathankot drops, Bharmour yatra, outstation",
    capacityNote: "4-9 passengers",
    image:
      "/vehicles/innova.jpg",
  },
  {
    id: "pickup",
    name: "Pickup",
    pluralName: "Pickups",
    description:
      "Tata Ace, Bolero Pickup and Camper for house shifting, shop stock and goods from Chamba or Pathankot.",
    suitableUse: "Shifting, trader goods, local supply runs",
    capacityNote: "750 kg-1.5 tonne payload",
    image:
      "/vehicles/bpickup.jpg",
  },
  {
    id: "truck",
    name: "Truck",
    pluralName: "Trucks",
    description:
      "Tata 407, tippers and 10-wheelers for heavy goods and building material like sand, bajri and cement.",
    suitableUse: "Construction material, heavy loads, Pathankot cargo",
    capacityNote: "2.5-10 tonne payload",
    image:
      "/vehicles/tipper.jpg",
  },
  {
    id: "bus",
    name: "Bus",
    pluralName: "Buses",
    description:
      "Tempo Travellers and buses for baraat and wedding guests, school trips and group yatras.",
    suitableUse: "Weddings, functions, pilgrimage groups",
    capacityNote: "12-35 passengers",
    image:
      "/vehicles/traveller.jpg",
  },
  {
    id: "tractor",
    name: "Tractor",
    pluralName: "Tractors",
    description:
      "Tractors with operator for fields, orchards and local haulage around Salooni villages.",
    suitableUse: "Farming, orchard work, trolley haulage",
    capacityNote: "40-50 HP range",
    image:
      "/vehicles/trolley.jpg",
  },
  {
    id: "jcb",
    name: "JCB",
    pluralName: "JCB & Heavy Equipment",
    description:
      "JCB with an experienced operator for house foundations, site levelling and local road or drain work.",
    suitableUse: "Foundations, site levelling, road and drain work",
    capacityNote: "Operator included",
    image:
      "/vehicles/jcb.jpg",
  },
];

export const categoryMap: Record<VehicleCategory, CategoryInfo> =
  categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<VehicleCategory, CategoryInfo>,
  );

/** Vehicle type options used by every enquiry form on the site. */
export const vehicleTypeOptions = categories.map((c) => c.name);

/** Categories that carry people rather than cargo or site equipment. */
const passengerCategories: VehicleCategory[] = ["car", "bus"];

/**
 * Vehicle types for passenger travel only — used by the destination trip
 * enquiry, where a pickup, truck, tractor or JCB is never the answer.
 */
export const passengerVehicleTypeOptions = categories
  .filter((c) => passengerCategories.includes(c.id))
  .map((c) => c.name);
