import type { TitleDescriptionItem } from "@/lib/content";

interface ProcessStepsProps {
  heading?: string;
  steps: TitleDescriptionItem[];
}

export default function ProcessSteps({
  heading = "Our Process",
  steps,
}: ProcessStepsProps) {
  if (!steps.length) return null;

  return (
    <section className="border-t border-gold/15 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="section-label">How we work</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          {heading}
        </h2>
        <span aria-hidden className="gold-rule animate-draw-line mt-6" />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="font-display text-5xl font-semibold text-gold/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone sm:text-lg">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
