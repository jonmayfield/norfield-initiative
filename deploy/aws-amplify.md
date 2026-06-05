# Deploying Norfield Initiative

This app is a standalone **Next.js 14 (SSR)** project. It hosts on **AWS Amplify
Hosting** and uses **Firebase** (Auth, Firestore, Storage) for the backend.

```
Browser → CloudFront → S3 (static assets)
                    → Lambda (SSR pages + /api/* routes)
Lambda / Browser → Firebase (Auth, Firestore, Storage)
```

There are three setup tracks. Do them in this order:

1. **Firebase project** — backend (auth + data).
2. **GitHub repo** — Amplify deploys from Git.
3. **AWS Amplify app** — hosting + CI.

---

## 1. Firebase setup

### 1.1 Create the project
1. Go to <https://console.firebase.google.com> → **Add project**.
2. Name it `norfield-initiative` (the project **ID** it generates may differ —
   note it). Then update `.firebaserc` `"default"` to that exact project ID.

### 1.2 Add a Web app + get the client config
1. Project Overview → **Add app** → **Web** (`</>`).
2. Copy the `firebaseConfig` values into `.env.local` (see `.env.example`):

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=…
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
   NEXT_PUBLIC_FIREBASE_APP_ID=…
   ```

   These are **client-safe** (not secrets) — access is governed by security rules.

### 1.3 Enable Email/Password auth
Authentication → **Get started** → **Email/Password** → Enable.

### 1.4 Create the service account (server secret)
1. Project settings → **Service accounts** → **Generate new private key**.
2. This downloads a JSON file. It is a **SECRET** — never commit it.
3. For local dev, put it on **one line** in `.env.local` as `FIREBASE_SERVICE_ACCOUNT`
   (the app un-escapes `\n` in the private key automatically):

   ```bash
   # macOS — copies a one-line version to your clipboard
   node -e "console.log(JSON.stringify(require('./serviceAccount.json')))" | pbcopy
   ```

### 1.5 Deploy security rules + indexes
Install the Firebase CLI once (`npm i -g firebase-tools`), then:

```bash
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules,firestore:indexes,storage
```

> Rules are **not live** until deployed. The rules in this repo lock `leads` to
> server-only writes and scope all portal data to its owner.

### 1.6 (Optional) Seed a client's portal
After a user signs up, grab their UID (Authentication tab) and seed sample data:

```bash
FIREBASE_SERVICE_ACCOUNT="$(cat serviceAccount.json)" \
  node scripts/seed-portal.mjs <uid>
```

---

## 2. GitHub repo

Amplify deploys from a Git repo. From the project root:

```bash
git init
git add -A
git commit -m "Initial commit: Norfield Initiative site"
git branch -M main
# Create an empty repo at github.com/<you>/norfield-initiative (no README), then:
git remote add origin https://github.com/<you>/norfield-initiative.git
git push -u origin main
```

> `.gitignore` already excludes `node_modules`, `.next`, and all `.env*.local`
> files, so no secrets are committed.

---

## 3. AWS Amplify Hosting

### 3.1 Create the app
1. [AWS Amplify Console](https://console.aws.amazon.com/amplify) → **Create new
   app** → **Host web app**.
2. Connect **GitHub** and pick the `norfield-initiative` repo + `main` branch.
3. App settings:
   - **App root**: leave as repo root (`/`) — this is **not** a monorepo.
   - **Framework**: Next.js — SSR (auto-detected).
   - **Build spec**: leave blank — Amplify uses the repo's `amplify.yml`.

### 3.2 Environment variables
App settings → **Environment variables**. Add:

| Variable | Secret? | Value |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | no | from 1.2 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | no | from 1.2 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | no | from 1.2 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | no | from 1.2 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | no | from 1.2 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | no | from 1.2 |
| `FIREBASE_SERVICE_ACCOUNT` | **YES** | full service-account JSON, one line |
| `FIREBASE_STORAGE_BUCKET` | no | `<project-id>.appspot.com` (optional) |
| `LEADS_NOTIFY_EMAIL` | no | where lead notifications go (optional) |

> **Never** put a secret in a `NEXT_PUBLIC_*` variable — those are embedded in
> the browser bundle. `FIREBASE_SERVICE_ACCOUNT` must stay un-prefixed.
>
> **Redeploy after changing any env var.**

#### How server secrets reach the Lambda
Amplify injects env vars into the **build** shell but doesn't always forward
non-`NEXT_PUBLIC_` vars to the SSR Lambda at runtime. `amplify.yml` writes
`FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_STORAGE_BUCKET`, and `LEADS_NOTIFY_EMAIL`
to `.env.production` during the build so Next bundles them into the server
output. **If you add a new server-only env var, add it to the list in
`amplify.yml`.**

### 3.3 Deploy
Click **Save and deploy**. Amplify clones the repo, runs `npm ci`, `npm run
build`, and deploys static assets to S3/CloudFront + SSR to Lambda.

### 3.4 Custom domain
Amplify Console → **Domain management** → add your domain; Amplify provisions an
SSL cert via ACM automatically. Then update `site.url` in `src/lib/site.ts` (and
redeploy) so canonical URLs, sitemap, and OG tags use the real domain.

---

## Verify it works

- **Contact form** → submit `/contact`; a doc appears in Firestore `leads`.
- **Auth** → sign up at `/signup`; the user appears in Firebase Authentication.
- **Portal** → after seeding (1.6), `/portal` shows that user's real data.

## Local build test before pushing

```bash
npm ci
npm run build
```

## Rollback
Amplify Console → your app → **Deployments** → pick a past build → **Redeploy
this version**. Every push to `main` also redeploys automatically.
