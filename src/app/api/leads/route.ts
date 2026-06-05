import { NextResponse } from "next/server";
import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";

// Admin SDK requires the Node.js runtime (not Edge).
export const runtime = "nodejs";

/**
 * Lead capture endpoint.
 *
 * Validates input, then persists the lead to Firestore via the Admin SDK when
 * FIREBASE_SERVICE_ACCOUNT is configured. Without credentials it falls back to
 * logging server-side, so the contact form works end to end in local dev.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const honeypot = String(data.website ?? "").trim();

  // Bot trap — silently accept but ignore.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const lead = {
    name,
    email,
    company: String(data.company ?? "").trim(),
    service: String(data.service ?? "").trim(),
    message: String(data.message ?? "").trim(),
    source: "website-contact-form",
    status: "new",
    receivedAt: new Date().toISOString(),
  };

  try {
    const db = getAdminDb();
    if (db) {
      await db.collection("leads").add({
        ...lead,
        // Server timestamp for reliable ordering in the console.
        createdAt: new Date(),
      });
    } else {
      console.info("[lead] (no Firestore configured) new submission:", lead);
    }
    // TODO: send a notification email to process.env.LEADS_NOTIFY_EMAIL here.
    return NextResponse.json({ ok: true, persisted: isAdminConfigured });
  } catch (err) {
    console.error("[lead] failed to persist:", err);
    return NextResponse.json(
      { error: "We couldn't save your message. Please email us directly." },
      { status: 500 }
    );
  }
}
