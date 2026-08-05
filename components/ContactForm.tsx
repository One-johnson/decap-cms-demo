"use client";

import { FormEvent, useState } from "react";

interface ContactFormProps {
  heading?: string;
  buttonText?: string;
  successMessage?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  heading = "Send us a message",
  buttonText = "Send message",
  successMessage = "Thanks — we received your message and will reply soon.",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-sm border border-charcoal/15 bg-surface px-3.5 py-3 text-base text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

  return (
    <div className="border border-gold/20 bg-surface p-6 sm:p-8">
      <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
        {heading}
      </h2>

      {status === "success" ? (
        <p className="mt-4 text-base leading-relaxed text-gold-muted sm:text-lg">
          {successMessage}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-base font-medium text-foreground"
            >
              Phone{" "}
              <span className="font-normal text-stone-light">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-base font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={`${inputClass} resize-y`}
            />
          </div>

          {status === "error" ? (
            <p className="text-base text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex rounded-sm bg-gold px-6 py-3.5 text-base font-semibold text-charcoal transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : buttonText}
          </button>
        </form>
      )}
    </div>
  );
}
