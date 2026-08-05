import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import MarkdownBody from "@/components/MarkdownBody";
import {
  getPageContent,
  getSettings,
  type ContactFrontmatter,
} from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<ContactFrontmatter>("contact");
  const settings = getSettings();
  return {
    title: data.title,
    description: `Contact ${settings.brandName} at ${data.email}`,
  };
}

export default function ContactPage() {
  const { data, content } = getPageContent<ContactFrontmatter>("contact");
  const settings = getSettings();

  return (
    <div className="page-shell">
      <div className="bg-[#0f2744] pb-16 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300/90">
            {settings.brandName}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {data.ctaHeading || data.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <MarkdownBody content={content} />
        <ContactSection
          address={data.address}
          phone={data.phone}
          email={data.email}
          whatsapp={data.whatsapp}
          whatsappButtonText={data.whatsappButtonText}
          bookingCtaText={data.bookingCtaText}
          bookingCtaLink={data.bookingCtaLink}
        />
      </div>
    </div>
  );
}
