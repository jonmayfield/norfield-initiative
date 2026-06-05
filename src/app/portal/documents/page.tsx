"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getDocuments, type Document } from "@/lib/portal";

export default function PortalDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    getDocuments(user.uid).then((d) => {
      if (!active) return;
      setDocuments(d);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
      <p className="mt-1 text-sm text-ink-muted">Deliverables and shared files for your engagements.</p>

      {loading ? (
        <p className="mt-8 text-sm text-ink-faint">Loading…</p>
      ) : (
        <div className="mt-8 card overflow-hidden">
          <div className="hidden grid-cols-[1fr_140px_100px_100px] gap-4 border-b border-line px-5 py-3 text-xs text-ink-faint sm:grid">
            <span>Name</span>
            <span>Project</span>
            <span>Size</span>
            <span>Updated</span>
          </div>
          <div className="divide-y divide-line">
            {documents.map((d) => (
              <button
                key={d.id}
                className="grid w-full grid-cols-1 gap-2 px-5 py-4 text-left transition-colors hover:bg-sand sm:grid-cols-[1fr_140px_100px_100px] sm:items-center sm:gap-4"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-[10px] font-medium text-ink-muted">
                    {d.kind}
                  </span>
                  <span className="text-sm font-medium text-ink">{d.name}</span>
                </span>
                <span className="text-xs text-ink-muted sm:text-sm">{d.project}</span>
                <span className="text-xs text-ink-faint sm:text-sm">{d.size}</span>
                <span className="text-xs text-ink-faint sm:text-sm">{d.updated}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
