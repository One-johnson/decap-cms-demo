import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  image?: string;
}

export default function Hero({
  heading,
  description,
  ctaText,
  ctaHref = "/services",
  image,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0f2744]">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#0f2744]/92 via-[#0f2744]/75 to-[#0f2744]/45"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(45,212,191,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(56,189,248,0.12),transparent_45%),linear-gradient(160deg,#0f2744_0%,#163a5f_55%,#0c1f35_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28 lg:px-8 lg:pt-32">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-teal-300/90">
          Apex Consulting
        </p>
        <h1 className="animate-fade-up animation-delay-100 mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="animate-fade-up animation-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-slate-200/90">
          {description}
        </p>
        <div className="animate-fade-up animation-delay-300 mt-10">
          <Link
            href={ctaHref}
            className="inline-flex items-center rounded-md bg-teal-400 px-6 py-3 text-sm font-semibold text-[#0f2744] transition hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
