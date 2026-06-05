import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { site, capabilities } from "@/lib/site";
import { services } from "@/lib/services";
import { getResourcesByType, resourceTypeLabels } from "@/content/resources";

const approach = [
  {
    label: "Diagnose",
    body: "We start by understanding what's actually happening — not what the org chart says should be. Evidence first, opinions second.",
  },
  {
    label: "Prioritize",
    body: "A short list of the bets that matter most, sequenced so early wins fund the harder work. Focus is the deliverable.",
  },
  {
    label: "Execute",
    body: "We work alongside your team, not above it — translating strategy into the decisions and habits that change Monday.",
  },
  {
    label: "Enable",
    body: "We leave behind dashboards, playbooks, and a cadence so progress continues long after the engagement ends.",
  },
];

export default function HomePage() {
  const latest = getResourcesByType().slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="container-x pt-10 sm:pt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-line bg-surface">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="eyebrow">Consulting &amp; Advisory</p>
                <h1 className="mt-6 text-display-lg font-semibold">
                  Norfield
                  <br />
                  Initiative
                </h1>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-muted">
                  {site.tagline} We partner with leadership teams to make the hard
                  calls clearer and the next move obvious.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="/contact" className="btn-primary">
                    Book a consult
                  </Link>
                  <Link href="/services" className="btn-outline">
                    Explore services
                  </Link>
                </div>
              </div>

              {/* Capabilities panel */}
              <div className="border-t border-line bg-bg/40 p-8 sm:p-12 lg:border-l lg:border-t-0">
                <p className="text-sm text-ink-faint">Where we help</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {capabilities.map((c) => (
                    <span key={c} className="pill">
                      <span aria-hidden className="text-ink-faint">✳</span>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mission line */}
        <Reveal delay={80}>
          <p className="mx-auto mt-16 max-w-3xl text-display-md font-medium tracking-tight">
            Building something bigger than a single engagement — durable clarity
            that compounds inside your organization.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Approach ---------------- */}
      <section className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-4 text-display-md font-semibold">
              About our
              <br />
              approach to work
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {approach.map((a, i) => (
              <Reveal key={a.label} delay={i * 60}>
                <div className="h-full bg-surface p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-ink-faint">0{i + 1}</span>
                    <h3 className="text-lg font-semibold">{a.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="border-t border-line">
        <div className="container-x py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-4 text-display-md font-semibold">What we do</h2>
            </div>
            <Link href="/services" className="btn-ghost">
              All services →
            </Link>
          </div>

          <div className="mt-12 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group flex flex-col gap-2 py-7 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="text-sm text-ink-faint">[{s.number}]</span>
                <h3 className="text-2xl font-semibold tracking-tight sm:w-72">{s.title}</h3>
                <p className="flex-1 text-ink-muted">{s.summary}</p>
                <span className="text-ink-faint transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Resources ---------------- */}
      <section className="border-t border-line">
        <div className="container-x py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Resource center</p>
              <h2 className="mt-4 text-display-md font-semibold">Sharpen how you work</h2>
              <p className="mt-4 max-w-xl text-ink-muted">
                Articles, guides, and case studies from our engagements — a
                reference library for prospective and existing clients alike.
              </p>
            </div>
            <Link href="/resources" className="btn-ghost">
              Browse all →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latest.map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <Link href={`/resources/${r.slug}`} className="card group flex h-full flex-col p-7 transition-colors hover:bg-sand">
                  <span className="eyebrow">{resourceTypeLabels[r.type]}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{r.excerpt}</p>
                  <span className="mt-6 text-sm text-ink-faint">{r.readingMinutes} min read →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="rounded-card border border-line bg-surface p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl text-display-md font-semibold">
              Let&apos;s talk about the move you&apos;re weighing.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-ink-muted">
              A short conversation is usually enough to know whether we can help —
              and to leave you with something useful either way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Book a consult
              </Link>
              <a href={`mailto:${site.email}`} className="btn-outline">
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
