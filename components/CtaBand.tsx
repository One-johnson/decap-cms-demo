import CtaLink from "@/components/CtaLink";

interface CtaBandProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CtaBand({
  heading,
  description,
  buttonText,
  buttonLink,
}: CtaBandProps) {
  if (!heading || !buttonText || !buttonLink) return null;

  return (
    <section className="bg-[#0f2744]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {heading}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              {description}
            </p>
          ) : null}
        </div>
        <CtaLink
          href={buttonLink}
          className="inline-flex shrink-0 items-center rounded-md bg-teal-400 px-6 py-3 text-sm font-semibold text-[#0f2744] transition hover:bg-teal-300"
        >
          {buttonText}
        </CtaLink>
      </div>
    </section>
  );
}
