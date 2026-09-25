import type { Service } from "@/types";

/**
 * Services offered from Salooni. `icon` maps to a Lucide icon in
 * components/shared/Icon.tsx — add the icon there when adding a service.
 */
export const services: Service[] = [
  {
    id: "s-1",
    title: "Tourist Trips from Salooni",
    description:
      "Cars, 7-seaters and travellers for Dalhousie, Khajjiar, Chamba and longer Himachal trips like Manali or Shimla.",
    icon: "Mountain",
  },
  {
    id: "s-2",
    title: "Station & Airport Drops",
    description:
      "Drop and pickup for Pathankot railway station and airport, Kangra airport at Gaggal, Amritsar and Jammu.",
    icon: "Plane",
  },
  {
    id: "s-3",
    title: "Local Trips & Chamba Runs",
    description:
      "Day vehicles around Salooni, Kihar and Bhandal valley, and to Chamba for hospital, office or market work.",
    icon: "Route",
  },
  {
    id: "s-4",
    title: "Outstation Travel",
    description:
      "Trips from Salooni to Dharamshala, Amritsar, Jammu, Chandigarh, Delhi and other cities.",
    icon: "Route",
  },
  {
    id: "s-5",
    title: "Family Trips & Pilgrimage",
    description:
      "Bigger vehicles for families and groups, including Bharmour and Manimahesh yatra trips.",
    icon: "Users",
  },
  {
    id: "s-6",
    title: "Office & Government Work",
    description:
      "Vehicles for office visits, site inspections and staff movement around Salooni tehsil and Chamba.",
    icon: "Briefcase",
  },
  {
    id: "s-7",
    title: "Goods from Chamba or Pathankot",
    description:
      "Pickups and trucks for shop stock and trader goods brought from Chamba or Pathankot to Salooni.",
    icon: "Package",
  },
  {
    id: "s-8",
    title: "House Shifting",
    description:
      "Household shifting in and out of Salooni, with a vehicle sized to your load and the road at both ends.",
    icon: "Boxes",
  },
  {
    id: "s-9",
    title: "JCB & Construction Material",
    description:
      "JCB with operator for digging and levelling, plus trucks for sand, cement and other building material.",
    icon: "HardHat",
  },
  {
    id: "s-10",
    title: "Tractors for Farm Work",
    description:
      "Tractors with trolley and attachments for fields, orchards and local haulage around Salooni.",
    icon: "Tractor",
  },
  {
    id: "s-11",
    title: "Functions & Local Events",
    description:
      "Guest pickups from nearby villages for functions, melas and family events, with more than one vehicle if needed.",
    icon: "CalendarDays",
  },
  {
    id: "s-12",
    title: "Wedding Vehicles",
    description:
      "Cars for the groom, and buses or Tempo Travellers for the baraat and guests, across all wedding days.",
    icon: "Heart",
  },
];
