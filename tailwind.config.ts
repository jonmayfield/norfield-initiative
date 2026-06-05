import type { Config } from "tailwindcss";

/**
 * Monochrome design system driven by CSS variables (see globals.css).
 * Channel tokens are space-separated RGB ("12 12 12") consumed via
 * rgb(var(--x) / <alpha-value>) so Tailwind opacity modifiers keep working.
 *
 * Semantic roles:
 *   ink     → primary foreground text
 *   bg      → page background
 *   surface → card / panel surface
 *   sand    → raised / muted surface
 *   line    → hairline borders
 *   accent  → high-contrast action color (inverts vs. bg)
 */
const channel = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: channel("--c-fg"),
          muted: channel("--c-fg-muted"),
          faint: channel("--c-fg-faint"),
        },
        bg: channel("--c-bg"),
        surface: channel("--c-surface"),
        sand: channel("--c-surface-2"),
        accent: {
          DEFAULT: channel("--c-accent"),
          fg: channel("--c-accent-fg"),
        },
        line: "var(--c-line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        pill: "9999px",
        card: "1.5rem",
        xl2: "2rem",
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        lift: "0 12px 40px rgba(0,0,0,0.12)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
