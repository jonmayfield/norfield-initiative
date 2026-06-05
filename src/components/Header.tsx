"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { mainNav } from "@/lib/site";
import { useAuth } from "@/lib/auth";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-pill px-4 py-2 text-sm transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <Link href="/portal" className="btn-outline">
              Client Portal
            </Link>
          ) : (
            <Link href="/login" className="btn-ghost">
              Sign in
            </Link>
          )}
          <Link href="/contact" className="btn-primary">
            Book a consult
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-pill border border-line text-ink md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-pill px-4 py-3 text-sm text-ink-muted hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Link href="/login" onClick={() => setOpen(false)} className="btn-outline flex-1">
                Sign in
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary flex-1">
                Book a consult
              </Link>
            </div>
            <div className="mt-3"><ThemeToggle /></div>
          </div>
        </div>
      )}
    </header>
  );
}
