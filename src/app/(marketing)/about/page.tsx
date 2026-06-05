import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Norfield Initiative is a senior-led consulting and advisory firm built around clarity, evidence, and execution.",
};

const principles = [
  {
    title: "Evidence over opinion",
    body: "We start with what's actually happening — measured, mapped, and verified — before recommending what to change.",
  },
  {
    title: "Focus is a deliverable",
    body: "Saying no to good ideas is how the great ones get done. We help you choose, then commit.",
  },
  {
    title: "Alongside, not above",
    body: "We work inside your team's reality, building capability as we go, so progress doesn't leave when we do.",
  },
  {
    title: "Honest counsel",
    body: "You'll always get our real read — including when the answer is that you don't need us.",
  },
];

const stats = [
  { value: "Senior-led", label: "Every engagement, no hand-offs to juniors" },
  { value: "Remote-first", label: "We work where the work is" },
  { value: "Fixed scope", label: "Clear deliverables, predictable pricing" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x pt-16 pb-12">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 max-w-3xl text-display-lg font-semibold">
          A partner for the decisions that matter.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Norfield Initiative is a consulting and advisory firm built on a simple
          belief: most organizations don&apos;t need more analysis — they need
          clarity, and the discipline to act on it. We bring senior judgment to a
          small number of engagements at a time, so the people you meet are the
          people who do the work.
        </p>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.value} className="card p-7">
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">What we believe</p>
              <h2 className="mt-4 text-display-md font-semibold">
                The principles
                <br />
                behind the work
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="h-full bg-surface p-7">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="rounded-card border border-line bg-surface p-10 text-center sm:p-16">
          <h2 className="mx-auto max-w-2xl text-display-md font-semibold">
            Work with us
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-ink-muted">
            Tell us what you&apos;re weighing. We&apos;ll tell you, honestly,
            whether and how we can help.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
