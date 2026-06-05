import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} home`}
    >
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-bg transition-transform duration-300 group-hover:rotate-90"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}
