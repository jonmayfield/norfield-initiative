import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consult with Norfield Initiative. Tell us what you're weighing.",
};

export default function ContactPage() {
  return (
    <section className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 text-display-lg font-semibold">Let&apos;s connect.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            Tell us about the decision or challenge in front of you. A short
            conversation is usually enough to know whether we can help — and
            we&apos;ll leave you with something useful either way.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="link-underline text-lg">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Based</dt>
              <dd className="mt-1 text-lg text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Elsewhere</dt>
              <dd className="mt-1 flex gap-4 text-lg">
                <a href={site.social.linkedin} className="link-underline">LinkedIn</a>
                <a href={site.social.x} className="link-underline">X</a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
