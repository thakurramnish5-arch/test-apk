import type { CategoryPage, VehicleCategory } from "@/types";

/**
 * One landing page per vehicle category (/taxi-car-booking, /jcb-booking…).
 *
 * Every line here must stay true to the actual service: the vehicles on
 * each page come from src/data/vehicles.ts, and the copy only repeats what
 * the fleet, services and FAQs already say. Do not reword the same page
 * for another keyword — near-duplicate pages hurt search ranking rather
 * than help it. Per-place pages live in serviceAreas.ts, each with its own
 * copy.
 */
export const categoryPages: CategoryPage[] = [
  {
    slug: "taxi-car-booking",
    category: "car",
    title: "Taxi & Cab Booking in Salooni, Chamba",
    description:
      "Book a taxi or cab with an experienced driver in Salooni, Chamba — Alto to Innova. Local runs, Chamba, Pathankot station drops and outstation trips.",
    eyebrow: "Taxi & Car Booking",
    heading: "Taxi & Cab Booking in Salooni, Chamba",
    intro:
      "Local taxis from small hatchbacks to 7- and 9-seaters, each with an experienced driver who knows the hill roads around Salooni and Chamba. Tell us the route and the number of people, and we suggest the car that suits it.",
    serviceType: "Taxi service",
    sections: [
      {
        heading: "Local taxi in Salooni",
        body: "For short runs around Salooni — to the tehsil office, the bank, the market, a wedding in a nearby village or back home with shopping — book a car for the trip or for a few hours. Tell us the pickup village and where you need to go.",
      },
      {
        heading: "Chamba runs, station drops and outstation trips",
        body: "Most bookings are day trips to Chamba for hospital visits, office work or the market, and drops to Pathankot railway station or airport timed to your train or flight. We also go to Dalhousie, Khajjiar and Dharamshala, and outstation to Amritsar, Jammu, Chandigarh or Delhi.",
      },
      {
        heading: "The right car for the road",
        body: "An Alto or WagonR is the cheapest way for two or three people to reach Chamba. For steep village roads above Salooni, Kihar or the Bharmour route, a Bolero, Scorpio or Thar handles the climb better. Families and wedding parties usually take an Ertiga or Innova Crysta, and a Tata Sumo seats up to nine.",
      },
      {
        heading: "Pickup from your village",
        body: "Trips start from Salooni and nearby villages in the tehsil, including the Kihar and Bhandal valley side. Share your village and the road access when you enquire.",
      },
      {
        heading: "Car rental with driver",
        body: "Looking for a car on rent in Salooni? Every car is rented with its driver — self-drive is not offered — by the trip, by the day or for several days. The driver knows the hill roads, so you do not have to drive them yourself.",
      },
    ],
    faqIds: ["f-7", "f-1", "f-2", "f-9"],
  },
  {
    slug: "bus-tempo-traveller-booking",
    category: "bus",
    title: "Bus & Tempo Traveller Booking in Salooni, Chamba",
    description:
      "Book a Tempo Traveller (12–17 seats), 27-seater mini bus or 35-seater bus in Salooni, Chamba for weddings, school trips and Bharmour or Manimahesh yatra groups.",
    eyebrow: "Bus Booking",
    heading: "Bus & Tempo Traveller Booking in Salooni, Chamba",
    intro:
      "Group vehicles for baraat guests, school trips and pilgrimage groups, each with an experienced group driver. Choose a 12–17 seater Tempo Traveller, a 27-seater mini bus or a 35-seater bus.",
    serviceType: "Bus charter",
    sections: [
      {
        heading: "Weddings and functions",
        body: "For a wedding we can send buses or Tempo Travellers for the baraat and guests across all the wedding days, with drivers used to wedding-day timings. Tell us the dates, the number of guests and the pickup villages, and more than one vehicle can be arranged.",
      },
      {
        heading: "Yatra and group trips",
        body: "Groups going to Bharmour and Manimahesh, or on a trip to Chamba, Dalhousie or further, can book any size of group vehicle. Share your dates early for wedding season, festivals and yatra time — vehicles are confirmed on a first-come basis.",
      },
      {
        heading: "Matching the bus to the road",
        body: "A 35-seater bus is best on main roads. A Tempo Traveller or the 27-seater mini bus is easier on link roads and village roads. If your route needs a smaller vehicle, we will tell you before you book.",
      },
    ],
    faqIds: ["f-4", "f-3", "f-8", "f-7"],
  },
  {
    slug: "pickup-booking",
    category: "pickup",
    title: "Pickup on Hire in Salooni, Chamba — Goods & Shifting",
    description:
      "Tata Ace, Bolero Pickup and Bolero Camper on hire with driver in Salooni, Chamba — for house shifting, shop stock and goods from Chamba or Pathankot.",
    eyebrow: "Pickup Booking",
    heading: "Pickup on Hire in Salooni, Chamba",
    intro:
      "Small and medium goods vehicles with an experienced driver, for house shifting, shop stock and local saman. Tell us what you are carrying and where, and we suggest the right size.",
    serviceType: "Goods transport",
    sections: [
      {
        heading: "Which pickup fits your load",
        body: "The Tata Ace carries up to 750 kg and fits lanes where bigger pickups cannot go. The Bolero Pickup takes up to 1.5 tonnes and is reliable on steep hill roads. The Bolero Camper seats five with about a tonne in the back — useful when people and saman travel together.",
      },
      {
        heading: "Goods from Chamba or Pathankot",
        body: "Traders and shops book pickups to bring stock from Chamba or Pathankot to Salooni. Loading help and a tarpaulin cover are available on request.",
      },
    ],
    faqIds: ["f-5", "f-7", "f-1"],
  },
  {
    slug: "truck-booking",
    category: "truck",
    title: "Truck Booking in Salooni, Chamba — Goods & Material",
    description:
      "Tata 407, tipper and 10-wheeler trucks with driver in Salooni, Chamba — for house shifting, sand, bajri and cement, and full loads to and from Pathankot.",
    eyebrow: "Truck Booking",
    heading: "Truck Booking in Salooni, Chamba",
    intro:
      "Trucks with an experienced driver for heavy goods and building material, from a light Tata 407 for hill roads to a 10-wheeler for full loads.",
    serviceType: "Freight transport",
    sections: [
      {
        heading: "From house shifting to full loads",
        body: "The Tata 407 carries up to 2.5 tonnes and suits house shifting and medium loads on narrow hill roads. A 10-wheeler takes up to 10 tonnes of cement, steel, apples or goods to and from Pathankot. Both have inter-state permits available.",
      },
      {
        heading: "Construction material",
        body: "The tipper truck carries up to 6 tonnes of sand, bajri, stone or debris and unloads itself, saving labour on hill sites. It can be booked by the trip or by the day, and pairs with a JCB when the site needs digging too.",
      },
    ],
    faqIds: ["f-5", "f-7", "f-8"],
  },
  {
    slug: "tractor-booking",
    category: "tractor",
    title: "Tractor on Hire in Salooni, Chamba",
    description:
      "Tractors with an experienced operator on hire in Salooni, Chamba — ploughing, field preparation and orchard work, or a trolley for sand, stone and fodder.",
    eyebrow: "Tractor Booking",
    heading: "Tractor on Hire in Salooni, Chamba",
    intro:
      "Tractors with an experienced operator for farms, orchards and local haulage around Salooni villages, on daily or weekly hire.",
    serviceType: "Agricultural equipment rental with operator",
    sections: [
      {
        heading: "Farm and orchard work",
        body: "The 40–45 HP farm tractor comes with a plough and cultivator, with a rotavator on request, and suits terraced fields. It is used for ploughing, field preparation and orchard work.",
      },
      {
        heading: "Tractor with trolley",
        body: "The 50 HP tractor with a heavy-duty trolley hauls sand, stone, fodder or crops on local hill roads, and has good torque on slopes. Other attachments are available on request.",
      },
    ],
    faqIds: ["f-6", "f-7", "f-1"],
  },
  {
    slug: "jcb-booking",
    category: "jcb",
    title: "JCB Booking in Salooni, Chamba — With Operator",
    description:
      "Book a JCB 3DX or backhoe loader with an experienced operator in Salooni, Chamba — foundations, site levelling, drain work and landslide debris. Hourly or daily.",
    eyebrow: "JCB Booking",
    heading: "JCB Booking in Salooni, Chamba",
    intro:
      "JCB and backhoe loaders with an experienced operator for construction sites around Salooni, booked by the hour or by the day.",
    serviceType: "Construction equipment rental with operator",
    sections: [
      {
        heading: "What the JCB is used for",
        body: "The JCB 3DX digs house foundations, cuts roads and levels sites. The backhoe loader clears landslide debris after rain, does drain work and loads material where both digging and loading are needed.",
      },
      {
        heading: "Planning a site job",
        body: "Tell us the site location, the road access and what the job is. Fuel arrangement is discussed when you book. If the job needs material moved as well, a tipper truck can be booked with the JCB.",
      },
    ],
    faqIds: ["f-6", "f-7", "f-8"],
  },
];

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return categoryPages.find((page) => page.slug === slug);
}

/** Landing page path for a vehicle category, e.g. "/jcb-booking". */
export const categoryPagePath = Object.fromEntries(
  categoryPages.map((page) => [page.category, `/${page.slug}`]),
) as Record<VehicleCategory, string>;
