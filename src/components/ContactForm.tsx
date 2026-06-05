"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const services = [
  "Strategy & Planning",
  "Operations & Process",
  "Org Design & Change",
  "Data & Analytics",
  "Market Entry & Growth",
  "Advisory Retainer",
  "Not sure yet",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-ink text-bg">✓</div>
        <h3 className="mt-5 text-xl font-semibold">Thanks — we&apos;ve got it.</h3>
        <p className="mt-3 text-ink-muted">
          We&apos;ll be in touch within one business day. If it&apos;s urgent,
          email us directly and reference your name.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-sm text-ink-muted">
            How can we help?
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-ink-muted">
          What are you weighing? <span className="text-ink-faint">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A few sentences on the decision or challenge in front of you."
          className="rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-ink"
        />
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && (
        <p className="mt-4 text-sm text-ink">⚠ {error}</p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-ink-faint">
          We&apos;ll only use your details to respond. No lists, no spam.
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-ink-muted">
        {label} {required && <span className="text-ink-faint">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-ink"
      />
    </div>
  );
}
