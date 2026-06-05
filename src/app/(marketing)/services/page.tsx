import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, operations, org design, data, market entry, and advisory retainers — how Norfield Initiative helps organizations move.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-16 pb-12">
        <p className="eyebrow">Services</p>
        <h1 className="mt-5 max-w-3xl text-display-lg font-semibold">
          Diverse solutions, tailored to your needs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">
          We offer focused, senior-led engagements from consulting through
          implementation — sized to the decision in front of you, not padded to
          fill a statement of work.
        </p>
      </section>

      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-card border border-line">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <div
                id={s.slug}
                className={`scroll-mt-24 grid gap-6 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] ${
                  i !== 0 ? "border-t border-line" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-ink-faint">[{s.number}]</span>
                    <h2 className="text-3xl font-semibold tracking-tight">{s.title}</h2>
                  </div>
                  <p className="mt-4 max-w-md text-ink-muted">{s.summary}</p>
                </div>
                <div className="bg-surface lg:rounded-card lg:p-8">
                  <p className="leading-relaxed text-ink-muted">{s.description}</p>
                  <h3 className="eyebrow mt-7">What you get</h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-ink">
                        <span aria-hidden className="mt-1 text-ink-faint">✳</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-surface p-8">
          <p className="max-w-md text-lg font-medium">
            Not sure which fits? Start with a conversation and we&apos;ll point you
            to the right one.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a consult
          </Link>
        </div>
      </section>
    </>
  );
}
