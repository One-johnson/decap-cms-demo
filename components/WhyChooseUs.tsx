import type { TitleDescriptionItem } from "@/lib/content";

interface WhyChooseUsProps {
  heading?: string;
  items: TitleDescriptionItem[];
}

export default function WhyChooseUs({
  heading = "Why Choose Us",
  items,
}: WhyChooseUsProps) {
  if (!items.length) return null;

  return (
    <section className="border-t border-gold/15 bg-charcoal py-20 text-white lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="section-label text-gold">Why partner with us</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gold-light sm:text-5xl">
          {heading}
        </h2>
        <span aria-hidden className="gold-rule animate-draw-line mt-6" />

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="animate-fade-up border-t border-gold/20 pt-7"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="font-display text-2xl font-semibold text-gold-light">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-light sm:text-lg">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
