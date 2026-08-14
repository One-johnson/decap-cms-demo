import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="section-label">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
          Page not found
        </h1>
        <span aria-hidden className="gold-rule mx-auto mt-6" />
        <p className="mt-6 text-lg leading-relaxed text-stone">
          The page you are looking for may have moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-sm bg-gold px-6 py-3.5 text-base font-semibold text-white transition hover:bg-gold-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-sm border border-charcoal/20 px-6 py-3.5 text-base font-semibold text-charcoal transition hover:border-gold hover:text-gold-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View services
          </Link>
        </div>
      </div>
    </div>
  );
}
