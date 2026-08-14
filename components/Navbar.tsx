"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CtaLink from "@/components/CtaLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  brandName: string;
  logo?: string;
  ctaText: string;
  ctaLink: string;
}

export default function Navbar({
  brandName,
  logo,
  ctaText,
  ctaLink,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-gold/15 bg-surface/95 shadow-sm shadow-charcoal/10 backdrop-blur-md"
          : "border-transparent bg-surface/90 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-8">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
          aria-label={`${brandName} home`}
        >
          {logo ? (
            <Image
              src={logo}
              alt={brandName}
              width={200}
              height={93}
              priority
              className="h-11 w-auto object-contain sm:h-12"
            />
          ) : (
            <span className="font-display text-3xl font-semibold tracking-tight text-gold">
              {brandName}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-gold md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-base font-medium transition-colors ${
                      active
                        ? "text-gold"
                        : "text-stone hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <CtaLink
            href={ctaLink}
            className="rounded-sm bg-gold px-5 py-2.5 text-base font-semibold text-white transition hover:bg-gold-muted"
          >
            {ctaText}
          </CtaLink>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/15 bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-base font-medium ${
                      active ? "text-gold" : "text-stone"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <CtaLink
                href={ctaLink}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-sm bg-gold px-5 py-2.5 text-base font-semibold text-white"
              >
                {ctaText}
              </CtaLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
