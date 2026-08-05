interface ContactSectionProps {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export default function ContactSection({
  address,
  phone,
  email,
  whatsapp,
}: ContactSectionProps) {
  const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <dl className="mt-10 grid gap-8 sm:grid-cols-2">
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
  );
}
