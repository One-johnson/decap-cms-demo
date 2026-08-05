import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import MarkdownBody from "@/components/MarkdownBody";
import ServiceCards from "@/components/ServiceCards";
import {
  getPageContent,
  getSettings,
  type ServicesFrontmatter,
} from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<ServicesFrontmatter>("services");
  return {
    title: data.title,
    description: data.description,
  };
}

export default function ServicesPage() {
  const { data, content } = getPageContent<ServicesFrontmatter>("services");
  const settings = getSettings();

  return (
    <div className="page-shell">
      <div className="bg-[#0f2744] pb-16 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300/90">
            {settings.brandName}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200/90">
            {data.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <ServiceCards services={data.services ?? []} />
        <MarkdownBody content={content} className="mx-auto mt-16 max-w-3xl" />
      </div>

      <CtaBand
        heading={data.ctaBandHeading}
        description={data.ctaBandDescription}
        buttonText={data.ctaBandButtonText}
        buttonLink={data.ctaBandButtonLink}
      />
    </div>
  );
}
