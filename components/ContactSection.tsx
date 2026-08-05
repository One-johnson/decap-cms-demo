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
    <div className="mt-10">
      <dl className="grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Address
          </dt>
          <dd className="mt-2 text-base text-slate-700">{address}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Phone
          </dt>
          <dd className="mt-2">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-base text-slate-700 hover:text-teal-700"
            >
              {phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Email
          </dt>
          <dd className="mt-2">
            <a
              href={`mailto:${email}`}
              className="text-base text-slate-700 hover:text-teal-700"
            >
              {email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            WhatsApp
          </dt>
          <dd className="mt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-slate-700 hover:text-teal-700"
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
          className="inline-flex rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-[#0f2744] transition hover:bg-teal-300"
        >
          {whatsappButtonText}
        </a>
        {bookingCtaText && bookingCtaLink ? (
          <CtaLink
            href={bookingCtaLink}
            className="inline-flex rounded-md border border-[#0f2744]/20 px-5 py-3 text-sm font-semibold text-[#0f2744] transition hover:border-teal-500 hover:text-teal-700"
          >
            {bookingCtaText}
          </CtaLink>
        ) : null}
      </div>
    </div>
  );
}
