import Image from "next/image";
import CtaLink from "@/components/CtaLink";
import type { ServiceItem } from "@/lib/content";

interface ServiceCardsProps {
  services: ServiceItem[];
}

export default function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <ul className="mt-12 grid gap-8 sm:grid-cols-2">
      {services.map((service) => (
        <li
          key={service.title}
          className="group border-t border-slate-200 pt-6 transition hover:border-teal-400"
        >
          {service.image ? (
            <div className="relative mb-4 aspect-[16/9] overflow-hidden bg-slate-100">
              <Image
                src={service.image}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ) : null}
          <h3 className="text-lg font-semibold text-[#0f2744]">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {service.description}
          </p>
          {service.ctaText && service.ctaLink ? (
            <CtaLink
              href={service.ctaLink}
              className="mt-4 inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-800"
            >
              {service.ctaText}
              <span aria-hidden className="ml-1">
                →
              </span>
            </CtaLink>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
