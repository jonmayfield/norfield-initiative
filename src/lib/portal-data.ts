/**
 * Placeholder client-portal data. In production this is fetched from Firestore
 * scoped to the signed-in user (see README → "Wiring up the backend").
 */

export type Project = {
  id: string;
  name: string;
  status: "Active" | "In review" | "Completed";
  phase: string;
  progress: number; // 0-100
  nextMilestone: string;
  due: string;
};

export const projects: Project[] = [
  {
    id: "p-strategy",
    name: "Strategy & Operating Plan",
    status: "Active",
    phase: "Diagnostic",
    progress: 35,
    nextMilestone: "Findings readout",
    due: "Jun 19, 2026",
  },
  {
    id: "p-ops",
    name: "Operations Diagnostic",
    status: "In review",
    phase: "Recommendations",
    progress: 72,
    nextMilestone: "Prioritization workshop",
    due: "Jun 12, 2026",
  },
  {
    id: "p-data",
    name: "Metrics & Reporting Layer",
    status: "Completed",
    phase: "Handover",
    progress: 100,
    nextMilestone: "—",
    due: "May 30, 2026",
  },
];

export type Message = {
  id: string;
  from: string;
  initials: string;
  preview: string;
  time: string;
  unread: boolean;
};

export const messages: Message[] = [
  {
    id: "m1",
    from: "Norfield Team",
    initials: "NI",
    preview:
      "Draft findings from the diagnostic are attached — let's review on Thursday before the readout.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "m2",
    from: "Norfield Team",
    initials: "NI",
    preview:
      "Quick question on the Q2 numbers before we finalize the prioritization grid.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "m3",
    from: "Norfield Team",
    initials: "NI",
    preview: "Workshop materials are uploaded to your documents. See you Wednesday.",
    time: "3 days ago",
    unread: false,
  },
];

export type Document = {
  id: string;
  name: string;
  kind: "PDF" | "Deck" | "Sheet" | "Doc";
  size: string;
  updated: string;
  project: string;
};

export const documents: Document[] = [
  { id: "d1", name: "Diagnostic Findings (Draft)", kind: "PDF", size: "2.4 MB", updated: "2h ago", project: "Strategy & Operating Plan" },
  { id: "d2", name: "Prioritization Workshop", kind: "Deck", size: "5.1 MB", updated: "1 day ago", project: "Operations Diagnostic" },
  { id: "d3", name: "Metrics Definitions", kind: "Sheet", size: "0.3 MB", updated: "4 days ago", project: "Metrics & Reporting Layer" },
  { id: "d4", name: "Engagement Charter", kind: "Doc", size: "0.2 MB", updated: "2 weeks ago", project: "Strategy & Operating Plan" },
];
