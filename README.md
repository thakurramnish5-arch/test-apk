# Himachal Ride Hub

A vehicle booking and enquiry website for Himachal Pradesh — cars, SUVs, pickups,
trucks, buses, tractors and JCB equipment. Enquiries are completed over WhatsApp
and phone; no payment gateway or login is involved.

Built with Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4 and
Lucide icons.

---

## Running the project

```bash
npm install      # install dependencies
npm run dev      # development server  → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

Use a different port with `PORT=3100 npm run start`.

> **Node version:** this project is pinned to Tailwind CSS `4.1.14` because
> Tailwind `4.2+` requires Node 20 or newer, and this machine runs Node 18.19.
> If you upgrade to Node 20+, you can raise Tailwind to the latest version.

---

## Routes

| Route              | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `/`                | Homepage — hero with booking widget, categories, fleet, services, destinations, testimonials, FAQ, contact |
| `/vehicles`        | Vehicle listing with search, category/location/capacity filters and sorting |
| `/vehicles/[slug]` | Vehicle detail — gallery, features, enquiry form, sticky mobile CTA (18 pages, statically generated) |
| `/services`        | All 12 services                                            |
| `/destinations`    | 12 Himachal destinations                                   |
| `/about`           | About the business                                         |
| `/contact`         | Full enquiry form and contact details                      |
| `/faq`             | 10 FAQs with `FAQPage` structured data                     |
| `/sitemap.xml`     | Generated sitemap                                          |
| `/robots.txt`      | Generated robots file                                      |

A custom 404 page and a route-level error boundary are also included.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, fonts, metadata, structured data
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Design tokens (colours, radii, motion) + base styles
│   ├── not-found.tsx         # 404 page
│   ├── error.tsx             # Error boundary
│   ├── loading.tsx           # Route loading state
│   ├── sitemap.ts            # Sitemap generation
│   ├── robots.ts             # robots.txt generation
│   ├── vehicles/
│   │   ├── page.tsx          # Listing page
│   │   └── [slug]/page.tsx   # Detail page
│   ├── services/ destinations/ about/ contact/ faq/
│
├── components/
│   ├── layout/               # Navbar, Footer, MobileBottomBar
│   ├── home/                 # Homepage sections
│   ├── vehicles/             # VehicleCard, VehicleBrowser, VehicleGallery
│   ├── forms/                # EnquiryForm (compact + full variants)
│   ├── shared/               # PageHeader, ServiceCard, DestinationCard,
│   │                         # FaqAccordion, ContactSection, ActionButtons,
│   │                         # SocialIcons, Icon registry
│   └── ui/                   # Button, Badge, RatingStars, SectionHeading, Reveal
│
├── config/
│   └── site.ts               # ★ ALL business configuration
│
├── data/
│   ├── vehicles.ts           # 18 demo vehicles
│   ├── categories.ts         # 7 vehicle categories
│   ├── testimonials.ts       # 8 demo testimonials
│   ├── services.ts           # 12 services
│   ├── destinations.ts       # 12 destinations
│   └── faqs.ts               # 10 FAQs
│
├── lib/
│   ├── whatsapp.ts           # WhatsApp message building + URL encoding
│   ├── validation.ts         # Form validation rules
│   ├── seo.ts                # Structured data helpers
│   └── utils.ts              # Small shared helpers
│
└── types/index.ts            # Shared TypeScript types
```

---

## Configuration

Contact details live in **`.env.local`** (copy `.env.example` to start).
Everything else about the business (name, social links, stats) lives in
**`src/config/site.ts`**.

### Change the phone, WhatsApp, email or address

Edit `.env.local`, then restart `npm run dev` (or redeploy):

```bash
NEXT_PUBLIC_PHONE_NUMBER=+918219769045    # call number, with country code
NEXT_PUBLIC_WHATSAPP_NUMBER=918219769045  # empty = same as the call number
NEXT_PUBLIC_CONTACT_EMAIL=bookings@example.in
NEXT_PUBLIC_ADDRESS_LINE1=Vehicle Booking Desk
NEXT_PUBLIC_ADDRESS_CITY=Salooni
NEXT_PUBLIC_ADDRESS_DISTRICT=Chamba
NEXT_PUBLIC_ADDRESS_STATE=Himachal Pradesh
NEXT_PUBLIC_ADDRESS_POSTAL_CODE=          # leave empty until confirmed
```

The displayed number (`+91 82197 69045`), call links, WhatsApp links, footer,
contact page and Google structured data all update from these. On Vercel or
another host, add the same variables in the project settings — the build
stops with a clear error if the phone, email, city or state is missing.

### Replace the social links

`src/config/site.ts` → `social`. They are currently `"#"` placeholders:

```ts
social: {
  instagram: "https://instagram.com/your-handle",
  facebook:  "https://facebook.com/your-page",
}
```

The icons appear in the footer and the contact section regardless — only the
destination changes.

### Change the brand name

`src/config/site.ts` → `brand.name`. It is not hard-coded anywhere else, so one
edit renames the navbar, footer, page titles, metadata and WhatsApp messages.

### Update the statistics

`src/config/site.ts` → `stats` — the "10,000+ Happy Customers" band on the
homepage.

---

## Replacing the demo content

All demo data is isolated in `src/data/` and typed against `src/types/index.ts`,
so your editor will flag anything missing.

### Vehicles — `src/data/vehicles.ts`

Each vehicle needs a unique `slug` (it becomes the URL at `/vehicles/<slug>`).
Image URLs are collected in the `IMG` object at the top of the file so several
vehicles can share a photo. Replace the whole `vehicles` array with the real
fleet; the listing filters, category pages, sitemap and detail pages all derive
from it automatically.

To use your own photography, put the files in `public/vehicles/` and reference
them as `/vehicles/name.jpg` — local images need no config changes. If you keep
using external URLs from a new domain, add that domain to `remotePatterns` in
`next.config.ts`.

### Testimonials — `src/data/testimonials.ts`

Every demo entry is marked `isDemo: true`, and while any remain the site shows a
notice stating the reviews are sample content rather than verified customer
reviews. Replace the entries with real feedback and set `isDemo: false`; the
notice then disappears on its own.

For the same reason, `aggregateRating` is deliberately **not** included in the
structured data in `src/lib/seo.ts` — publishing sample ratings as review markup
would misrepresent them to search engines. Add it only once you have genuine,
verifiable reviews.

### Other content

- **Categories** — `src/data/categories.ts` (also drives the filters and footer)
- **Services** — `src/data/services.ts` (`icon` maps to `src/components/shared/Icon.tsx`)
- **Destinations** — `src/data/destinations.ts`
- **FAQs** — `src/data/faqs.ts` (also generates the FAQ structured data)

---

## How the enquiry flow works

1. The visitor fills in a form. All three surfaces are the same `EnquiryForm`
   component in two variants:
   - **compact** — the hero widget and the vehicle detail sidebar. Collects
     Pickup Location, Drop Location, From Date, To Date, Pickup Time, Full Name
     and Mobile Number. On a vehicle page the vehicle is already known, so it is
     added to the message automatically.
   - **full** — `/contact`, which additionally asks for Vehicle Type,
     Passengers, Purpose of Booking and an additional message.
2. `src/lib/validation.ts` only validates the fields the surface actually shows,
   so the short widget never demands a field it did not render. On the full form
   it checks required fields, Indian mobile number format and that the end date
   is not before the start date. Errors appear inline and focus moves to the
   first invalid field.
3. `src/lib/whatsapp.ts` builds a formatted message from the entered details and
   URL-encodes it.
4. WhatsApp opens with the message pre-filled, and the page shows a confirmation
   with a "Continue on WhatsApp" fallback link in case the popup was blocked.

Every line of the message is conditional, so each surface produces a clean
message with no empty labels. From the hero widget:

```
*New Vehicle Booking Enquiry*

*Customer Details*
Name: Ramnish Kumar
Phone: 9876543210

*Booking Details*
Pickup: Chandigarh
Drop: Manali
From: 02 Nov 2026
To: 06 Nov 2026
Time: 07:30 AM

Please share availability and quotation.
```

And from the full form on `/contact`:

```
*New Vehicle Booking Enquiry*

*Customer Details*
Name: Rahul Sharma
Phone: 9876543210

*Booking Details*
Vehicle Type: SUV
Pickup: Chandigarh
Drop: Manali
From: 12 Oct 2026
To: 15 Oct 2026
Time: 08:00 AM
Passengers: 4

*Purpose*
Family Trip

*Additional Requirement*
Need a spacious vehicle with luggage space.

Please share availability and quotation.
```

---

## Environment variables

Copy `.env.example` to `.env.local`. Only one variable matters today:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.in
```

It is used for canonical URLs, the sitemap and Open Graph metadata. The
remaining entries in `.env.example` are commented-out placeholders for future
backend work (database, WhatsApp Business API, email, auth, payments) — nothing
in the current site requires them.

---

## Adding a backend later

The frontend is structured so an API can be added without rewriting components:

- `EnquiryDetails` in `src/types/index.ts` is the payload shape an API would receive.
- `EnquiryForm` has a marked spot in `handleSubmit` where a `POST /api/enquiry`
  call goes before WhatsApp opens.
- Data access already goes through helper functions (`getVehicleBySlug`,
  `getVehiclesByCategory`, …), so swapping the arrays for database queries is a
  change inside `src/data/` rather than across the UI.

---

## Verification performed

- `npm run build` — clean, 30 pages generated
- `npx tsc --noEmit` — no type errors
- `npx next lint` — no warnings or errors
- All 9 routes checked at 320 / 375 / 414 / 768 / 1024 / 1440 px: no horizontal
  overflow, no broken images, no console errors, one `<h1>` per page, metadata
  and canonical tags present
- axe-core WCAG 2.1 A/AA audit: **0 violations** across all routes
- Enquiry form: validation, phone format, date ordering, loading state, success
  state and the generated WhatsApp URL confirmed end to end
- Listing filters, search, sorting, empty state, deep links (`?category=`),
  mobile menu (including Escape to close) and the FAQ accordion all confirmed

### Notes on the demo content

- The vehicles, ratings, review counts, testimonials and the homepage statistics
  are **sample content for layout purposes**, not real business figures. Replace
  them before going live.
- No rates are shown anywhere. Every vehicle displays **"Price on enquiry"**,
  and the quotation is shared by the booking team after an enquiry. To publish
  rates later, change `startingFrom` in `src/data/vehicles.ts` and update the
  two places that render it (`VehicleCard` and the vehicle detail page).
- Demo photography is served from Unsplash. Every URL was checked to load, and
  images were chosen to suit Indian vehicles and Himachal settings — but they are
  stock photographs, not pictures of an actual fleet. Replace them with real
  vehicle photography before launch.
