export type ResourceType = "article" | "guide" | "case-study";

export type Resource = {
  slug: string;
  type: ResourceType;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  /** Article body as HTML; rendered inside `.prose-norfield`. */
  body: string;
};

export const resourceTypeLabels: Record<ResourceType, string> = {
  article: "Article",
  guide: "Guide",
  "case-study": "Case Study",
};

export const resources: Resource[] = [
  {
    slug: "strategy-that-survives-contact",
    type: "article",
    title: "Strategy That Survives Contact With Reality",
    excerpt:
      "Most strategic plans don't fail because they're wrong — they fail because nothing changes on Monday. Here's how to close the gap between the deck and the work.",
    author: "Norfield Initiative",
    date: "2026-05-18",
    readingMinutes: 7,
    tags: ["Strategy", "Execution"],
    body: `
<p>Every leadership team has lived through it: a strategy offsite produces a thoughtful plan, everyone nods, and three months later the day-to-day looks exactly as it did before. The plan wasn't wrong. It just never made contact with how the organization actually spends its time.</p>
<h2>Why good plans stall</h2>
<p>The gap between intention and execution is rarely about effort. It usually comes down to three things: priorities that aren't truly prioritized, decisions without clear owners, and metrics that measure activity instead of outcomes.</p>
<ul>
<li><strong>Too many number-one priorities.</strong> When everything is critical, the organization defaults to whatever is loudest that week.</li>
<li><strong>No single owner.</strong> A goal shared by everyone is owned by no one.</li>
<li><strong>Vanity metrics.</strong> Dashboards full of activity create motion without telling you whether you're winning.</li>
</ul>
<h2>Make the plan operational</h2>
<p>A strategy survives contact when it's translated into a small set of sequenced bets, each with an owner, a deadline, and a metric that would actually move if the bet pays off. That translation is the work — not the vision statement.</p>
<blockquote>If a priority doesn't change what someone does on Monday morning, it isn't a priority yet.</blockquote>
<h2>Build a review cadence</h2>
<p>Plans drift without rhythm. A short, honest monthly review — what moved, what didn't, what we're changing — keeps the strategy alive and gives leadership permission to adjust before small problems compound. The cadence matters more than the format.</p>
<p>The organizations that execute well aren't smarter about strategy. They're more disciplined about turning it into the next decision.</p>
`,
  },
  {
    slug: "metrics-leadership-can-trust",
    type: "article",
    title: "Building Metrics Your Leadership Can Actually Trust",
    excerpt:
      "When every meeting starts by debating the numbers, you don't have a data problem — you have a definition problem. A practical path to a single source of truth.",
    author: "Norfield Initiative",
    date: "2026-04-29",
    readingMinutes: 6,
    tags: ["Data & Analytics", "Operations"],
    body: `
<p>There's a particular kind of meeting where the first fifteen minutes are spent arguing about whose number is right. By the time everyone agrees on the figure, there's no time left to decide what to do about it. That meeting is a symptom — and the cause is almost never the data warehouse.</p>
<h2>Trust starts with definitions</h2>
<p>Two teams can both be "right" and still disagree if they define a metric differently. Does revenue include refunds? Is an active user someone who logged in, or someone who did something? Until the definitions are written down and agreed on, more dashboards just create more places to disagree.</p>
<h2>A short path to a single source of truth</h2>
<ol>
<li><strong>Pick the metrics that matter.</strong> Five to seven that the leadership team will actually steer by — no more.</li>
<li><strong>Define each one precisely.</strong> In writing, with edge cases and ownership.</li>
<li><strong>Build them once, centrally.</strong> One pipeline, one place, one version everyone references.</li>
<li><strong>Make the source visible.</strong> If people can see how a number is built, they stop relitigating it.</li>
</ol>
<h2>The payoff</h2>
<p>When the numbers are trusted, meetings change character. The debate moves from "is this right?" to "what does this mean and what do we do?" — which is the only debate worth having.</p>
`,
  },
  {
    slug: "operations-diagnostic-guide",
    type: "guide",
    title: "A Practical Guide to Running an Operations Diagnostic",
    excerpt:
      "A step-by-step framework for finding where time, money, and momentum leak out of your core processes — and what to fix first.",
    author: "Norfield Initiative",
    date: "2026-05-06",
    readingMinutes: 11,
    tags: ["Operations", "Process"],
    body: `
<p>An operations diagnostic answers a deceptively simple question: where is the work actually getting stuck? Done well, it gives leadership a ranked list of fixes and the confidence that you're solving the right problems in the right order. This guide walks through the approach we use.</p>
<h2>Step 1 — Map the core process end to end</h2>
<p>Pick the process that most directly creates value for your customer and follow it from trigger to completion. Document every hand-off, approval, and wait state. Resist the urge to map the idealized version — map what really happens, including the workarounds.</p>
<h2>Step 2 — Quantify the leaks</h2>
<p>For each step, estimate two things: how long it takes and how often it has to be redone. Rework and waiting are usually where the biggest losses hide, and they're invisible until you measure them.</p>
<ul>
<li><strong>Cycle time</strong> — elapsed time from start to finish.</li>
<li><strong>Touch time</strong> — actual hands-on effort (often a small fraction of cycle time).</li>
<li><strong>Rework rate</strong> — how often a step has to be repeated.</li>
</ul>
<h2>Step 3 — Find the constraint</h2>
<p>Every process has a bottleneck that governs its overall throughput. Improving anything other than the constraint feels productive but changes nothing. Find it first.</p>
<blockquote>An hour saved at the bottleneck is an hour gained for the whole system. An hour saved anywhere else is a mirage.</blockquote>
<h2>Step 4 — Prioritize by effort and impact</h2>
<p>Plot each opportunity on a simple effort-versus-impact grid. Start with the high-impact, low-effort fixes to build momentum and fund the harder work with early wins.</p>
<h2>Step 5 — Leave behind a system, not a slide</h2>
<p>The diagnostic's real value is the operating rhythm it creates: a dashboard your team watches, a cadence for reviewing it, and the habit of asking "where's the constraint now?" every quarter.</p>
`,
  },
  {
    slug: "change-management-playbook",
    type: "guide",
    title: "The Change Management Playbook for Lean Teams",
    excerpt:
      "You don't need a 200-page transformation program. You need a clear story, the right early adopters, and a way to make progress visible.",
    author: "Norfield Initiative",
    date: "2026-03-22",
    readingMinutes: 9,
    tags: ["Org Design", "Change Management"],
    body: `
<p>Big-company change frameworks assume big-company resources. Most teams don't have a dedicated change office — they have a handful of busy leaders trying to shift how the organization works without grinding the business to a halt. This playbook is built for them.</p>
<h2>Lead with the why, not the what</h2>
<p>People don't resist change so much as they resist confusion and loss. Before you announce a single new process, be able to explain in two sentences why the change matters and what's in it for the people doing the work. If you can't, you're not ready to launch.</p>
<h2>Recruit your early adopters first</h2>
<p>Every team has people who are quietly ready for things to be better. Find them, involve them early, and let them shape the rollout. They become your proof points and your translators — far more persuasive than any all-hands.</p>
<h2>Make progress visible</h2>
<ul>
<li>Pick one or two early wins and publicize them widely.</li>
<li>Show the before-and-after in concrete terms people recognize.</li>
<li>Name the people who made it happen.</li>
</ul>
<h2>Expect the dip</h2>
<p>Performance almost always dips before it improves — the new way is unfamiliar and slow at first. Tell people to expect it. When the dip arrives on schedule, it reassures rather than alarms.</p>
<h2>Anchor it in the routine</h2>
<p>Change sticks when it becomes "how we do things here" — embedded in onboarding, reviews, and the tools people use every day. Until then, it's still optional, and optional changes quietly revert.</p>
`,
  },
  {
    slug: "case-study-regional-services-firm",
    type: "case-study",
    title: "Case Study: Untangling Operations at a Regional Services Firm",
    excerpt:
      "How a 140-person services company cut project delivery time by 31% by fixing three hand-offs nobody owned.",
    author: "Norfield Initiative",
    date: "2026-05-12",
    readingMinutes: 5,
    tags: ["Operations", "Case Study"],
    body: `
<p><em>Details have been generalized to protect client confidentiality.</em></p>
<h2>The situation</h2>
<p>A regional services firm of roughly 140 people had grown faster than its processes. Projects routinely ran weeks past their committed dates, margins were slipping, and leadership couldn't pinpoint why — everyone was busy, yet work kept stalling.</p>
<h2>What we found</h2>
<p>An operations diagnostic mapped the full delivery process and surfaced an uncomfortable truth: the delays clustered around three hand-offs that no single person owned. Work would sit for days waiting for a sign-off that everyone assumed someone else was handling.</p>
<ul>
<li>Scoping-to-delivery hand-off averaged 6 days of pure waiting.</li>
<li>A mid-project approval step had a 40% rework rate.</li>
<li>Final QA was a bottleneck handled by a single overloaded lead.</li>
</ul>
<h2>What we changed</h2>
<p>We assigned clear owners to each hand-off, replaced the ambiguous approval with a lightweight checklist, and redistributed QA across three trained reviewers. None of it required new software — just clearer decision rights and a visible dashboard.</p>
<h2>The result</h2>
<p>Within one quarter, average delivery time fell <strong>31%</strong>, on-time completion rose from 58% to 89%, and the leadership team finally had a reporting layer they trusted. Just as importantly, the firm kept improving on its own — because the diagnostic left behind a cadence, not just a fix.</p>
`,
  },
  {
    slug: "case-study-market-entry",
    type: "case-study",
    title: "Case Study: A Disciplined Entry Into a New Region",
    excerpt:
      "How a phased, gated plan helped a mid-market company expand into a new geography without betting the business on it.",
    author: "Norfield Initiative",
    date: "2026-02-15",
    readingMinutes: 6,
    tags: ["Market Entry", "Strategy"],
    body: `
<p><em>Details have been generalized to protect client confidentiality.</em></p>
<h2>The situation</h2>
<p>A profitable mid-market company saw an opening in an adjacent region but had been burned before by an expansion that moved too fast. Leadership wanted to grow — without risking the healthy core business to do it.</p>
<h2>The approach</h2>
<p>Rather than a single go/no-go bet, we structured the entry as a series of gated phases, each with a clear hypothesis to test and a budget cap. The company only unlocked the next phase — and the next tranche of investment — when the prior one cleared its evidence bar.</p>
<ol>
<li><strong>Phase 1 — Validate demand</strong> with a low-cost pilot in a single locality.</li>
<li><strong>Phase 2 — Test the model</strong> by serving real customers and measuring unit economics.</li>
<li><strong>Phase 3 — Scale deliberately</strong> only after the economics proved out.</li>
</ol>
<h2>The result</h2>
<p>The pilot revealed that the original pricing assumption was wrong — a discovery that would have been catastrophic at full scale but cost very little to learn early. The company adjusted, cleared the gate on the second attempt, and entered the market profitably in the following year. The discipline of the gates turned a risky leap into a sequence of affordable steps.</p>
`,
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByType(type?: ResourceType) {
  const sorted = [...resources].sort((a, b) => b.date.localeCompare(a.date));
  return type ? sorted.filter((r) => r.type === type) : sorted;
}
