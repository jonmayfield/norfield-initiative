import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Norfield Initiative handles your information.",
};

export default function PrivacyPage() {
  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 text-display-md font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated June 2026</p>

        <div className="prose-norfield mt-10">
          <p>
            This is placeholder privacy copy to be reviewed by counsel before
            launch. It describes, in plain terms, how {site.name} handles the
            information you share with us.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you contact us or create an account, we collect the details you
            provide — such as your name, email, company, and any message content.
            We use this solely to respond to you and deliver our services.
          </p>
          <h2>How we use it</h2>
          <p>
            We do not sell your information or add you to marketing lists without
            consent. Lead submissions are used only to follow up on your inquiry.
          </p>
          <h2>Data storage</h2>
          <p>
            Account and project data is stored securely with our infrastructure
            provider. Access is restricted to authorized team members.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about your data? Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
