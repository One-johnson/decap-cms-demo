import CtaLink from "@/components/CtaLink";

interface ContactSectionProps {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  whatsappButtonText?: string;
  bookingCtaText?: string;
  bookingCtaLink?: string;
}

export default function ContactSection({
  address,
  phone,
  email,
  whatsapp,
  whatsappButtonText = "Message on WhatsApp",
  bookingCtaText,
  bookingCtaLink,
}: ContactSectionProps) {
  const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <div>
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <dt className="section-label">Address</dt>
          <dd className="mt-3 text-lg text-foreground sm:text-xl">{address}</dd>
        </div>
        <div>
          <dt className="section-label">Phone</dt>
          <dd className="mt-3">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-lg text-foreground transition hover:text-gold-muted sm:text-xl"
            >
              {phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="section-label">Email</dt>
          <dd className="mt-3">
            <a
              href={`mailto:${email}`}
              className="text-lg text-foreground transition hover:text-gold-muted sm:text-xl"
            >
              {email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="section-label">WhatsApp</dt>
          <dd className="mt-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-foreground transition hover:text-gold-muted sm:text-xl"
            >
              {whatsapp}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-sm bg-gold px-6 py-3.5 text-base font-semibold text-white transition hover:bg-gold-muted"
        >
          {whatsappButtonText}
        </a>
        {bookingCtaText && bookingCtaLink ? (
          <CtaLink
            href={bookingCtaLink}
            className="inline-flex rounded-sm border border-charcoal/20 px-6 py-3.5 text-base font-semibold text-charcoal transition hover:border-gold hover:text-gold-muted"
          >
            {bookingCtaText}
          </CtaLink>
        ) : null}
      </div>
    </div>
  );
}
