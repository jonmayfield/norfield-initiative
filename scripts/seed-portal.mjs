/**
 * Seed a user's portal with sample projects, messages, and documents.
 *
 * Usage:
 *   FIREBASE_SERVICE_ACCOUNT="$(cat serviceAccount.json)" \
 *   node scripts/seed-portal.mjs <uid>
 *
 * The <uid> is the Firebase Auth UID of the client to seed (find it in
 * Firebase Console → Authentication). Writes to users/{uid}/{projects,messages,documents}.
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const uid = process.argv[2];
if (!uid) {
  console.error("Usage: node scripts/seed-portal.mjs <uid>");
  process.exit(1);
}

const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) {
  console.error("Set FIREBASE_SERVICE_ACCOUNT to your service-account JSON.");
  process.exit(1);
}

const serviceAccount = JSON.parse(raw);
if (typeof serviceAccount.private_key === "string") {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const projects = [
  { name: "Strategy & Operating Plan", status: "Active", phase: "Diagnostic", progress: 35, nextMilestone: "Findings readout", due: "2026-06-19" },
  { name: "Operations Diagnostic", status: "In review", phase: "Recommendations", progress: 72, nextMilestone: "Prioritization workshop", due: "2026-06-12" },
  { name: "Metrics & Reporting Layer", status: "Completed", phase: "Handover", progress: 100, nextMilestone: "—", due: "2026-05-30" },
];

const messages = [
  { from: "Norfield Team", initials: "NI", preview: "Draft findings from the diagnostic are attached — let's review Thursday.", time: "2026-06-04T10:00:00Z", unread: true },
  { from: "Norfield Team", initials: "NI", preview: "Quick question on the Q2 numbers before we finalize the grid.", time: "2026-06-03T15:30:00Z", unread: true },
  { from: "Norfield Team", initials: "NI", preview: "Workshop materials are uploaded to your documents.", time: "2026-06-01T09:00:00Z", unread: false },
];

const documents = [
  { name: "Diagnostic Findings (Draft)", kind: "PDF", size: "2.4 MB", updated: "2026-06-04", project: "Strategy & Operating Plan" },
  { name: "Prioritization Workshop", kind: "Deck", size: "5.1 MB", updated: "2026-06-03", project: "Operations Diagnostic" },
  { name: "Metrics Definitions", kind: "Sheet", size: "0.3 MB", updated: "2026-05-31", project: "Metrics & Reporting Layer" },
];

async function seed() {
  const base = db.collection("users").doc(uid);
  for (const p of projects) await base.collection("projects").add(p);
  for (const m of messages) await base.collection("messages").add({ ...m, createdAt: new Date(m.time) });
  for (const d of documents) await base.collection("documents").add({ ...d, updatedAt: new Date(d.updated) });
  console.log(`Seeded portal for uid=${uid}: ${projects.length} projects, ${messages.length} messages, ${documents.length} documents.`);
}

seed().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
