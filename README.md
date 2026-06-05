# Norfield Initiative

The primary hub for Norfield Initiative — a consulting & advisory firm. The site
serves four jobs:

1. **Showcase services** — a polished marketing presence.
2. **Generate leads** — a working contact / consult-booking flow.
3. **Manage clients** — an authenticated client portal (projects, messages, documents).
4. **Educate** — a resource center publishing articles, guides, and case studies.

It is built **frontend-first and Firebase-ready**: the entire app is navigable
today with no backend, and a real Firebase project can be dropped in to switch on
live authentication and data.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a CSS-variable design system (monochrome, dark-default, light toggle)
- **Firebase** (Auth, Firestore, Storage) — ready to connect
- Mirrors the infrastructure conventions of the `pressed-coin-companion` reference app

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

> **Demo mode:** Until you add Firebase credentials, auth runs locally — any
> email/password signs you in so you can explore the client portal. The contact
> form posts to `/api/leads`, which validates and logs submissions server-side.

---

## Project structure

```
src/
  app/
    (marketing)/        # public site: home, services, about, contact, resources, privacy
      resources/[slug]/ # individual article pages
    (auth)/             # login + signup
    portal/             # authenticated client portal (overview, projects, messages, documents)
    api/leads/          # lead-capture endpoint
  components/           # Header, Footer, ContactForm, AuthForm, PortalShell, …
  content/resources.ts  # the resource-center content (articles/guides/case studies)
  lib/
    site.ts             # brand, nav, contact config — edit copy here
    services.ts         # service offerings
    firebase.ts         # Firebase init (env-driven, safe when unconfigured)
    auth.tsx            # AuthProvider + useAuth (live Firebase or local demo)
    portal-data.ts      # sample portal data (replace with Firestore reads)
```

## Editing content

- **Brand, nav, contact details:** `src/lib/site.ts`
- **Services:** `src/lib/services.ts`
- **Resource articles:** `src/content/resources.ts` (each entry has an HTML `body`)

---

## Wiring up the backend

1. **Create a Firebase project** at <https://console.firebase.google.com>.
2. Add a **Web app**, copy its config, and fill in `.env.local` (see `.env.example`):

   ```bash
   cp .env.example .env.local
   ```

   Set the `NEXT_PUBLIC_FIREBASE_*` values. With `apiKey` + `projectId` present,
   `isFirebaseConfigured` becomes true and live auth turns on automatically.

3. **Enable Email/Password auth** in Firebase Console → Authentication.

4. **Persist leads & power the portal** with Firestore:
   - In `src/app/api/leads/route.ts`, swap the `console.info` for a Firestore
     write (Admin SDK) and/or an email notification.
   - Replace the sample data in `src/lib/portal-data.ts` with Firestore reads
     scoped to the signed-in user (`auth.currentUser.uid`).
   - Use Firebase Storage for the documents tab.

5. **Lock it down** with Firestore Security Rules so each client can only read
   their own projects, messages, and documents.

### Suggested Firestore shape

```
users/{uid}
clients/{clientId}
  projects/{projectId}      { name, status, phase, progress, nextMilestone, due }
  messages/{messageId}      { from, body, createdAt, readBy[] }
  documents/{docId}         { name, kind, storagePath, size, updatedAt }
leads/{leadId}              { name, email, company, service, message, receivedAt }
```

---

## Design notes

The visual language is intentionally monochrome and editorial — large display
type, generous whitespace, hairline rules, and rounded "pill" tags — toggleable
between a dark default and a light theme. All colors are CSS variables in
`src/app/globals.css`; adjust the tokens there to retheme the whole site.

## Deploying

Production target is **AWS Amplify Hosting** + **Firebase**. Full step-by-step
runbook: **[deploy/aws-amplify.md](deploy/aws-amplify.md)** — covers creating the
Firebase project, security-rule deployment, the GitHub repo, and the Amplify app
with its environment variables. `amplify.yml` and the Firebase config files
(`firebase.json`, `firestore.rules`, `firestore.indexes.json`, `storage.rules`)
are already in the repo.
