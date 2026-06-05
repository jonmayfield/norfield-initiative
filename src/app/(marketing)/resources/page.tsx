import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ResourceFilter } from "@/components/ResourceFilter";
import { Reveal } from "@/components/Reveal";
import {
  getResourcesByType,
  resourceTypeLabels,
  type ResourceType,
} from "@/content/resources";

export const metadata: Metadata = {
  title: "Resource Center",
  description:
    "Articles, guides, and case studies from Norfield Initiative — a reference library on strategy, operations, and growth.",
};

const validTypes: ResourceType[] = ["article", "guide", "case-study"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ResourcesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const typeParam = searchParams.type as ResourceType | undefined;
  const type = typeParam && validTypes.includes(typeParam) ? typeParam : undefined;
  const items = getResourcesByType(type);
  const [featured, ...rest] = items;

  return (
    <>
      <section className="container-x pt-16 pb-10">
        <p className="eyebrow">Resource center</p>
        <h1 className="mt-5 max-w-3xl text-display-lg font-semibold">
          A library for how you work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">
          We publish what we learn — practical articles, step-by-step guides, and
          real case studies on strategy, operations, and growth.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-10" />}>
            <ResourceFilter />
          </Suspense>
        </div>
      </section>

      <section className="container-x pb-24">
        {items.length === 0 ? (
          <p className="text-ink-muted">No resources in this category yet.</p>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                href={`/resources/${featured.slug}`}
                className="group block rounded-card border border-line bg-surface p-8 transition-colors hover:bg-sand sm:p-12"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="pill">{resourceTypeLabels[featured.type]}</span>
                  <span className="text-sm text-ink-faint">
                    {formatDate(featured.date)} · {featured.readingMinutes} min read
                  </span>
                </div>
                <h2 className="mt-6 max-w-3xl text-display-md font-semibold">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-ink-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-block text-ink-faint transition-transform group-hover:translate-x-1">
                  Read →
                </span>
              </Link>
            )}

            {/* Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((r, i) => (
                <Reveal key={r.slug} delay={i * 50}>
                  <Link
                    href={`/resources/${r.slug}`}
                    className="card group flex h-full flex-col p-7 transition-colors hover:bg-sand"
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{resourceTypeLabels[r.type]}</span>
                      <span className="text-xs text-ink-faint">{r.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{r.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {r.excerpt}
                    </p>
                    <span className="mt-6 text-xs text-ink-faint">{formatDate(r.date)}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
