import { faqs } from "@/data/faqs";

/**
 * FAQ assistant knowledge base.
 *
 * Deliberately NOT an AI model: answers come only from text written here and
 * in the FAQ data, so the assistant can never invent a price, a discount or
 * an availability promise. Anything it cannot answer is handed to WhatsApp.
 *
 * To teach it something new, add an entry below with the words a customer
 * would actually type in `keywords` (English and common Hinglish spellings).
 */
export interface ChatTopic {
  id: string;
  /** Words that trigger this answer. Matched case-insensitively. */
  keywords: string[];
  answer: string;
  /** Shown as tappable follow-up chips under the answer. */
  related?: string[];
}

/**
 * The main menu, shown when the chat opens and whenever the visitor greets
 * the assistant. Tapping is always an option, so nobody has to type.
 */
export const mainMenu = [
  "🚗 Book a Car",
  "🚌 Book a Bus",
  "🛻 Book a Pickup",
  "🚚 Book a Truck",
  "🚜 Book a Tractor",
  "🏗️ Book a JCB",
  "💬 Something else",
];

/** Shown under "Something else" so the common questions stay one tap away. */
export const helpMenu = [
  "How do I get a price?",
  "Which places do you cover?",
  "Can I make an advance booking?",
  "How do I contact you?",
];

/** Kept for compatibility with the original starter chips. */
export const starterQuestions = mainMenu;

/**
 * Greetings that should reopen the menu rather than be searched for.
 * Covers English, Hindi and the usual chat openers.
 */
const greetings = [
  "hi", "hii", "hiii", "hello", "helo", "hey", "heya", "yo",
  "namaste", "namaskar", "hola", "salaam", "salam",
  "good morning", "good afternoon", "good evening", "gm", "gud morning",
  "start", "menu", "help", "madad", "kaise ho", "hlo",
];

export function isGreeting(input: string): boolean {
  const text = input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
  if (!text) return false;
  // Only treat it as a greeting when that is essentially the whole message,
  // so "hi, do you have a JCB" still gets a real answer.
  const words = text.split(/\s+/);
  if (words.length > 3) return false;
  return greetings.some((g) => text === g || text.startsWith(g + " "));
}

/**
 * Each "Book a ..." menu item maps to a short reply plus the follow-ups that
 * make sense for that vehicle. The reply never quotes a price.
 */
export const bookingFlows: Record<
  string,
  { answer: string; related: string[] }
> = {
  car: {
    answer:
      "From small cars like Alto and Dzire to 7-seaters like Ertiga, Bolero, Scorpio and Innova, plus a 4x4 Thar for rough roads — good for families, village roads, Chamba runs and Pathankot station or airport drops. Cars come with an experienced driver. Tell us your pickup village and dates and we will confirm availability with a quotation.",
    related: ["How do I get a price?", "Can I book a drop to Pathankot station?"],
  },
  bus: {
    answer:
      "We have 12–17 seater Tempo Travellers, a 27-seater mini bus and a 35-seater bus for weddings, functions, school trips and yatra groups. Larger buses need wider roads — tell us your route and we will advise before you book.",
    related: ["How do I get a price?", "Can I make an advance booking?"],
  },
  pickup: {
    answer:
      "Pickups carry up to about 1.5 tonne and are ideal for house shifting, shop stock and goods from Chamba. Tell us what you are moving and the road access at both ends.",
    related: ["How do I get a price?", "Which places do you cover?"],
  },
  truck: {
    answer:
      "Trucks are available from about 2.5 up to 10 tonne payload for goods from Chamba or Pathankot and building material. Share the load details and both locations so we can size it correctly.",
    related: ["How do I get a price?", "How do I contact you?"],
  },
  tractor: {
    answer:
      "Tractors are available with trolley and attachments for fields, orchards and local haulage around Salooni. Tell us the work and how many days you need it.",
    related: ["How do I get a price?", "How do I contact you?"],
  },
  jcb: {
    answer:
      "JCB backhoe loaders come with an experienced operator and can be hired hourly or daily for foundations, site levelling and road work. Tell us the site village and how long you need it.",
    related: ["How do I get a price?", "How do I contact you?"],
  },
};

/** Maps a tapped menu label (or typed words) to a booking flow key. */
export function matchBookingFlow(input: string): string | null {
  const text = input.toLowerCase();
  if (text.includes("jcb") || text.includes("backhoe")) return "jcb";
  if (text.includes("tractor")) return "tractor";
  if (text.includes("truck")) return "truck";
  if (text.includes("pickup")) return "pickup";
  if (text.includes("bus")) return "bus";
  // SUVs are listed under cars, so "suv" still lands on the car flow
  if (text.includes("suv")) return "car";
  if (text.includes("car")) return "car";
  return null;
}

export const chatTopics: ChatTopic[] = [
  // ---------------------------------------------------------- what we offer
  {
    id: "vehicles",
    keywords: [
      "vehicle", "vehicles", "car", "cars", "gaadi", "gadi", "what do you have",
      "fleet", "options", "available vehicle", "kya milta", "book kya",
    ],
    answer:
      "From Salooni we provide cars, buses, pickups, trucks, tractors and JCB, each with an experienced driver or operator — for family travel, weddings, goods, farm and construction work.",
    related: ["Do you have JCB or tractor?", "Can I book a bus for a group?"],
  },
  {
    id: "jcb",
    keywords: [
      "jcb", "tractor", "backhoe", "loader", "excavator", "construction",
      "digging", "farm", "agriculture", "kheti", "machine", "foundation",
      "khet", "trolley",
    ],
    answer:
      "Yes. JCB comes with an experienced operator and can be hired by the hour or by the day. Tractors come with a trolley and attachments for farm and haulage work around Salooni.",
    related: ["How do I get a price?", "Which places do you cover?"],
  },
  {
    id: "goods",
    keywords: [
      "truck", "pickup", "goods", "transport", "shifting", "moving", "saman",
      "samaan", "load", "cargo", "luggage shift", "house shift", "tempo",
      "shop", "dukan", "trader", "maal", "sand", "cement", "material",
    ],
    answer:
      "Yes. Pickups and trucks are available for house shifting, shop stock and goods from Chamba or Pathankot. Tell us what you are carrying and the road access at both ends, and we will suggest the right size.",
    related: ["How do I get a price?", "What vehicles can I book?"],
  },
  {
    id: "bus",
    keywords: [
      "bus", "group", "wedding", "shaadi", "school trip", "corporate",
      "traveller", "traveler", "tempo traveller", "12", "17", "27", "35", "seater",
      "baraat", "barat", "function", "yatra", "manimahesh",
    ],
    answer:
      "Yes. We have 12–17 seater Tempo Travellers, a 27-seater mini bus and a 35-seater bus for weddings, baraat guests, functions, school trips and yatras like Bharmour and Manimahesh. Larger buses need wider roads — we will tell you in advance if your route needs a smaller vehicle.",
    related: ["Which places do you cover?", "How do I get a price?"],
  },

  // ------------------------------------------------------------- the basics
  {
    id: "price",
    keywords: [
      "price", "rate", "cost", "charge", "kitna", "kitne", "paisa", "fare",
      "quotation", "quote", "budget", "per km", "kimat", "how much",
    ],
    answer:
      "The rate depends on the vehicle, the route and how many days you need it, so we quote for your exact trip — fair local rates, and the full figure is told before you confirm. Send your trip details on WhatsApp.",
    related: ["How do I book?", "Do I have to pay in advance?"],
  },
  {
    id: "booking",
    keywords: [
      "book", "booking", "how do i book", "reserve", "enquiry", "enquire",
      "kaise book", "process", "steps",
    ],
    answer:
      "Tell us the vehicle type, your pickup village and dates — through the enquiry form on this site, on WhatsApp or by phone. We check availability and come back with a quotation. Nothing is charged to ask.",
    related: ["How do I get a price?", "Can I make an advance booking?"],
  },
  {
    id: "payment",
    keywords: [
      "pay", "payment", "advance payment", "online payment", "card", "upi",
      "deposit", "token", "paisa dena", "pehle paise",
    ],
    answer:
      "No payment is taken on this website. Payment terms are agreed directly with our booking team once you accept the quotation.",
    related: ["How do I get a price?", "How do I book?"],
  },
  {
    id: "advance",
    keywords: [
      "advance booking", "in advance", "pehle se", "peak season", "holiday",
      "new year", "summer", "pre book", "prebook", "future date",
      "wedding season", "festival",
    ],
    answer:
      "Yes, and it is a good idea for wedding season, festivals and yatra time. Share your dates early — vehicles are confirmed on a first-come basis.",
    related: ["How do I book?", "How quickly will I get a reply?"],
  },
  {
    id: "response",
    keywords: [
      "how long", "reply", "response", "kitni der", "kab tak", "urgent",
      "jaldi", "today", "abhi", "right now", "immediately",
    ],
    answer:
      "Enquiries are usually answered within a short time during business hours. For anything urgent, calling or messaging on WhatsApp is the fastest way to reach the booking team.",
    related: ["How do I book?", "How do I contact you?"],
  },

  // ----------------------------------------------------------- where and how
  {
    id: "places",
    keywords: [
      "place", "places", "destination", "where", "location", "cover", "area",
      "salooni", "saluni", "kihar", "bhandal", "chamba", "dalhousie",
      "khajjiar", "banikhet", "bharmour", "dharamshala", "manali", "shimla",
      "village", "gaon", "tehsil", "jagah",
    ],
    answer:
      "We serve Salooni tehsil and nearby areas, including Kihar and Bhandal valley. Trips start from Salooni and go to Chamba, Dalhousie, Khajjiar, Banikhet, Bharmour, Dharamshala, Pathankot, Amritsar, Jammu, Chandigarh, Delhi and longer trips like Manali or Shimla. See the Destinations page for more.",
    related: ["Can I book a drop to Pathankot station?", "What vehicles can I book?"],
  },
  {
    id: "outstation",
    keywords: [
      "chandigarh", "delhi", "outside", "outstation", "other city", "airport",
      "railway", "station", "pick me", "pickup from", "gaggal", "kangra",
      "pathankot", "amritsar", "jammu", "train", "flight", "drop",
    ],
    answer:
      "Yes. We do drops and pickups for Pathankot railway station and airport, Kangra airport at Gaggal, Amritsar and Jammu, and trips to Chandigarh or Delhi. Share your train or flight time and we will plan the pickup from Salooni.",
    related: ["Which places do you cover?", "How do I book?"],
  },
  {
    id: "multiday",
    keywords: [
      "multiple days", "multi day", "days", "week", "tour", "circuit",
      "itinerary", "kitne din", "3 din", "long trip",
    ],
    answer:
      "Yes. You can book a vehicle for several days, for weddings, yatras or longer trips like Manali or Shimla. Share your start and end dates and we will confirm availability with a day-wise quotation.",
    related: ["How do I get a price?", "Which places do you cover?"],
  },
  {
    id: "driver",
    keywords: [
      "driver", "self drive", "without driver", "chalak", "khud chala",
      "license", "self-drive", "drive myself",
    ],
    answer:
      "Vehicles come with experienced drivers who know the hill roads around Salooni and Chamba. Self-drive is not offered.",
    related: ["What vehicles can I book?", "How do I book?"],
  },
  {
    id: "contact",
    keywords: [
      "contact", "phone", "number", "whatsapp", "call", "talk", "baat",
      "speak", "reach", "email", "address", "office",
    ],
    answer:
      "You can reach our booking team on WhatsApp or by phone — both are on this page and on the Contact page. WhatsApp is usually fastest.",
    related: ["How quickly will I get a reply?", "How do I book?"],
  },
  {
    id: "cancel",
    keywords: [
      "cancel", "cancellation", "refund", "change date", "reschedule",
      "postpone", "date badal",
    ],
    answer:
      "Changes and cancellations are handled case by case with the booking team, since terms depend on the vehicle and how close it is to your travel date. Message us on WhatsApp as early as you can.",
    related: ["How do I contact you?", "Can I make an advance booking?"],
  },
];

/**
 * FAQ entries become topics too, keyed off the words in the question, so the
 * assistant stays in sync with the FAQ page without duplicating the answers.
 */
const stopWords = new Set([
  "can", "i", "a", "the", "for", "do", "you", "my", "how", "will", "is",
  "are", "to", "of", "in", "on", "and", "or", "it", "receive", "make",
]);

const faqTopics: ChatTopic[] = faqs.map((faq) => ({
  id: `faq-${faq.id}`,
  keywords: faq.question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w)),
  answer: faq.answer,
}));

export const allTopics: ChatTopic[] = [...chatTopics, ...faqTopics];

/**
 * Scores every topic against what the visitor typed and returns the best
 * match, or null when nothing is close enough — in which case the UI offers
 * WhatsApp instead of guessing.
 */
/**
 * Subjects we are asked about but genuinely cannot answer. Without this, a
 * question like "what is the weather in Manali" would match the destinations
 * topic on the word "manali" alone and return something irrelevant.
 */
const outOfScope = [
  "weather", "temperature", "snowfall", "forecast", "rain", "mausam",
  "hotel", "stay", "room", "resort", "homestay", "restaurant", "food",
  // "train" and "flight" are not listed: station and airport drops are a
  // core service, so those words must reach the outstation topic.
  "permit", "visa", "passport", "ticket",
  "job", "hiring", "vacancy", "salary", "driver job",
];

export function findAnswer(input: string): ChatTopic | null {
  const text = ` ${input.toLowerCase().replace(/[^a-z0-9\s]/g, " ")} `;
  if (text.trim().length < 2) return null;

  // Hand these to a human rather than answering from a partial keyword hit.
  if (outOfScope.some((word) => text.includes(` ${word} `))) return null;

  let best: ChatTopic | null = null;
  let bestScore = 0;

  for (const topic of allTopics) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (text.includes(` ${keyword} `)) {
        // Longer keyword matches are stronger signals than short ones.
        score += keyword.includes(" ") ? 4 : 2;
      } else if (keyword.length > 4 && text.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  return bestScore >= 2 ? best : null;
}
