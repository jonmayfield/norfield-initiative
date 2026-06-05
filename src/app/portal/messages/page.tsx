"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getMessages, sendMessage, type Message } from "@/lib/portal";

export default function PortalMessages() {
  const { user, live } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;
    getMessages(user.uid).then((m) => {
      if (!active) return;
      setMessages(m);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user]);

  async function onSend() {
    if (!user || !draft.trim()) return;
    setSending(true);
    try {
      await sendMessage(user.uid, draft.trim());
      setMessages((prev) => [
        {
          id: `local-${Date.now()}`,
          from: "You",
          initials: "You",
          preview: draft.trim(),
          time: "Just now",
          unread: false,
        },
        ...prev,
      ]);
      setDraft("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-ink-muted">Direct line to your engagement team.</p>

      {loading ? (
        <p className="mt-8 text-sm text-ink-faint">Loading…</p>
      ) : (
        <div className="mt-8 card divide-y divide-line">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-ink text-xs font-medium text-bg">
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">
                    {m.from}
                    {m.unread && (
                      <span className="ml-2 align-middle text-xs text-ink-faint">• new</span>
                    )}
                  </p>
                  <span className="shrink-0 text-xs text-ink-faint">{m.time}</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{m.preview}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 card p-4">
        <textarea
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message to your team…"
          className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-ink"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-ink-faint">
            {live ? "Messages are saved to your engagement thread." : "Demo mode — messages aren't persisted yet."}
          </p>
          <button onClick={onSend} disabled={sending || !draft.trim()} className="btn-primary disabled:opacity-50">
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
