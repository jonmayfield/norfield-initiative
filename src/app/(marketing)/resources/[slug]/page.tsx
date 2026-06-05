import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  resources,
  getResource,
  getResourcesByType,
  resourceTypeLabels,
} from "@/content/resources";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const r = getResource(params.slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.title,
    description: r.excerpt,
    openGraph: { title: r.title, description: r.excerpt, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = getResource(params.slug);
  if (!resource) notFound();

  const related = getResourcesByType()
    .filter((r) => r.slug !== resource.slug)
    .slice(0, 3);

  return (
    <article>
      <div className="container-x py-16">
        <div className="mx-auto max-w-2xl">
          <Link href="/resources" className="text-sm text-ink-faint hover:text-ink">
            ← All resources
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="pill">{resourceTypeLabels[resource.type]}</span>
            <span className="text-sm text-ink-faint">
              {formatDate(resource.date)} · {resource.readingMinutes} min read
            </span>
          </div>

          <h1 className="mt-6 text-display-md font-semibold">{resource.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{resource.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <span key={t} className="rounded-pill border border-line px-3 py-1 text-xs text-ink-muted">
                {t}
              </span>
            ))}
          </div>

          <hr className="my-10 border-line" />

          <div
            className="prose-norfield"
            dangerouslySetInnerHTML={{ __html: resource.body }}
          />

          <hr className="my-12 border-line" />

          <div className="rounded-card border border-line bg-surface p-8 text-center">
            <h2 className="text-xl font-semibold">Facing something like this?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              This is the kind of problem we work on every day. Tell us where you are.
            </p>
            <Link href="/contact" className="btn-primary mt-5">
              Book a consult
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-line">
        <div className="container-x py-16">
          <h2 className="text-xl font-semibold">More from the library</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="card group flex h-full flex-col p-6 transition-colors hover:bg-sand"
              >
                <span className="eyebrow">{resourceTypeLabels[r.type]}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-muted">{r.excerpt}</p>
                <span className="mt-4 text-xs text-ink-faint">{r.readingMinutes} min read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
