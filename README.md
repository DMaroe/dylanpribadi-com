# dylanpribadi.com

Portfolio site built from the Claude Design project in [`design/Portfolio.dc.html`](design/Portfolio.dc.html).
Next.js 16 (App Router) on Cloudflare Workers via `@opennextjs/cloudflare`, content in Cloudflare D1.

## Local development

```bash
npm install
npm run db:migrate:local   # creates + seeds the local D1 database
npm run dev                # http://localhost:3000
```

`next.config.ts` calls `initOpenNextCloudflareForDev()`, which is what makes the
D1 binding available to `next dev`. Without a migrated local database every page
throws "No profile row found in D1" — run the migration first.

## Verifying on Workers

`next dev` runs on Node. The site actually runs on `workerd`, so before deploying:

```bash
npm run preview   # builds the worker bundle and serves it on http://127.0.0.1:8787
```

This is the step that catches Node-only APIs that work in dev and fail in production.

## Deploying

Needs `npx wrangler login` first.

```bash
npx wrangler d1 create portfolio-db      # paste the returned id into wrangler.jsonc
npm run db:migrate:remote
npm run deploy
```

`wrangler.jsonc` ships with `"database_id": "REPLACE_WITH_D1_DATABASE_ID"` — local
development ignores it, but deployment will fail until it's a real id.

Re-run `npm run cf-typegen` after any change to `wrangler.jsonc` to regenerate
`cloudflare-env.d.ts`.

## Layout

| Path | What's there |
| --- | --- |
| `src/app/` | Routes: `/`, `/projects`, `/skills`, `/contact`, plus `/api/*` |
| `src/components/` | Section components, each with a co-located CSS Module |
| `src/lib/db.ts` | The only place D1 is touched — typed, bound queries |
| `src/lib/types.ts` | Row types shared by pages and API routes |
| `migrations/` | `0001_init.sql` (schema), `0002_seed.sql` (design's content) |
| `design/` | The original Claude Design export. Reference only — never imported. |

Every route is `force-dynamic`: pages read D1 per request rather than at build time.

## Content model

Editing content means editing SQL and re-running the migration. There is no admin
UI and no write endpoint anywhere in the app — the API is read-only by design.

A few schema decisions come straight from the design and look arbitrary otherwise:

- **Three summaries per project.** `home_summary`, `summary`, and `modal_summary`
  are different copy at three lengths, not truncations of one string. `home_summary`
  and `modal_summary` fall back to `summary` when null.
- **`project_tags.on_card`.** Cards show a subset of a project's tags — Transit
  Ghost has three tags but its card shows two. The flag encodes that rather than
  having the page slice the array.
- **`skills.category`.** One table feeds three surfaces: `toolkit` (home page
  chips), `tool` (skills page chips), `receipt` (the titled cards, where `body`
  is required).

## Read-only JSON API

| Route | Notes |
| --- | --- |
| `GET /api/projects` | `?featured=1` limits to the three on the home page |
| `GET /api/projects/[slug]` | 404 when the slug is unknown |
| `GET /api/skills` | `?category=toolkit\|tool\|receipt`; 400 on anything else |

## Notes

- The seed content in `migrations/0002_seed.sql` and the design in
  `design/Portfolio.dc.html` are Dylan's real profile, projects, skills, and
  experience. Further edits to content go in one of those two places.
- Project imagery is still the design's placeholder gradient blocks ("Project
  shot", "Screen 1"). There is no image storage yet.
- OpenNext warns that it is not fully supported on Windows. Build, preview, and
  deploy all worked here, but if something breaks oddly, WSL is the supported path.
