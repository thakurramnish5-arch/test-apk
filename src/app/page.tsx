import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HappyCustomers } from "@/components/home/HappyCustomers";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AreasPreview } from "@/components/home/AreasPreview";
import { DestinationsPreview } from "@/components/home/DestinationsPreview";
import { LocalTrust } from "@/components/home/LocalTrust";
import { AdvanceBookingCta } from "@/components/home/AdvanceBookingCta";
import { FaqPreview } from "@/components/home/FaqPreview";
import { ContactSection } from "@/components/shared/ContactSection";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Salooni Taxi & Cab Service | ${siteConfig.brand.name}, Chamba`,
  description:
    "Local and outstation taxi and cab booking in Salooni, Chamba — plus bus, pickup, truck, tractor and JCB on hire, with experienced drivers. Enquire free on WhatsApp.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      {/* <FeaturedFleet /> */}
      <WhyChooseUs />
      <LocalTrust />
      <HappyCustomers />
      <HowItWorks />
      <DestinationsPreview />
      <ServicesPreview />
      <AreasPreview />
      <AdvanceBookingCta />
      <FaqPreview />
      <ContactSection className="bg-charcoal-50 py-10 sm:py-12 lg:py-14" />
    </>
  );
}
