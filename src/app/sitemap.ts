import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { resources } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = ["", "/services", "/about", "/contact", "/resources", "/privacy"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  );

  const resourceRoutes = resources.map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: new Date(r.date),
  }));

  return [...staticRoutes, ...resourceRoutes];
}
