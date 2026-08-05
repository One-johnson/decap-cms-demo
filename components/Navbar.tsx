"use client";

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-charcoal/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-charcoal/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="font-display text-3xl font-semibold tracking-tight text-gold-light transition-opacity hover:opacity-90"
        >
          {brandName}
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-gold-light/90 md:hidden"
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
                        ? "text-gold-light"
                        : "text-white/80 hover:text-gold-light"
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
            className="rounded-sm bg-gold px-5 py-2.5 text-base font-semibold text-charcoal transition hover:bg-gold-light"
          >
            {ctaText}
          </CtaLink>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/15 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-base font-medium ${
                      active ? "text-gold-light" : "text-white/90"
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
                className="inline-flex rounded-sm bg-gold px-5 py-2.5 text-base font-semibold text-charcoal"
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
