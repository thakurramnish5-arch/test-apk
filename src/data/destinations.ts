import type { Destination } from "@/types";

/**
 * Trips from Salooni. Every trip starts from Salooni or a nearby village.
 *
 * `driveNote` is deliberately qualitative ("Day trip from Salooni") — no
 * hours or kilometres are published, because road time depends on season,
 * road work and the vehicle. Share the trip and we confirm the details.
 *
 * Images are scenic references. Chamba, Dalhousie, Dharamshala, Manali and
 * Shimla use place-matched photos; Khajjiar, Bharmour and Pathankot reuse
 * generic hill photos until real ones are added. Photos in /public/destinations
 * are from Wikimedia Commons and need their credit in photoCredits.ts.
 */
export const destinations: Destination[] = [
  {
    id: "d-1",
    name: "Chamba",
    slug: "chamba",
    region: "Chamba District",
    description:
      "The district headquarters on the Ravi river. The usual run for hospital visits, office work, shopping and picking up goods.",
    image:
      "https://images.unsplash.com/photo-1552761814-7e3fd0b3aa86?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Day trip from Salooni",
    popularFor: ["Hospital visits", "Chaugan & temples", "Market and goods"],
  },
  {
    id: "d-2",
    name: "Dalhousie",
    slug: "dalhousie",
    region: "Chamba District",
    description:
      "A quiet hill station with pine forests. Easy to add Khajjiar and Banikhet on the same trip.",
    image:
      "https://images.unsplash.com/photo-1733490094009-454bd67f3e2a?w=500&auto=format&fit=crop&q=60",
    driveNote: "Day trip from Salooni",
    popularFor: ["Pine forests", "Banikhet", "Family outings"],
  },
  {
    id: "d-3",
    name: "Khajjiar",
    slug: "khajjiar",
    region: "Chamba District",
    description:
      "An open meadow with forest all around. Often done together with Dalhousie or Chamba in one day.",
    image:
      "https://images.unsplash.com/photo-1713063968789-adf139c4a1eb?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Day trip from Salooni",
    popularFor: ["Meadow", "Khajji Nag temple", "Picnics"],
  },
  {
    id: "d-4",
    name: "Bharmour",
    slug: "bharmour",
    region: "Chamba District",
    description:
      "The old temple town and base for the Manimahesh yatra. Hill roads, so a 7-seater car or traveller is the usual choice.",
    image:
      "https://images.unsplash.com/photo-1736914320670-c1d3f7e2ba85?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Via Chamba from Salooni",
    popularFor: ["Chaurasi temples", "Manimahesh yatra", "Pilgrim groups"],
  },
  {
    id: "d-5",
    name: "Pathankot",
    slug: "pathankot",
    region: "Punjab",
    description:
      "The nearest railway station and airport for most Salooni families. Drops and pickups timed to your train or flight.",
    image:
      "https://images.unsplash.com/photo-1652379379235-652d2a6d65e8?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Station drop from Salooni",
    popularFor: ["Railway station", "Airport", "Goods pickup"],
  },
  {
    id: "d-6",
    name: "Dharamshala",
    slug: "dharamshala",
    region: "Kangra District",
    description:
      "Under the Dhauladhar range. Kangra airport at Gaggal is on the way, so it works for airport drops too.",
    image:
      "https://images.unsplash.com/photo-1683177511074-06295930b77c?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Day trip from Salooni",
    popularFor: ["Kangra airport (Gaggal)", "Dhauladhar views", "McLeod Ganj"],
  },
  {
    id: "d-10",
    name: "Padri Jot",
    slug: "padri-jot",
    region: "Salooni–Bhaderwah Road",
    description:
      "Wide green meadows on the pass above Langera, on the road to Bhaderwah. A favourite day out in summer; snow closes it in winter.",
    image: "/destinations/padri-jot-meadows.jpg",
    driveNote: "Day trip from Salooni",
    popularFor: ["Meadows", "Summer picnics", "Snow views"],
  },
  {
    id: "d-11",
    name: "Sach Pass",
    slug: "sach-pass",
    region: "Chamba District",
    description:
      "The high pass on the road from Chamba to Pangi, with snow walls early in the season. Open only in summer, so we check the road before you go.",
    image: "/destinations/sach-pass-snow.jpg",
    driveNote: "Summer trip from Salooni",
    popularFor: ["Snow walls", "Pangi valley", "Pir Panjal views"],
  },
  {
    id: "d-12",
    name: "Manimahesh",
    slug: "manimahesh",
    region: "Bharmour, Chamba District",
    description:
      "The sacred lake below Mount Kailash. We drive you to Hadsar, where the trek starts, and pick you up on your return. Busiest during the yatra.",
    image: "/destinations/manimahesh.jpg",
    driveNote: "Yatra trip via Bharmour",
    popularFor: ["Manimahesh yatra", "Hadsar drop", "Pilgrim groups"],
  },
  {
    id: "d-7",
    name: "Amritsar",
    slug: "amritsar",
    region: "Punjab",
    description:
      "For the Golden Temple, family visits or the airport. Best planned as an overnight trip.",
    image: "/destinations/amritsar.jpg",
    driveNote: "Overnight trip from Salooni",
    popularFor: ["Golden Temple", "Airport", "Family visits"],
  },
  {
    id: "d-13",
    name: "Chandigarh",
    slug: "chandigarh",
    region: "Punjab & Haryana Capital",
    description:
      "For PGI hospital visits, offices, shopping or the airport. The Rock Garden and Sukhna Lake are easy to add.",
    image: "/destinations/chandigarh-rock-garden.jpg",
    driveNote: "Overnight trip from Salooni",
    popularFor: ["PGI hospital", "Airport", "Rock Garden"],
  },
  {
    id: "d-14",
    name: "Haridwar",
    slug: "haridwar",
    region: "Uttarakhand",
    description:
      "For Ganga snan, the evening aarti at Har Ki Pauri and family rituals. Rishikesh is close by if you want to add it.",
    image: "/destinations/haridwar.jpg",
    driveNote: "Multi-day trip from Salooni",
    popularFor: ["Har Ki Pauri", "Ganga aarti", "Rishikesh"],
  },
  {
    id: "d-15",
    name: "Delhi",
    slug: "delhi",
    region: "National Capital",
    description:
      "Airport and railway station drops, hospital visits or family trips. Plan it with a comfortable vehicle for the long drive.",
    image: "/destinations/delhi.jpg",
    driveNote: "Multi-day trip from Salooni",
    popularFor: ["IGI Airport", "Railway stations", "Hospital visits"],
  },
  {
    id: "d-8",
    name: "Manali",
    slug: "manali",
    region: "Kullu District",
    description:
      "A longer Himachal trip for families and groups. Plan it over more than one day with a comfortable vehicle.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Overnight trip from Salooni",
    popularFor: ["Solang Valley", "Old Manali", "Family holidays"],
  },
  {
    id: "d-9",
    name: "Shimla",
    slug: "shimla",
    region: "Shimla District",
    description:
      "The state capital, for office work, college visits or a family holiday. A multi-day trip from Salooni.",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
    driveNote: "Overnight trip from Salooni",
    popularFor: ["Mall Road", "Kufri", "Government offices"],
  },
];

/** Shown on the homepage destination strip (grid of six). */
export const featuredDestinations = destinations.slice(0, 6);
