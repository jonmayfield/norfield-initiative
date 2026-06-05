"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ResourceType } from "@/content/resources";

const filters: { label: string; value: ResourceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Articles", value: "article" },
  { label: "Guides", value: "guide" },
  { label: "Case Studies", value: "case-study" },
];

export function ResourceFilter() {
  const params = useSearchParams();
  const active = params.get("type") ?? "all";

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = active === f.value;
        const href = f.value === "all" ? "/resources" : `/resources?type=${f.value}`;
        return (
          <Link
            key={f.value}
            href={href}
            className={`rounded-pill border px-4 py-2 text-sm transition-colors ${
              isActive
                ? "border-ink bg-ink text-bg"
                : "border-line text-ink-muted hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        );
      })}
    </div>
  );
}
