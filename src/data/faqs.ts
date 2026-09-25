import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/types";

/**
 * FAQ content. Also used to generate FAQPage structured data.
 * The first six appear on the homepage and contact page, so price and
 * drivers — the two things customers ask before trusting a booking — lead.
 */
export const faqs: FaqItem[] = [
  {
    id: "f-7",
    question: "How does pricing work?",
    answer:
      "The rate depends on the vehicle, the route and the number of days, so we quote for your exact trip. You get the full figure on WhatsApp or by phone before you confirm — fair local rates and no hidden charges added later.",
  },
  {
    id: "f-11",
    question: "Do your vehicles come with a driver?",
    answer:
      "Yes. Every car, bus, pickup and truck comes with an experienced driver who knows the hill roads around Salooni and Chamba, and every JCB and tractor comes with its operator. Self-drive is not offered.",
  },
  {
    id: "f-1",
    question: "Do you pick up from villages around Salooni?",
    answer:
      "Yes. We pick up from Salooni and nearby villages in the tehsil, including the Kihar and Bhandal valley side. Tell us your village and the road access, and we will confirm.",
  },
  {
    id: "f-3",
    question: "Can I book a vehicle for a wedding or function?",
    answer:
      "Yes. We provide cars for the groom, and buses or Tempo Travellers for the baraat and guests, with drivers used to wedding-day timings. Tell us the dates, the number of guests and the pickup villages.",
  },
  {
    id: "f-5",
    question: "Can you bring goods from Chamba or Pathankot?",
    answer:
      "Yes. Pickups and trucks are available for shop stock, trader goods and house shifting. Tell us what you are carrying and where, and we will suggest the right size.",
  },
  {
    id: "f-6",
    question: "Can I book a JCB or tractor for local work?",
    answer:
      "Yes. JCB comes with an experienced operator and can be hired by the hour or by the day. Tractors come with an experienced operator, plus trolley and attachments for farm and haulage work around Salooni.",
  },
  {
    id: "f-2",
    question: "Can I book a vehicle to Pathankot railway station?",
    answer:
      "Yes. We do drops and pickups for Pathankot railway station and airport. Share your train or flight time and we will plan the pickup from Salooni to match it.",
  },
  {
    id: "f-4",
    question: "Can I book a bus for a group or yatra?",
    answer:
      "Yes. We have 12–17 seater Tempo Travellers, a 27-seater mini bus and a 35-seater bus for weddings, school trips and pilgrimages such as Bharmour and Manimahesh. Big buses need wider roads, so we will tell you if your route needs a smaller vehicle.",
  },
  {
    id: "f-8",
    question: "Can I make an advance booking?",
    answer:
      "Yes, and it is a good idea for wedding season, festivals and yatra time. Share your dates early. Vehicles are confirmed on a first-come basis.",
  },
  {
    id: "f-9",
    question: "Can I book a trip to Chamba for a hospital visit?",
    answer:
      "Yes. We do Chamba trips for hospital and medical visits. Tell us the pickup village and time, and whether you need the vehicle to wait and bring you back.",
  },
  {
    id: "f-10",
    question: "Can I contact you directly on WhatsApp?",
    answer: `Yes. You can message us on WhatsApp at ${siteConfig.contact.phoneDisplay} for availability, quotations or any question about your booking. Every enquiry form on this site can also open WhatsApp with your details already filled in.`,
  },
];
