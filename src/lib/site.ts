/**
 * Central site configuration — brand, navigation, contact details.
 * Edit here to update copy globally.
 */
export const site = {
  name: "Norfield Initiative",
  shortName: "Norfield",
  tagline: "Clarity, strategy, and execution for organizations ready to move.",
  description:
    "Norfield Initiative is a consulting and advisory firm helping organizations navigate strategy, operations, and growth — paired with a resource library to sharpen how you work.",
  url: "https://norfieldinitiative.com",
  email: "hello@norfieldinitiative.com",
  phone: "+1 (000) 000-0000",
  location: "Remote-first · United States",
  social: {
    linkedin: "https://www.linkedin.com/company/norfield-initiative",
    x: "https://x.com/norfieldinit",
  },
};

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    title: "Firm",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Client Portal", href: "/portal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "All Resources", href: "/resources" },
      { label: "Articles", href: "/resources?type=article" },
      { label: "Guides", href: "/resources?type=guide" },
      { label: "Case Studies", href: "/resources?type=case-study" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/signup" },
      { label: "Book a consult", href: "/contact" },
    ],
  },
];

export const capabilities = [
  "Strategy",
  "Operations",
  "Org Design",
  "Market Entry",
  "Change Management",
  "Data & Analytics",
  "Process Improvement",
  "Advisory Retainers",
];
