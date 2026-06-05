import "server-only";
import {
  initializeApp,
  getApps,
  getApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Server-side Firebase Admin SDK.
 *
 * Credentials come from FIREBASE_SERVICE_ACCOUNT — the full service-account JSON
 * pasted as a single line (newlines in the private key escaped as \n). This is a
 * SECRET and must never be exposed to the client or prefixed NEXT_PUBLIC_.
 *
 * Until the var is set, `isAdminConfigured` is false and callers fall back to a
 * no-op path so the app still runs locally without a backend.
 */
const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

export const isAdminConfigured = Boolean(raw);

let adminApp: App | null = null;

function parseServiceAccount(value: string) {
  const json = JSON.parse(value);
  // Normalize escaped newlines in the private key (common when stored as one line).
  if (typeof json.private_key === "string") {
    json.private_key = json.private_key.replace(/\\n/g, "\n");
  }
  return json;
}

if (isAdminConfigured) {
  try {
    const serviceAccount = parseServiceAccount(raw as string);
    adminApp = getApps().length
      ? getApp()
      : initializeApp({
          credential: cert(serviceAccount),
          storageBucket:
            process.env.FIREBASE_STORAGE_BUCKET ||
            `${serviceAccount.project_id}.appspot.com`,
        });
  } catch (err) {
    console.error("[firebaseAdmin] Failed to initialize Admin SDK:", err);
    adminApp = null;
  }
}

export function getAdminDb(): Firestore | null {
  return adminApp ? getFirestore(adminApp) : null;
}

export function getAdminAuth(): Auth | null {
  return adminApp ? getAuth(adminApp) : null;
}

/**
 * Verify a Firebase ID token from an `Authorization: Bearer <token>` header.
 * Returns the decoded uid, or null if missing/invalid/unconfigured.
 */
export async function verifyRequest(req: Request): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth) return null;
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer (.+)$/i);
  if (!match) return null;
  try {
    const decoded = await auth.verifyIdToken(match[1]);
    return decoded.uid;
  } catch {
    return null;
  }
}
