import { CarFront, ClipboardList, FileCheck2, MessageSquareText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    icon: CarFront,
    title: "Choose Your Vehicle",
    description:
      "Pick a vehicle type, or just tell us the job. We will suggest the right one.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Share Your Requirement",
    description:
      "Send your date, route, number of people or load on WhatsApp, phone or the form.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Get Availability & Quote",
    description:
      "We check what is free for your date and tell you the full rate upfront.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Confirm Your Booking",
    description:
      "Say yes and the vehicle and driver are booked for your date and time.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          description="Four simple steps from your first message to a booked vehicle."
        />

        <ol className="relative mt-6 sm:mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line across the four steps on large screens */}
          <div
            className="absolute left-0 right-0 top-[34px] hidden border-t-2 border-dashed border-forest-200 lg:block"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80} as="li">
              <div className="relative h-full">
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <span className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-forest-200 bg-white shadow-sm">
                    <step.icon
                      className="h-6 w-6 text-forest-700"
                      aria-hidden="true"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-[11px] font-bold text-white">
                      {step.number}
                    </span>
                  </span>

                  <h3 className="mt-4 text-[15px] font-bold text-charcoal-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <LinkButton href="/contact#enquiry" size="lg" variant="primary">
            Start an Enquiry
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
