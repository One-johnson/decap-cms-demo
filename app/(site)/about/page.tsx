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

const highlights = [
  { value: "2014", label: "Established in Accra" },
  { value: "12+", label: "Years of experience" },
  { value: "WA", label: "West African reach" },
];

export default function AboutPage() {
  const { data, content } = getPageContent<AboutFrontmatter>("about");
  const settings = getSettings();

  return (
    <div className="page-shell">
      <div className="relative overflow-hidden bg-charcoal pb-20 pt-28 lg:pb-24 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(201,162,39,0.18),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(224,195,90,0.08),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-display text-3xl font-semibold tracking-tight text-gold-light sm:text-4xl">
            {settings.brandName}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {data.title}
          </h1>
          <span aria-hidden className="gold-rule mt-7" />
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-light sm:text-2xl">
            {data.companyDescription}
          </p>
        </div>
      </div>

      <section className="border-b border-gold/15 bg-charcoal-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3 sm:gap-10 lg:px-8 lg:py-14">
          {highlights.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-gold-light sm:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-base text-stone-light sm:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="animate-fade-up">
            <p className="section-label text-gold">Mission</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {data.mission}
            </p>
          </div>
          <div className="animate-fade-up animation-delay-100">
            <p className="section-label text-gold">Vision</p>
            <span aria-hidden className="gold-rule mt-4" />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {data.vision}
            </p>
          </div>
        </div>
      </section>

      {data.values && data.values.length > 0 ? (
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label">What guides us</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              Core values
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.values.map((value, index) => (
                <li
                  key={value.title}
                  className="animate-fade-up border-t border-gold/30 pt-7"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <p className="font-display text-3xl font-semibold text-gold/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-gold/15 bg-surface/60 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="section-label">Our story</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                Background & milestones
              </h2>
              <span aria-hidden className="gold-rule mt-6" />
            </div>
            <MarkdownBody content={content} />
          </div>
        </div>
      </section>

      {data.complianceItems && data.complianceItems.length > 0 ? (
        <section className="bg-charcoal py-20 text-white lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="section-label text-gold">Standards</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gold-light sm:text-5xl">
              {data.complianceHeading || "Compliance & Certifications"}
            </h2>
            <span aria-hidden className="gold-rule mt-6" />

            <ul className="mt-14 grid gap-10 sm:grid-cols-2">
              {data.complianceItems.map((item, index) => (
                <li
                  key={item.label}
                  className="animate-fade-up border-t border-gold/20 pt-7"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <h3 className="font-display text-2xl font-semibold text-gold-light">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-stone-light">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>

            {data.ctaText && data.ctaLink ? (
              <div className="mt-14">
                <CtaLink
                  href={data.ctaLink}
                  className="inline-flex rounded-sm bg-gold px-6 py-3.5 text-base font-semibold text-charcoal transition hover:bg-gold-light"
                >
                  {data.ctaText}
                </CtaLink>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <CtaBand
        heading={data.ctaBandHeading}
        description={data.ctaBandDescription}
        buttonText={data.ctaBandButtonText}
        buttonLink={data.ctaBandButtonLink}
      />
    </div>
  );
}
