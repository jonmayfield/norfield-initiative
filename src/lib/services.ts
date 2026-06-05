export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "strategy",
    number: "01",
    title: "Strategy & Planning",
    summary:
      "Turn ambition into a sequenced, fundable plan your team can actually execute.",
    description:
      "We work alongside leadership to clarify where you're going and how you'll get there — pressure-testing assumptions, sizing opportunities, and translating direction into priorities, owners, and milestones. The output isn't a deck that sits on a shelf; it's a working plan tied to the decisions in front of you this quarter.",
    deliverables: [
      "Strategic diagnostic & market assessment",
      "Prioritized initiative roadmap",
      "Operating model & resourcing plan",
      "Board-ready narrative and metrics",
    ],
  },
  {
    slug: "operations",
    number: "02",
    title: "Operations & Process",
    summary:
      "Find the friction, fix the workflow, and build the muscle to keep improving.",
    description:
      "Growth exposes the seams in how work actually gets done. We map your core processes end to end, quantify where time and margin leak, and redesign workflows that hold up under scale. Then we leave your team with the playbooks and dashboards to keep tightening the system after we're gone.",
    deliverables: [
      "Process mapping & bottleneck analysis",
      "Workflow redesign & SOPs",
      "Tooling & automation recommendations",
      "Operational KPI dashboards",
    ],
  },
  {
    slug: "org-design",
    number: "03",
    title: "Org Design & Change",
    summary:
      "Align structure, roles, and incentives so the organization moves as one.",
    description:
      "The right strategy fails inside the wrong structure. We help you design teams, clarify decision rights, and lead the change so people understand not just what is changing but why. We focus as much on adoption as on the org chart — because a reorg only works if it sticks.",
    deliverables: [
      "Organization & role design",
      "Decision-rights (RACI) framework",
      "Change-management & comms plan",
      "Leadership coaching & enablement",
    ],
  },
  {
    slug: "data-analytics",
    number: "04",
    title: "Data & Analytics",
    summary:
      "Make the numbers trustworthy, then make them tell you what to do next.",
    description:
      "Most teams aren't short on data — they're short on data they trust. We help you define the metrics that matter, clean up the reporting layer, and stand up analysis that drives decisions instead of debate. The goal is a single source of truth leadership can act on with confidence.",
    deliverables: [
      "Metric definition & data audit",
      "Reporting & visualization setup",
      "Forecasting & scenario models",
      "Analytics enablement for your team",
    ],
  },
  {
    slug: "market-entry",
    number: "05",
    title: "Market Entry & Growth",
    summary:
      "De-risk the next move — a new segment, geography, or product line.",
    description:
      "New markets reward preparation and punish guesswork. We size the opportunity, map the competitive and regulatory terrain, and build a phased entry plan with clear go/no-go gates. You get a grounded view of the upside and the risks before you commit real capital.",
    deliverables: [
      "Opportunity sizing & segmentation",
      "Competitive & regulatory landscape",
      "Go-to-market & pricing strategy",
      "Phased entry plan with milestones",
    ],
  },
  {
    slug: "advisory",
    number: "06",
    title: "Advisory Retainers",
    summary:
      "An on-call partner for the decisions that don't fit a project box.",
    description:
      "Some of the highest-leverage work is ongoing: a sounding board for the CEO, a steady hand through a tricky quarter, a second set of eyes on the big calls. Our retainers give you senior advisory capacity on demand — structured around your cadence, priced for predictability.",
    deliverables: [
      "Standing leadership advisory",
      "Monthly priorities & review cadence",
      "Ad-hoc analysis & decision support",
      "Priority access to the full team",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
