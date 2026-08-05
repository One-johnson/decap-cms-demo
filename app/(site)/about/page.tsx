import type { Metadata } from "next";
import MarkdownBody from "@/components/MarkdownBody";
import { getPageContent, type AboutFrontmatter } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getPageContent<AboutFrontmatter>("about");
  return {
    title: data.title,
    description: data.companyDescription,
  };
}

export default function AboutPage() {
  const { data, content } = getPageContent<AboutFrontmatter>("about");

  return (
    <div className="page-shell">
      <div className="bg-[#0f2744] pb-16 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300/90">
            Apex Consulting
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
      </div>
    </div>
  );
}
