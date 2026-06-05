"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  getProjects,
  getMessages,
  getDocuments,
  type Project,
  type Message,
  type Document,
} from "@/lib/portal";

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-pill border border-line px-3 py-1 text-xs text-ink-muted">
      {status}
    </span>
  );
}

export default function PortalOverview() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    Promise.all([getProjects(user.uid), getMessages(user.uid), getDocuments(user.uid)]).then(
      ([p, m, d]) => {
        if (!active) return;
        setProjects(p);
        setMessages(m);
        setDocuments(d);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, [user]);

  const activeCount = projects.filter((p) => p.status !== "Completed").length;
  const unread = messages.filter((m) => m.unread).length;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-ink-muted">Everything happening across your engagements.</p>

      {loading ? (
        <p className="mt-8 text-sm text-ink-faint">Loading…</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Active projects" value={String(activeCount)} />
            <Stat label="Unread messages" value={String(unread)} href="/portal/messages" />
            <Stat label="Shared documents" value={String(documents.length)} href="/portal/documents" />
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your projects</h2>
            <Link href="/portal/projects" className="text-sm text-ink-faint hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{p.name}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    {p.phase} · Next: {p.nextMilestone} · Due {p.due}
                  </p>
                </div>
                <div className="sm:w-48">
                  <div className="flex items-center justify-between text-xs text-ink-faint">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-sand">
                    <div className="h-full rounded-pill bg-ink" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent messages</h2>
            <Link href="/portal/messages" className="text-sm text-ink-faint hover:text-ink">
              Open inbox →
            </Link>
          </div>
          <div className="mt-4 card divide-y divide-line">
            {messages.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-start gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-ink text-xs font-medium text-bg">
                  {m.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{m.from}</p>
                    <span className="text-xs text-ink-faint">{m.time}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-ink-muted">{m.preview}</p>
                </div>
                {m.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-pill bg-ink" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <div className="card p-5 transition-colors hover:bg-sand">
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
