"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { signIn, signUp, live } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const name = String(fd.get("name") || "");

    try {
      if (mode === "signup") await signUp(name, email, password);
      else await signIn(email, password);
      router.push("/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {mode === "signup"
          ? "Set up access to your client portal."
          : "Sign in to your client portal."}
      </p>

      {!live && (
        <p className="mt-5 rounded-xl border border-line bg-surface px-4 py-3 text-xs text-ink-muted">
          Demo mode — Firebase isn&apos;t configured yet, so any email and password
          will sign you in locally. Add your Firebase keys in <code>.env.local</code> to
          enable real authentication.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <LabeledInput label="Full name" name="name" type="text" required />
        )}
        <LabeledInput label="Email" name="email" type="email" required />
        <LabeledInput label="Password" name="password" type="password" required minLength={6} />

        {error && <p className="text-sm text-ink">⚠ {error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="link-underline text-ink">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/signup" className="link-underline text-ink">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function LabeledInput({
  label,
  name,
  type,
  required,
  minLength,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-ink-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        className="rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-ink"
      />
    </div>
  );
}
