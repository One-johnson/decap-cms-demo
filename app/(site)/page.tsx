import type { Metadata } from "next";
import Hero from "@/components/Hero";
import MarkdownBody from "@/components/MarkdownBody";
import { getPageContent, type HomeFrontmatter } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<HomeFrontmatter>("home");
  return {
    title: data.title,
    description: data.heroDescription,
  };
}

export default function HomePage() {
  const { data, content } = getPageContent<HomeFrontmatter>("home");

  return (
    <>
      <Hero
        heading={data.heroHeading}
        description={data.heroDescription}
        ctaText={data.ctaText}
        ctaHref="/services"
        image={data.heroImage}
      />
      <section className="page-shell">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <MarkdownBody content={content} />
        </div>
      </section>
    </>
  );
}
