import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

const pageTitle = "Privacy Policy";
const pageDescription = `How ${siteConfig.brand.name} collects, uses and protects the details you share when you enquire or book a vehicle.`;

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/privacy-policy",
});

const lastUpdated = "6 October 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "What we collect",
    body: [
      "When you send an enquiry or booking request on this website, we collect your name, mobile number and trip details — vehicle type, pickup and drop locations, dates, time, number of passengers, purpose and any message you add.",
      "When you message us on WhatsApp or call us, we receive your phone number, your WhatsApp profile name and the messages you send.",
      "We do not ask for payment card details, ID documents or passwords on this website.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Only to reply to your enquiry, check vehicle availability, share pricing, arrange your trip and contact you about that booking.",
      "After you submit an enquiry, we may send you a WhatsApp message confirming that we received it. We send these through the official WhatsApp Business Platform provided by Meta.",
      "We do not use your details for advertising and we never sell or rent them to anyone.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "Your enquiry is emailed to our booking team using Google Gmail. WhatsApp messages are handled by Meta (WhatsApp). The website is hosted by Vercel.",
      "These providers process your details only so we can run the service, under their own privacy policies. We may also share details when the law requires it.",
      "The driver or operator assigned to your booking receives the details needed for the trip, such as your name, number and pickup location.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep enquiry and booking details only as long as needed to handle your booking and for our normal business records, and then delete them.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us to show, correct or delete the details we hold about you, or tell us to stop sending you WhatsApp messages — reply STOP on WhatsApp or contact us using the details below.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change how we handle your details, we will update this page and the date at the top.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const { contact, brand } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${brand.name} handles the details you share with us.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-8 text-charcoal-700">
            <p className="text-sm text-charcoal-500">Last updated: {lastUpdated}</p>

            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-bold text-forest-900">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="font-display text-xl font-bold text-forest-900">
                Contact us
              </h2>
              <div className="mt-3 space-y-1 leading-relaxed">
                <p>{brand.name}</p>
                <p>
                  Phone / WhatsApp:{" "}
                  <a className="font-semibold text-forest-700 underline" href={`tel:${contact.phoneNumber}`}>
                    {contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a className="font-semibold text-forest-700 underline" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
