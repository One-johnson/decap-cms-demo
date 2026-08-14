import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactSection from "@/components/ContactSection";
import MarkdownBody from "@/components/MarkdownBody";
import {
  getPageContent,
  getSettings,
  type ContactFrontmatter,
} from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<ContactFrontmatter>("contact");
  return {
    title: "Contact Us",
    description:
      "Contact GOLDENMARK GHANA LTD. in Greater Accra for gold sourcing, aggregation, trading and partnership inquiries.",
    alternates: { canonical: "/contact" },
    openGraph: {
      title: "Contact GOLDENMARK GHANA LTD.",
      description:
        "Reach our Greater Accra team for licensed gold aggregation and commercial partnership inquiries.",
      url: "/contact",
    },
  };
}

export default function ContactPage() {
  const { data, content } = getPageContent<ContactFrontmatter>("contact");
  const settings = getSettings();

  return (
    <div className="page-shell">
      <div className="bg-charcoal pb-16 pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-3xl font-semibold tracking-tight text-gold-light sm:text-4xl">
            {settings.brandName}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            {data.ctaHeading || data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-7" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <MarkdownBody content={content} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactSection
            address={data.address}
            phone={data.phone}
            email={data.email}
            whatsapp={data.whatsapp}
            whatsappButtonText={data.whatsappButtonText}
            bookingCtaText={data.bookingCtaText}
            bookingCtaLink={data.bookingCtaLink}
          />
          <ContactForm
            heading={data.formHeading}
            buttonText={data.formButtonText}
            successMessage={data.formSuccessMessage}
          />
        </div>
      </div>
    </div>
  );
}
