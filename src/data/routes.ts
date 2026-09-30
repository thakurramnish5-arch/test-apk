import type { TaxiRoute } from "@/types";

/**
 * One page per taxi route from Salooni (/routes/salooni-to-chamba-taxi…).
 *
 * Only routes the business already runs (see destinations.ts) get a page,
 * and each page says something specific about that road and its trips —
 * never the same text with the place name swapped, which search engines
 * treat as doorway pages. The return trip to Salooni is a section of the
 * same page rather than a near-duplicate page of its own.
 *
 * Like the destinations, no kilometres, hours or fares are published: road
 * time depends on season, road work and the vehicle, and the rate is
 * quoted per trip. Add them here only once they are confirmed.
 */
export const taxiRoutes: TaxiRoute[] = [
  {
    slug: "salooni-to-chamba-taxi",
    to: "Chamba",
    destinationSlug: "chamba",
    title: "Salooni to Chamba Taxi & Cab Booking",
    description:
      "Book a taxi from Salooni to Chamba for hospital visits, office work or the market — one way, return or with waiting. Chamba to Salooni pickups too.",
    heading: "Salooni to Chamba Taxi",
    intro:
      "The most booked trip from Salooni. A car with an experienced driver for Chamba hospital visits, district office work, shopping and goods — one way, return the same day, or with the driver waiting while you finish your work.",
    summary: "Hospital, offices and market — one way, return or with waiting.",
    sections: [
      {
        heading: "Why people book Salooni to Chamba",
        body: "Chamba is the district headquarters on the Ravi river, so most trips are for the hospital, district offices, courts, banks and the main market. Many families also go for the Chaugan and the temples. Tell us the purpose when you enquire — for a hospital visit we plan an early start.",
      },
      {
        heading: "Return the same day, or with waiting",
        body: "If your work in Chamba takes a few hours, the driver can wait and bring you back to Salooni the same day. Say whether you need a one-way drop, a return or waiting, and the full rate is shared before you confirm.",
      },
      {
        heading: "Which car for the Chamba road",
        body: "Two or three people usually take an Alto, WagonR or Swift, which keeps the rate low. With a patient, luggage or a family, an Ertiga or Innova Crysta is more comfortable. From a village on a steep link road, a Bolero or Scorpio can pick you up at your door.",
      },
    ],
    returnTrip: {
      heading: "Chamba to Salooni taxi",
      body: "Coming home from Chamba — after a hospital discharge, from the bus stand, or with shopping and goods? Book a pickup in Chamba and we drop you in Salooni or your village nearby. Share the pickup point in Chamba and the time.",
    },
    vehicleSlugs: [
      "maruti-suzuki-alto-800",
      "maruti-suzuki-swift",
      "maruti-suzuki-ertiga",
      "mahindra-bolero",
      "toyota-innova-crysta",
    ],
    faqs: [
      {
        id: "chamba-r-1",
        question: "Can the driver wait in Chamba and bring me back to Salooni?",
        answer:
          "Yes. Tell us roughly how long your work in Chamba will take, and the driver waits and brings you back the same day. The rate for a return with waiting is shared before you confirm.",
      },
      {
        id: "chamba-r-2",
        question: "Can I book an early taxi from Salooni for Chamba hospital?",
        answer:
          "Yes, it is one of the most common bookings. Share the pickup village and time — booking the evening before makes it easiest to confirm.",
      },
      {
        id: "chamba-r-3",
        question: "Do you pick up from Chamba for a drop to Salooni?",
        answer:
          "Yes. Share the pickup point in Chamba, such as the hospital or the bus stand, and the time. We drop you in Salooni or your village nearby.",
      },
    ],
    related: [
      "salooni-to-khajjiar-taxi",
      "salooni-to-manimahesh-taxi",
      "salooni-to-pathankot-taxi",
    ],
  },
  {
    slug: "salooni-to-pathankot-taxi",
    to: "Pathankot",
    destinationSlug: "pathankot",
    title: "Salooni to Pathankot Taxi & Airport Drop",
    description:
      "Taxi from Salooni to Pathankot railway station or airport, timed to your train or flight. Pathankot to Salooni pickups for arriving passengers too.",
    heading: "Salooni to Pathankot Taxi",
    intro:
      "Pathankot is the nearest railway station and airport for most Salooni families. We time the drop to your train or flight, and pick you up in Pathankot when you come home.",
    summary: "Railway station and airport drops, timed to your train or flight.",
    sections: [
      {
        heading: "Drops timed to your train or flight",
        body: "Share your train or flight time when you book, and we plan the start from Salooni so you reach with time to spare. Tell us whether you are going to the railway station or the airport, and how much luggage you have.",
      },
      {
        heading: "Students, jobs and family visits",
        body: "Many bookings are for family members leaving for work or college outside the state, or relatives arriving for a wedding or a festival. A 7-seater such as an Ertiga, Bolero or Innova Crysta fits a family with luggage; a smaller car suits one or two people.",
      },
      {
        heading: "Goods from Pathankot",
        body: "Traders also book pickups and trucks to bring shop stock and material from Pathankot to Salooni. See pickup and truck booking for the goods vehicles.",
      },
    ],
    returnTrip: {
      heading: "Pathankot to Salooni taxi",
      body: "Arriving by train or flight? Send us the arrival time and we have a car waiting at Pathankot station or airport to take you to Salooni or your village. If your train is running late, message us and we let the driver know.",
    },
    vehicleSlugs: [
      "maruti-suzuki-dzire",
      "maruti-suzuki-ertiga",
      "toyota-innova-crysta",
      "mahindra-bolero",
      "force-tempo-traveller",
    ],
    faqs: [
      {
        id: "pathankot-r-1",
        question: "How early should I leave Salooni for my train at Pathankot?",
        answer:
          "It depends on the season and the road that day. Share your train time when you book and we suggest the start time, with a margin for delays.",
      },
      {
        id: "pathankot-r-2",
        question: "Can you pick me up from Pathankot station when I arrive?",
        answer:
          "Yes. Send the train or flight and its arrival time. The car waits at the station or airport and drops you in Salooni or your village.",
      },
      {
        id: "pathankot-r-3",
        question: "Can a group travel together from Salooni to Pathankot?",
        answer:
          "Yes. A Tempo Traveller seats 12 to 17 people with luggage, or several cars can be arranged. Tell us the number of people and bags.",
      },
    ],
    related: [
      "salooni-to-dalhousie-taxi",
      "salooni-to-dharamshala-taxi",
      "salooni-to-chamba-taxi",
    ],
  },
  {
    slug: "salooni-to-dalhousie-taxi",
    to: "Dalhousie",
    destinationSlug: "dalhousie",
    title: "Salooni to Dalhousie & Banikhet Taxi",
    description:
      "Taxi from Salooni to Dalhousie and Banikhet for a family day out, with Khajjiar on the same trip if you like. Dalhousie to Salooni drops too.",
    heading: "Salooni to Dalhousie Taxi",
    intro:
      "A family day out to the pine forests of Dalhousie, with Banikhet and Khajjiar easy to add on the same trip. Tell us the stops you want and we plan the day with an experienced hill driver.",
    summary: "Family day trips, with Banikhet and Khajjiar on the same day.",
    sections: [
      {
        heading: "A day trip from Salooni",
        body: "Dalhousie works well as a day trip from Salooni: start in the morning, spend the day in the town and the pine forests, and come back in the evening. If you want to stay overnight, the driver can stay and bring you back the next day — tell us when you book.",
      },
      {
        heading: "Banikhet and Khajjiar on the way",
        body: "Banikhet is just before Dalhousie, so it is easy to stop there. Many families also add Khajjiar and its meadow on the same day. Share the stops you have in mind and we confirm whether they fit in one day.",
      },
      {
        heading: "Cars for a family outing",
        body: "An Ertiga or Innova Crysta is the usual choice for a family, and a Tempo Traveller for a bigger group or a school trip. For two or three people, a Swift or Dzire keeps the rate down.",
      },
    ],
    returnTrip: {
      heading: "Dalhousie to Salooni taxi",
      body: "Staying in Dalhousie or Banikhet and need to get to Salooni? Book a one-way pickup from your hotel or the bus stand. Share the pickup point and the time, and the rate is confirmed before you book.",
    },
    vehicleSlugs: [
      "maruti-suzuki-ertiga",
      "toyota-innova-crysta",
      "maruti-suzuki-dzire",
      "mahindra-scorpio",
      "force-tempo-traveller",
    ],
    faqs: [
      {
        id: "dalhousie-r-1",
        question: "Can I visit Dalhousie and Khajjiar in one day from Salooni?",
        answer:
          "Often, yes. Many families do both in one day. Share your start time and the stops, and we tell you whether it fits comfortably or is better over two days.",
      },
      {
        id: "dalhousie-r-2",
        question: "Do you go to Banikhet from Salooni?",
        answer:
          "Yes. Banikhet is just before Dalhousie, so it can be a stop on the Dalhousie trip or the drop point itself.",
      },
      {
        id: "dalhousie-r-3",
        question: "Can the driver stay overnight in Dalhousie?",
        answer:
          "Yes, for a two-day trip. Tell us when you book so the rate includes the driver's night stay.",
      },
    ],
    related: [
      "salooni-to-khajjiar-taxi",
      "salooni-to-pathankot-taxi",
      "salooni-to-dharamshala-taxi",
    ],
  },
  {
    slug: "salooni-to-khajjiar-taxi",
    to: "Khajjiar",
    destinationSlug: "khajjiar",
    title: "Salooni to Khajjiar Taxi, Day Trip",
    description:
      "Taxi from Salooni to Khajjiar's meadow and Khajji Nag temple, as a day trip or with Chamba or Dalhousie on the same day. Khajjiar to Salooni drops too.",
    heading: "Salooni to Khajjiar Taxi",
    intro:
      "A day out to Khajjiar's open meadow ringed by forest, and the Khajji Nag temple. It sits between Chamba and Dalhousie, so it is easy to combine with either on the same trip.",
    summary: "Meadow and Khajji Nag temple, combined with Chamba or Dalhousie.",
    sections: [
      {
        heading: "Khajjiar as a day trip",
        body: "Families and groups of friends go for the meadow, picnics and the Khajji Nag temple. Start from Salooni in the morning and you are back in the evening. Tell us where to pick you up and how many people are going.",
      },
      {
        heading: "Add Chamba or Dalhousie",
        body: "Khajjiar lies on the road between Chamba and Dalhousie, so it pairs well with a stop in Chamba for the temples and market, or with a longer day on to Dalhousie. We suggest the order of stops that suits your start time.",
      },
      {
        heading: "Winter and snow",
        body: "Khajjiar can get snow in winter, which is when some families most want to go. After snowfall we check the road first and may suggest a Bolero, Scorpio or Thar for the grip and clearance.",
      },
    ],
    returnTrip: {
      heading: "Khajjiar to Salooni taxi",
      body: "Staying at Khajjiar and heading to Salooni? Book a one-way pickup from your hotel. Share the pickup time and the number of people and bags.",
    },
    vehicleSlugs: [
      "maruti-suzuki-ertiga",
      "mahindra-scorpio",
      "mahindra-thar",
      "maruti-suzuki-swift",
      "force-tempo-traveller",
    ],
    faqs: [
      {
        id: "khajjiar-r-1",
        question: "Can I combine Khajjiar with Chamba in one trip?",
        answer:
          "Yes. Khajjiar is on the road between Chamba and Dalhousie, so a Chamba stop fits easily into the same day.",
      },
      {
        id: "khajjiar-r-2",
        question: "Do you run taxis to Khajjiar in winter?",
        answer:
          "Yes, when the road is open. After snowfall we check the road before sending a car and may suggest a four-wheel-drive vehicle.",
      },
      {
        id: "khajjiar-r-3",
        question: "Is there a vehicle for a big group to Khajjiar?",
        answer:
          "Yes. A Tempo Traveller seats 12 to 17 people, and for larger groups several vehicles can be arranged.",
      },
    ],
    related: [
      "salooni-to-dalhousie-taxi",
      "salooni-to-chamba-taxi",
      "salooni-to-manimahesh-taxi",
    ],
  },
  {
    slug: "salooni-to-dharamshala-taxi",
    to: "Dharamshala",
    destinationSlug: "dharamshala",
    title: "Salooni to Dharamshala & Kangra Taxi",
    description:
      "Taxi from Salooni to Dharamshala, McLeod Ganj and Kangra airport at Gaggal — airport drops, day trips and family visits. Pickups back to Salooni too.",
    heading: "Salooni to Dharamshala & Kangra Taxi",
    intro:
      "Drops to Kangra airport at Gaggal, and trips to Dharamshala and McLeod Ganj under the Dhauladhar range. Share your flight time or your plan for the day, and we send a car with an experienced driver.",
    summary: "Kangra airport (Gaggal) drops and Dharamshala day trips.",
    sections: [
      {
        heading: "Kangra airport drops at Gaggal",
        body: "For flights from Kangra airport at Gaggal, share the flight time and we plan the start from Salooni so you reach with time to spare. We also pick up arriving passengers at the airport.",
      },
      {
        heading: "Dharamshala and McLeod Ganj",
        body: "Families go to Dharamshala and McLeod Ganj for the monasteries, the Dhauladhar views and a day in the hills. It can be a long day from Salooni, so many book it with a night stay — tell us your plan and we suggest what fits.",
      },
      {
        heading: "Stops in the Kangra valley",
        body: "If you want to stop at a temple or in Kangra town on the way, add it to your enquiry and we plan the route around it.",
      },
    ],
    returnTrip: {
      heading: "Dharamshala or Kangra airport to Salooni taxi",
      body: "Landing at Kangra airport or staying in Dharamshala? Book a pickup to Salooni. Send the flight number or the hotel and the time, and the driver will be there.",
    },
    vehicleSlugs: [
      "maruti-suzuki-dzire",
      "maruti-suzuki-ertiga",
      "toyota-innova-crysta",
      "mahindra-scorpio",
      "force-tempo-traveller",
    ],
    faqs: [
      {
        id: "dharamshala-r-1",
        question: "Do you drop at Kangra airport (Gaggal) from Salooni?",
        answer:
          "Yes. Share your flight time and we plan the pickup from Salooni so you reach the airport with time to spare.",
      },
      {
        id: "dharamshala-r-2",
        question: "Can I do Dharamshala as a day trip from Salooni?",
        answer:
          "It is a long day. Many families prefer a night stay. Tell us your plan and we suggest a start time, or include the driver's night stay in the rate.",
      },
      {
        id: "dharamshala-r-3",
        question: "Can you pick me up at Kangra airport for Salooni?",
        answer:
          "Yes. Send the flight and its arrival time, and a car waits at the airport to take you to Salooni or your village.",
      },
    ],
    related: [
      "salooni-to-pathankot-taxi",
      "salooni-to-dalhousie-taxi",
      "salooni-to-chamba-taxi",
    ],
  },
  {
    slug: "salooni-to-manimahesh-taxi",
    to: "Bharmour & Manimahesh",
    destinationSlug: "manimahesh",
    title: "Salooni to Manimahesh & Bharmour Taxi",
    description:
      "Taxi and Tempo Traveller from Salooni to Bharmour and Hadsar for the Manimahesh yatra, with pickup on your return. Book early for yatra time.",
    heading: "Salooni to Bharmour & Manimahesh Taxi",
    intro:
      "Cars and group vehicles for the Manimahesh yatra and trips to Bharmour. We drive you via Chamba and Bharmour to Hadsar, where the trek starts, and pick you up when you come back down.",
    summary: "Yatra drops to Hadsar via Bharmour, with pickup on your return.",
    sections: [
      {
        heading: "Drop at Hadsar for the Manimahesh trek",
        body: "The road ends at Hadsar, where the trek to Manimahesh lake starts. We drop you there and agree the day and time for the pickup after your darshan. If your plan changes on the mountain, message us and the pickup is moved.",
      },
      {
        heading: "Bharmour and the Chaurasi temples",
        body: "Bharmour is the old temple town on the way, with the Chaurasi temple complex. Some groups stop there on the way up, others go only to Bharmour. Tell us the stops you want.",
      },
      {
        heading: "Book early for yatra time",
        body: "Vehicles are in high demand during the yatra, so share your dates early — bookings are confirmed on a first-come basis. The road is hilly, so a 7-seater such as a Bolero, Scorpio or Sumo, or a Tempo Traveller for a group, is the usual choice.",
      },
    ],
    returnTrip: {
      heading: "Hadsar or Bharmour to Salooni taxi",
      body: "Coming down from Manimahesh? The pickup at Hadsar is agreed when you book the drop. If you only need a one-way trip back from Hadsar or Bharmour to Salooni, share the day and the number of people.",
    },
    vehicleSlugs: [
      "mahindra-bolero",
      "mahindra-scorpio",
      "tata-sumo",
      "toyota-innova-crysta",
      "force-tempo-traveller",
    ],
    faqs: [
      {
        id: "manimahesh-r-1",
        question: "Do you drop at Hadsar for the Manimahesh yatra?",
        answer:
          "Yes. We drive you to Hadsar, where the trek starts, and pick you up on the day you come back. The pickup is agreed when you book.",
      },
      {
        id: "manimahesh-r-2",
        question: "Which vehicle is best for a Manimahesh group?",
        answer:
          "For up to seven or nine people, a Bolero, Scorpio or Tata Sumo. For a bigger group, a Tempo Traveller seats 12 to 17. More than one vehicle can be arranged.",
      },
      {
        id: "manimahesh-r-3",
        question: "How early should I book for the yatra?",
        answer:
          "As early as you know your dates. Yatra time is the busiest period and vehicles are confirmed on a first-come basis.",
      },
    ],
    related: [
      "salooni-to-chamba-taxi",
      "salooni-to-khajjiar-taxi",
      "salooni-to-pathankot-taxi",
    ],
  },
];

export function getTaxiRoute(slug: string): TaxiRoute | undefined {
  return taxiRoutes.find((route) => route.slug === slug);
}

export const taxiRoutePath = (slug: string) => `/routes/${slug}`;
