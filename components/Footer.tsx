import Link from "next/link";
import CtaLink from "@/components/CtaLink";

interface FooterProps {
  brandName: string;
  blurb: string;
  ctaText: string;
  ctaLink: string;
}

export default function Footer({
  brandName,
  blurb,
  ctaText,
  ctaLink,
}: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <p className="text-base font-semibold text-[#0f2744]">{brandName}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{blurb}</p>
          <CtaLink
            href={ctaLink}
            className="mt-5 inline-flex rounded-md bg-[#0f2744] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#163a5f]"
          >
            {ctaText}
          </CtaLink>
        </div>

        <div className="flex gap-10 text-sm">
          <div>
            <p className="font-medium text-[#0f2744]">Pages</p>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>
                <Link href="/" className="hover:text-teal-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-700">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-slate-500 lg:px-8">
          © {new Date().getFullYear()} {brandName}. Content managed with Decap
          CMS.
        </p>
      </div>
    </footer>
  );
}
