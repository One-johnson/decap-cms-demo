"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CtaLink from "@/components/CtaLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  brandName: string;
  ctaText: string;
  ctaLink: string;
}

export default function Navbar({ brandName, ctaText, ctaLink }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          {brandName}
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/90 md:hidden"
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
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? "text-teal-300"
                        : "text-white/85 hover:text-white"
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
            className="rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-[#0f2744] transition hover:bg-teal-300"
          >
            {ctaText}
          </CtaLink>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0f2744]/95 px-6 py-4 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm font-medium ${
                      active ? "text-teal-300" : "text-white/90"
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
                className="inline-flex rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-[#0f2744]"
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
