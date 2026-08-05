import Image from "next/image";
import CtaLink from "@/components/CtaLink";
import type { ServiceItem } from "@/lib/content";

interface ServiceCardsProps {
  services: ServiceItem[];
}

export default function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <ul className="mt-12 space-y-16">
      {services.map((service, index) => (
        <li
          key={service.title}
          className="animate-fade-up border-t border-gold/25 pt-10"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-label">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                {service.title}
              </h3>
              {service.ctaText && service.ctaLink ? (
                <CtaLink
                  href={service.ctaLink}
                  className="mt-6 inline-flex text-base font-semibold text-gold-muted transition hover:text-gold"
                >
                  {service.ctaText}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </CtaLink>
              ) : null}
            </div>
            <div>
              {service.image ? (
                <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-charcoal/5">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}
              <p className="text-lg leading-relaxed text-stone whitespace-pre-line sm:text-xl">
                {service.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
