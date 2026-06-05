"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { auth, isFirebaseConfigured } from "./firebase";

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  /** True when running against real Firebase; false in local demo mode. */
  live: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_KEY = "norfield_demo_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Live Firebase auth ---------------------------------------------------
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // Demo mode: restore any locally-stored session.
      try {
        const raw =
          typeof window !== "undefined" ? window.sessionStorage.getItem(DEMO_KEY) : null;
        if (raw) setUser(JSON.parse(raw) as AppUser);
      } catch {
        /* ignore */
      }
      setLoading(false);
      return;
    }

    let unsub = () => {};
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      unsub = onAuthStateChanged(auth, (fbUser) => {
        setUser(
          fbUser
            ? {
                uid: fbUser.uid,
                email: fbUser.email,
                displayName: fbUser.displayName,
              }
            : null
        );
        setLoading(false);
      });
    })();
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (isFirebaseConfigured && auth) {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      return;
    }
    // Demo fallback
    const demo: AppUser = { uid: "demo", email, displayName: email.split("@")[0] };
    window.sessionStorage.setItem(DEMO_KEY, JSON.stringify(demo));
    setUser(demo);
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      if (isFirebaseConfigured && auth) {
        const { createUserWithEmailAndPassword, updateProfile } = await import(
          "firebase/auth"
        );
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
        return;
      }
      const demo: AppUser = { uid: "demo", email, displayName: name || email.split("@")[0] };
      window.sessionStorage.setItem(DEMO_KEY, JSON.stringify(demo));
      setUser(demo);
    },
    []
  );

  const signOutUser = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      return;
    }
    window.sessionStorage.removeItem(DEMO_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        live: isFirebaseConfigured,
        signIn,
        signUp,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
