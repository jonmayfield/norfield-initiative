"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getProjects, type Project } from "@/lib/portal";

export default function PortalProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    getProjects(user.uid).then((p) => {
      if (!active) return;
      setProjects(p);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-ink-muted">All current and past engagements.</p>

      {loading ? (
        <p className="mt-8 text-sm text-ink-faint">Loading…</p>
      ) : (
        <div className="mt-8 space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <span className="rounded-pill border border-line px-3 py-1 text-xs text-ink-muted">
                    {p.status}
                  </span>
                </div>
                <span className="text-sm text-ink-faint">Due {p.due}</span>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <Field label="Current phase" value={p.phase} />
                <Field label="Next milestone" value={p.nextMilestone} />
                <div>
                  <p className="text-xs text-ink-faint">Progress</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-sand">
                      <div className="h-full rounded-pill bg-ink" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-sm text-ink">{p.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}
