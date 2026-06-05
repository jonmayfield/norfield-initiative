import { db, isFirebaseConfigured } from "./firebase";
import {
  projects as sampleProjects,
  messages as sampleMessages,
  documents as sampleDocuments,
  type Project,
  type Message,
  type Document,
} from "./portal-data";

export type { Project, Message, Document };

/**
 * Portal data access. Reads per-user data from Firestore (web SDK, governed by
 * security rules) when Firebase is configured; otherwise returns sample content
 * so the portal is fully navigable in local demo mode.
 *
 * Firestore shape (per user):
 *   users/{uid}/projects/{id}
 *   users/{uid}/messages/{id}
 *   users/{uid}/documents/{id}
 */

async function readCollection<T>(
  uid: string,
  name: string,
  orderField: string,
  direction: "asc" | "desc",
  fallback: T[]
): Promise<T[]> {
  if (!isFirebaseConfigured || !db) return fallback;
  try {
    const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
    const snap = await getDocs(
      query(collection(db, "users", uid, name), orderBy(orderField, direction))
    );
    if (snap.empty) return fallback;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
  } catch (err) {
    console.error(`[portal] failed to read ${name}:`, err);
    return fallback;
  }
}

export function getProjects(uid: string): Promise<Project[]> {
  return readCollection<Project>(uid, "projects", "due", "asc", sampleProjects);
}

export function getMessages(uid: string): Promise<Message[]> {
  return readCollection<Message>(uid, "messages", "time", "desc", sampleMessages);
}

export function getDocuments(uid: string): Promise<Document[]> {
  return readCollection<Document>(uid, "documents", "updated", "desc", sampleDocuments);
}

/** Send a message to the engagement team (client → team). */
export async function sendMessage(uid: string, body: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.info("[portal] (demo) message:", body);
    return;
  }
  const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
  await addDoc(collection(db, "users", uid, "messages"), {
    from: "You",
    body,
    createdAt: serverTimestamp(),
  });
}
