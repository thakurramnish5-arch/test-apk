/** Shared domain types for the booking platform. */

export type VehicleCategory =
  | "car"
  | "pickup"
  | "truck"
  | "bus"
  | "tractor"
  | "jcb";

export type Availability = "available" | "limited" | "on-request";

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  image: string;
  gallery: string[];
  /** Seats for passenger vehicles, payload/usage note for commercial ones. */
  capacity: string;
  /** Numeric seat count. Null for non-passenger vehicles (truck, tractor, JCB). */
  seats: number | null;
  location: string;
  description: string;
  features: string[];
  suitableFor: string[];
  availability: Availability;
  enquiryEnabled: boolean;
  /** Optional indicative rate. Always presented as "Starting from". */
  startingFrom?: string;
}

export interface CategoryInfo {
  id: VehicleCategory;
  name: string;
  /** Plural label used in listings and filters. */
  pluralName: string;
  description: string;
  suitableUse: string;
  capacityNote?: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name, resolved via the icon map in components. */
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string;
  image: string;
  /** Qualitative trip note from Salooni, e.g. "Day trip from Salooni" — never invented hours or km. */
  driveNote: string;
  popularFor: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type BookingPurpose =
  | "Tourism"
  | "Family Trip"
  | "Business"
  | "Goods Transportation"
  | "Shifting"
  | "Construction"
  | "Agriculture"
  | "Event/Wedding"
  | "Other";

/** Payload assembled by every enquiry form on the site. */
export type TripType = "One Way" | "Round Trip";

export interface EnquiryDetails {
  name: string;
  phone: string;
  vehicleType: string;
  pickupLocation: string;
  dropLocation?: string;
  fromDate: string;
  toDate?: string;
  pickupTime?: string;
  /** One-way drop, or a round trip that comes back to the pickup point. */
  tripType?: TripType;
  passengers?: string;
  purpose?: BookingPurpose | "";
  message?: string;
  /** Set when the enquiry starts from a specific vehicle page. */
  vehicleName?: string;
  /** Marks an advance/future reservation rather than an immediate need. */
  isAdvanceBooking?: boolean;
}

/**
 * A landing page for one vehicle category, e.g. /taxi-car-booking.
 * Content must describe the real service — see src/data/categoryPages.ts.
 */
export interface CategoryPage {
  slug: string;
  category: VehicleCategory;
  /** Meta title; the "| brand" suffix is added by the layout template. */
  title: string;
  /** Meta description, kept within ~160 characters. */
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** schema.org Service `serviceType`. */
  serviceType: string;
  /** Short paragraphs, each under its own H2. */
  sections: { heading: string; body: string }[];
  /** Ids from src/data/faqs.ts shown on the page. */
  faqIds: string[];
}
