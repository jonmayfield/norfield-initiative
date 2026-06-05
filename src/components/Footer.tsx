import Link from "next/link";
import { Logo } from "./Logo";
import { site, footerNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{site.description}</p>
            <p className="mt-6 text-sm text-ink-faint">{site.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow mb-4">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-faint">
            <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
            <a href={site.social.linkedin} className="hover:text-ink">LinkedIn</a>
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
