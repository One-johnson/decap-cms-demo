import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import CtaLink from "@/components/CtaLink";
import MarkdownBody from "@/components/MarkdownBody";
import {
  getPageContent,
  getSettings,
  type AboutFrontmatter,
} from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<AboutFrontmatter>("about");
  return {
    title: data.title,
    description: data.companyDescription,
  };
}

export default function AboutPage() {
  const { data, content } = getPageContent<AboutFrontmatter>("about");
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
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <p className="text-lg leading-relaxed text-slate-700">
          {data.companyDescription}
        </p>

        <dl className="mt-14 space-y-10">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Mission
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-slate-700">
              {data.mission}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Vision
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-slate-700">
              {data.vision}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Values
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-slate-700">
              {data.values}
            </dd>
          </div>
        </dl>

        <MarkdownBody content={content} className="mt-14" />

        {data.ctaText && data.ctaLink ? (
          <div className="mt-10">
            <CtaLink
              href={data.ctaLink}
              className="inline-flex rounded-md bg-[#0f2744] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163a5f]"
            >
              {data.ctaText}
            </CtaLink>
          </div>
        ) : null}
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
