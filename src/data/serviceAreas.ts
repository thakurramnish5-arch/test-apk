import type { ServiceArea } from "@/types";

/**
 * One local page per place we pick up from (/areas/kihar, /areas/tissa…).
 *
 * Each page must say something true and specific about that place — the
 * road, the usual trips, what people there book — never the same text with
 * the name swapped, which search engines treat as doorway pages. Like the
 * destinations, trips are described without kilometres or hours: road time
 * depends on season, road work and the vehicle, so we confirm on enquiry.
 *
 * To add a place: copy an entry, write its own copy and FAQs, and link it
 * from the `nearby` list of its neighbours.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "kihar",
    name: "Kihar",
    aka: [],
    title: "Taxi & Vehicle Booking in Kihar, Chamba",
    description:
      "Book a taxi, Bolero, pickup, truck, tractor or JCB in Kihar, Salooni. Chamba runs, Pathankot station drops and goods work, with drivers who know the Kihar road.",
    summary:
      "Taxis for Chamba and Pathankot, plus pickups, tippers and JCB for work around Kihar.",
    intro:
      "Taxis, pickups, trucks, tractors and JCB for Kihar and the villages around it, each with a driver or operator who knows the Kihar road. Tell us where you are going and we suggest the vehicle that suits it.",
    sections: [
      {
        heading: "Taxi from Kihar to Chamba, Salooni and Pathankot",
        body: "Most trips from Kihar are day runs to Chamba for the hospital, offices or the market, and short runs to Salooni for tehsil work and shopping. For a train or flight, we time the Pathankot drop to your departure and can plan the pickup on the way back.",
      },
      {
        heading: "A Bolero based at Kihar",
        body: "One of our Mahindra Bolero taxis is based at Kihar, so a pickup here often does not have to come from Salooni first. A Bolero seats up to seven and has the clearance for steep link roads above Kihar. When it is booked, another car comes from Salooni — we confirm which one when you enquire.",
      },
      {
        heading: "Goods, building and farm work around Kihar",
        body: "A Tata Ace or Bolero Pickup brings shop stock and house saman from Chamba. For a new house, a tipper carries sand, gravel and bricks, and a JCB digs the foundation or clears a landslide on a link road. A tractor with trolley is available for field work and local loads.",
      },
    ],
    trips: [
      { to: "Chamba", note: "Hospital, offices and market — a day trip" },
      { to: "Salooni", note: "Tehsil work, bank and shopping" },
      { to: "Pathankot", note: "Railway station and airport drops" },
      { to: "Bhandal valley", note: "Village visits and weddings" },
      { to: "Dalhousie & Khajjiar", note: "Family day outings" },
    ],
    popularCategories: ["car", "pickup", "truck", "jcb", "tractor", "bus"],
    faqs: [
      {
        id: "kihar-1",
        question: "Is there a taxi available in Kihar itself?",
        answer:
          "One of our Bolero taxis is based at Kihar. If it is already booked, a car comes from Salooni. Tell us your pickup time and we confirm which vehicle will come.",
      },
      {
        id: "kihar-2",
        question: "Can I book an early taxi from Kihar to Chamba hospital?",
        answer:
          "Yes. An early start for a Chamba hospital visit is one of the most common bookings. Share the pickup time when you enquire — booking the evening before makes it easiest to confirm.",
      },
      {
        id: "kihar-3",
        question: "Can a JCB or tipper reach my site near Kihar?",
        answer:
          "Usually, yes. Tell us the village and how wide the road to the site is. If the road is narrow, we suggest a smaller vehicle or a different approach before you book.",
      },
    ],
    nearby: ["bhandal", "himgiri", "chaurah"],
  },
  {
    slug: "bhandal",
    name: "Bhandal",
    aka: ["Bhandal Valley"],
    title: "Taxi & Vehicle Booking in Bhandal Valley, Chamba",
    description:
      "Book a Bolero, Scorpio, pickup or Tempo Traveller in Bhandal valley, Salooni. Hill-road drivers for Chamba runs, Pathankot drops, weddings and goods.",
    summary:
      "High-clearance taxis for the steep valley roads, and group vehicles for Bhandal weddings.",
    intro:
      "Vehicles for Bhandal valley with drivers used to its steep, narrow hill roads. Bolero, Scorpio and Thar for the climb, pickups for goods, and Tempo Travellers for wedding guests.",
    sections: [
      {
        heading: "The right car for Bhandal roads",
        body: "Roads into the valley are steep and narrow in places, so a small hatchback is not always the best choice. A Bolero, Scorpio or Thar handles the climb and the rough patches better, and carries luggage on top. For two or three people on the main road, a smaller car keeps the rate down — we tell you which suits your village.",
      },
      {
        heading: "Weddings in Bhandal valley",
        body: "For a baraat or guests coming into the valley, a Tempo Traveller or the 27-seater mini bus manages link roads better than a full-size bus. Several cars can be arranged for the family. Tell us the dates, the number of guests and the pickup villages early, especially in wedding season.",
      },
      {
        heading: "Weather and winter trips",
        body: "Snow and rain can affect the higher roads in winter and the monsoon. We check the road before sending a vehicle and tell you if a trip needs a different time or a four-wheel-drive car. Share your plan early and we plan around it.",
      },
    ],
    trips: [
      { to: "Kihar & Salooni", note: "Market, bank and tehsil work" },
      { to: "Chamba", note: "Hospital and district offices" },
      { to: "Pathankot", note: "Station and airport drops" },
      { to: "Valley villages", note: "Weddings and family visits" },
    ],
    popularCategories: ["car", "bus", "pickup", "truck", "jcb", "tractor"],
    faqs: [
      {
        id: "bhandal-1",
        question: "Which vehicle is best for Bhandal valley roads?",
        answer:
          "For the steep village roads, a Bolero, Scorpio or Thar is the usual choice. On the main road, a smaller car is fine for two or three people. Tell us your village and we suggest the right one.",
      },
      {
        id: "bhandal-2",
        question: "Can a bus come to Bhandal for a wedding?",
        answer:
          "A Tempo Traveller or the 27-seater mini bus is easier on the valley's link roads than a 35-seater bus. More than one vehicle can be arranged for a large baraat.",
      },
      {
        id: "bhandal-3",
        question: "Do you run trips to Bhandal in winter?",
        answer:
          "Yes, when the road is open. After snowfall we check the road first and may suggest a four-wheel-drive car or a different time. We tell you before you confirm.",
      },
    ],
    nearby: ["kihar", "himgiri", "chaurah"],
  },
  {
    slug: "himgiri",
    name: "Himgiri",
    aka: [],
    title: "Taxi & Vehicle Booking in Himgiri, Chamba",
    description:
      "Book a taxi, pickup, truck, tractor or JCB in Himgiri, Chamba. Chamba and Salooni runs, Pathankot and Kangra airport drops, and goods or farm work.",
    summary:
      "Taxis for Chamba, Salooni and station drops, with pickups and tractors for local work.",
    intro:
      "Taxis and work vehicles for Himgiri and nearby villages, with experienced drivers and operators. From a Chamba hospital run to a tractor for the fields, one call covers it.",
    sections: [
      {
        heading: "Taxi from Himgiri",
        body: "Common trips are to Chamba for the hospital and offices, and to Salooni for tehsil work and the market. Families with members working outside the state book drops to Pathankot railway station, Pathankot airport and Kangra airport at Gaggal — share the train or flight time and we plan the start.",
      },
      {
        heading: "Shifting, goods and farm work",
        body: "For house shifting or a load of shop stock, a Tata Ace or Bolero Pickup is usually enough. A tractor with trolley does field work and carries local loads, and a tipper or JCB is available for house construction and site levelling.",
      },
      {
        heading: "Family functions",
        body: "For a wedding or family function, a mix of cars and a Tempo Traveller usually covers the guests. Tell us the dates and the number of people, and we suggest how many vehicles you need.",
      },
    ],
    trips: [
      { to: "Chamba", note: "Hospital, offices and market" },
      { to: "Salooni", note: "Tehsil work and shopping" },
      { to: "Pathankot", note: "Railway station and airport" },
      { to: "Kangra airport", note: "Gaggal airport drops" },
    ],
    popularCategories: ["car", "pickup", "tractor", "truck", "jcb", "bus"],
    faqs: [
      {
        id: "himgiri-1",
        question: "Can I book a taxi from Himgiri to Pathankot or Kangra airport?",
        answer:
          "Yes. Share your train or flight time when you enquire, and we plan the pickup from Himgiri so you reach with time to spare.",
      },
      {
        id: "himgiri-2",
        question: "Is a tractor available on hire in Himgiri?",
        answer:
          "Yes. A tractor with trolley can be booked for field work and local loads. Tell us the job and the number of days.",
      },
      {
        id: "himgiri-3",
        question: "How do I know the rate for my trip from Himgiri?",
        answer:
          "The rate depends on the vehicle, the route and the days. Send the trip on WhatsApp or call, and we share the full rate before you confirm.",
      },
    ],
    nearby: ["kihar", "bhandal", "tissa"],
  },
  {
    slug: "tissa",
    name: "Tissa",
    aka: [],
    title: "Taxi & Vehicle Booking in Tissa, Churah",
    description:
      "Book a taxi, Bolero, pickup, truck or JCB in Tissa, Churah. Trips to Chamba, Salooni and Pathankot, Sach Pass side trips, and goods for Tissa.",
    summary:
      "Taxis from Tissa to Chamba, Salooni and Pathankot, and goods vehicles for the town.",
    intro:
      "Taxis and goods vehicles for Tissa and the villages around it, with drivers who know the Churah hill roads. Tell us the trip, and we send a car that suits the road and the number of people.",
    sections: [
      {
        heading: "Taxi from Tissa to Chamba and Pathankot",
        body: "Tissa is the main town of Churah, and most trips from here go to Chamba for the hospital and district offices, or to Pathankot for the railway station and airport. We also run trips between Tissa and Salooni, one way or return.",
      },
      {
        heading: "Sach Pass side and hill trips",
        body: "Groups heading towards the Sach Pass side need a high-clearance car like a Bolero, Scorpio or Thar, and the pass is open only for part of the year. Tell us your dates and we confirm the road before you book.",
      },
      {
        heading: "Goods and construction for Tissa",
        body: "Pickups and trucks bring shop stock and building material from Chamba or Pathankot. A tipper and a JCB can be booked for foundations, road cutting and clearing landslide debris after rain.",
      },
    ],
    trips: [
      { to: "Chamba", note: "Hospital and district offices" },
      { to: "Salooni", note: "One way or return" },
      { to: "Pathankot", note: "Station and airport drops" },
      { to: "Sach Pass side", note: "When the pass is open" },
    ],
    popularCategories: ["car", "pickup", "truck", "jcb", "bus", "tractor"],
    faqs: [
      {
        id: "tissa-1",
        question: "Can I book a taxi from Tissa to Salooni?",
        answer:
          "Yes. Trips between Tissa and Salooni can be booked one way or as a return. Share the pickup point in Tissa and the time.",
      },
      {
        id: "tissa-2",
        question: "Which car should I take towards Sach Pass from Tissa?",
        answer:
          "A Bolero, Scorpio or Thar, for the clearance. The pass is open only for part of the year, so share your dates and we confirm the road first.",
      },
      {
        id: "tissa-3",
        question: "Can you bring goods from Chamba or Pathankot to Tissa?",
        answer:
          "Yes. A pickup or truck can bring shop stock, building material or house saman. Tell us the load and we suggest the right size.",
      },
    ],
    nearby: ["chaurah", "bhanjraru", "himgiri"],
  },
  {
    slug: "chaurah",
    name: "Chaurah",
    aka: ["Churah", "Chourah"],
    title: "Taxi & Vehicle Booking in Churah (Chaurah), Chamba",
    description:
      "Taxi, Bolero, Tempo Traveller, pickup, truck or JCB anywhere in Churah (Chaurah) valley, Chamba. Village pickups, weddings, Chamba runs and goods.",
    summary:
      "Village pickups across the Churah valley, for trips, weddings and goods.",
    intro:
      "Vehicles for villages across the Churah valley — also spelt Chaurah — with drivers who know its hill roads. Cars, group vehicles, pickups, trucks, tractors and JCB, all with one call.",
    sections: [
      {
        heading: "Pickup from your village in Churah",
        body: "Many Churah villages are on link roads off the main road. Tell us your village and the road access when you enquire, and we send a vehicle that can reach it — a Bolero or Scorpio for the steeper roads, a smaller car where the road allows.",
      },
      {
        heading: "Weddings and group trips",
        body: "For a baraat or guests travelling across the valley, we arrange Tempo Travellers, the 27-seater mini bus or a 35-seater bus on the main road, along with cars for the family. Groups going to Chamba, Bharmour or further can book any size of vehicle.",
      },
      {
        heading: "Goods and work vehicles",
        body: "Pickups bring shop stock and house saman from Chamba or Pathankot. Tippers carry building material, and a JCB or tractor can be booked for construction, field work or clearing a blocked road.",
      },
    ],
    trips: [
      { to: "Chamba", note: "Hospital, offices and market" },
      { to: "Tissa & Bhanjraru", note: "Within the valley" },
      { to: "Salooni", note: "One way or return" },
      { to: "Pathankot", note: "Station and airport drops" },
      { to: "Bharmour", note: "Yatra and group trips" },
    ],
    popularCategories: ["car", "bus", "pickup", "truck", "jcb", "tractor"],
    faqs: [
      {
        id: "chaurah-1",
        question: "Do you pick up from villages in Churah?",
        answer:
          "Yes. Tell us your village and the road access. If the road needs a high-clearance car, we send a Bolero or Scorpio.",
      },
      {
        id: "chaurah-2",
        question: "Can I book buses for a wedding in Churah?",
        answer:
          "Yes. Tempo Travellers and the 27-seater mini bus suit link roads; a 35-seater bus works on the main road. Share the dates, guests and pickup villages early.",
      },
      {
        id: "chaurah-3",
        question: "Is Chaurah the same as Churah?",
        answer:
          "Yes — Churah is also written Chaurah or Chourah. We serve villages across the valley, including the Tissa and Bhanjraru side.",
      },
    ],
    nearby: ["tissa", "bhanjraru", "kihar"],
  },
  {
    slug: "bhanjraru",
    name: "Bhanjraru",
    aka: ["Bhanjradu"],
    title: "Taxi & Vehicle Booking in Bhanjraru, Chamba",
    description:
      "Book a taxi, pickup, truck or JCB in Bhanjraru (Bhanjradu), Churah. Chamba and Pathankot trips, shop stock pickups and construction work.",
    summary:
      "Taxis for Chamba and Pathankot, and pickups for shop stock to the Bhanjraru market.",
    intro:
      "Taxis and goods vehicles for Bhanjraru — also spelt Bhanjradu — and the nearby villages. Drivers know the Churah roads, and the rate is shared before you confirm.",
    sections: [
      {
        heading: "Taxi from Bhanjraru",
        body: "Common trips are to Chamba for the hospital and offices, to Tissa and other places in the valley, and to Pathankot for the station or airport. We also run trips between Bhanjraru and Salooni, one way or return.",
      },
      {
        heading: "Stock for Bhanjraru shops",
        body: "Shopkeepers book a Tata Ace or Bolero Pickup to bring stock from Chamba or Pathankot. For bigger loads, a truck can be arranged. Tell us what you are carrying and where it is picked up, and we suggest the right size.",
      },
      {
        heading: "Building work",
        body: "A tipper carries sand, gravel and bricks for a new house or shop, and a JCB digs foundations, cuts roads and clears debris. Share the site and the road access when you enquire.",
      },
    ],
    trips: [
      { to: "Chamba", note: "Hospital, offices and market" },
      { to: "Tissa", note: "Within the valley" },
      { to: "Salooni", note: "One way or return" },
      { to: "Pathankot", note: "Station, airport and goods" },
    ],
    popularCategories: ["car", "pickup", "truck", "jcb", "bus", "tractor"],
    faqs: [
      {
        id: "bhanjraru-1",
        question: "Can I get a pickup to bring shop stock to Bhanjraru?",
        answer:
          "Yes. A Tata Ace or Bolero Pickup brings stock from Chamba or Pathankot, and a truck can be arranged for bigger loads.",
      },
      {
        id: "bhanjraru-2",
        question: "Do you book taxis from Bhanjraru to Pathankot station?",
        answer:
          "Yes. Share your train time and we plan the pickup from Bhanjraru so you reach the station with time to spare.",
      },
      {
        id: "bhanjraru-3",
        question: "Is Bhanjradu the same place as Bhanjraru?",
        answer:
          "Yes — it is spelt both ways. Book for Bhanjraru or the nearby villages the same way: by WhatsApp, phone or the form on this page.",
      },
    ],
    nearby: ["tissa", "chaurah", "himgiri"],
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export const serviceAreaPath = (slug: string) => `/areas/${slug}`;
