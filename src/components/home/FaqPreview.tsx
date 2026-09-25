import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqs } from "@/data/faqs";

/** Homepage FAQ preview — the first six questions. */
export function FaqPreview() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Straight answers on price, drivers and pickups — what people in Salooni ask before booking."
        />

        <div className="mx-auto mt-6 sm:mt-8 max-w-3xl">
          <FaqAccordion items={faqs.slice(0, 6)} />

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <LinkButton href="/faq" variant="outline">
              View All FAQs
            </LinkButton>
            <LinkButton href="/contact#enquiry" variant="primary">
              Ask a Question
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
