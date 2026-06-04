# Vaibhav Dhanorkar Portfolio

Next.js 15 portfolio with Sanity CMS for flexible content editing.

## Local development

1. Copy environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in `.env.local`:
   - `NEXT_PUBLIC_SITE_URL` — use `http://localhost:3001`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — from [sanity.io/manage](https://sanity.io/manage)
   - `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
   - `SANITY_API_READ_TOKEN` — optional for published content; required for draft preview

3. Install and run (port **3001**, not 80):

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001)

   Use a different port: `npm run dev -- -p 4000`

## Sanity CMS

- **Studio UI:** [http://localhost:3001/studio](http://localhost:3001/studio)
- Add/edit projects, experience, achievements, education, and profile without code changes
- Content revalidates every hour (ISR); use the webhook below for instant updates

### Seed existing content

```bash
# Add SANITY_API_WRITE_TOKEN to .env.local (Editor token from sanity.io/manage)
npm run seed:sanity
```

## Public assets

Place files in `public/`:

| File | Purpose |
|------|---------|
| `resume.pdf` | Download Resume link |
| `og-image.png` | Open Graph image (optional) |
| `favicon.ico` | Browser tab icon (optional) |

Set `REQUIRED_ASSETS=resume.pdf` in `.env.local` to fail the build if assets are missing.

## Vercel deployment

Add these environment variables in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Sanity API read token |
| `SANITY_REVALIDATE_SECRET` | Random secret string (for webhook) |

### Instant revalidation webhook

When you publish in Sanity Studio, trigger a site rebuild without waiting for ISR:

1. Set `SANITY_REVALIDATE_SECRET` in Vercel and `.env.local`
2. In Sanity → **API → Webhooks**, create a webhook:
   - **URL:** `https://your-domain.vercel.app/api/revalidate`
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **Secret:** same value as `SANITY_REVALIDATE_SECRET`
   - **Projection:** `{ _type }`

3. Add your Vercel domain to **Sanity → API → CORS origins**

## Environment validation

Missing or invalid env vars cause `next dev` and `next build` to fail immediately with a clear error. See [`.env.example`](.env.example) for all variables.
