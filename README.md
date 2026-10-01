# osakadev

Next.js (App Router) + PostgreSQL + Drizzle ORM, with a Docker Compose setup for
running the whole stack locally in containers.

Reads go to a **read replica** and writes go to the **primary**; locally both
point at the same Postgres instance, so enabling a real replica later is a
config change, not a code change. See [`lib/db.ts`](./lib/db.ts).

## Stack

| Piece      | Choice                                       |
| ---------- | -------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript)          |
| Database   | PostgreSQL 16                                |
| ORM        | Drizzle ORM + `node-postgres` (`pg`)         |
| Migrations | `drizzle-kit` (SQL files in `db/migrations`) |
| Validation | Zod                                          |
| Containers | Docker + Docker Compose                      |

## Prerequisites

- Node.js 20+ (developed on 22)
- Docker Desktop (for the container workflows)

## Setup

```bash
npm install
cp .env.example .env.local      # Windows: copy .env.example .env.local
```

`drizzle.config.ts` loads `.env.local`, so no extra env plumbing is needed.
`.env.example` documents every variable; the compose file has working defaults.

## Workflow A — hybrid (DB in Docker, app on host)

Fastest inner loop: Postgres runs in a container, Next.js runs on your machine
with hot reload.

```bash
npm run db:up          # start Postgres in the background
npm run db:migrate     # apply db/migrations
npm run db:seed        # optional sample rows
npm run dev            # http://localhost:3000
```

Stop the database with `npm run db:down`, or wipe its volume with
`npm run db:reset`.

## Workflow B — fully containerized

Builds the production image from the multi-stage `Dockerfile`, applies
migrations in a one-shot `migrate` service, then starts the app. This is the
closest thing to production locally.

```bash
npm run docker:up      # docker compose up --build
# -> web on http://localhost:3000
```

The `web` service waits for Postgres to be healthy **and** for the `migrate`
service to exit successfully before starting (see `compose.yaml`).

> `.env.local` is excluded from the image (`.dockerignore`). Compose injects
> `DATABASE_URL` pointing at the `db` service, which is why the app must use the
> hostname `db` inside containers and `localhost` on the host.

## Scripts

| Script                | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Next.js dev server                              |
| `npm run build`       | Production build (emits `output: "standalone"`) |
| `npm run start`       | Serve a production build                        |
| `npm run lint`        | ESLint                                          |
| `npm run storybook`   | Storybook dev server (port 6006)                |
| `npm run build-storybook` | Static Storybook build                      |
| `npm run db:generate` | Generate a migration from `db/schema.ts`        |
| `npm run db:migrate`  | Apply pending migrations                        |
| `npm run db:push`     | Push schema directly (dev only, no SQL file)    |
| `npm run db:studio`   | Drizzle Studio GUI                              |
| `npm run db:seed`     | Insert sample rows                              |
| `npm run db:up`       | Start only the Postgres container               |
| `npm run db:down`     | Stop containers (keep data)                     |
| `npm run db:reset`    | Stop containers and delete the data volume      |
| `npm run docker:up`   | Build + run the full stack in containers        |
| `npm run docker:down` | Stop the full stack                             |

## API

| Route             | Method | Notes                                     |
| ----------------- | ------ | ----------------------------------------- |
| `/api/health`     | GET    | Pings the DB with `select 1`; 503 if down |
| `/api/v1/reports` | GET    | Read — served by the replica              |
| `/api/v1/reports` | POST   | Write — always the primary                |

```bash
curl http://localhost:3000/api/health
curl "http://localhost:3000/api/v1/reports?city=Tokyo&limit=5"
curl -X POST http://localhost:3000/api/v1/reports \
  -H "Content-Type: application/json" \
  -d '{"city":"Osaka","temperature":24.5,"humidity":60,"description":"clear sky"}'
```

Both routes are `force-dynamic` and validate input with Zod; queries are
parameterized by Drizzle.

## Testing and test data

Test data is shared, typed, and deterministic.

| Layer                 | Runs via                             | Data source                       |
| --------------------- | ------------------------------------ | --------------------------------- |
| Component / story     | Storybook + Vitest (`storybookTest`) | colocated fixtures / story `args` |
| DB-backed (API, lib)  | Vitest (node project) + a test DB    | `db/fixtures.ts`                  |
| Pure unit (Zod, util) | Vitest (node project)                | table-driven case fixtures        |

Conventions:

- **One source of truth for domain fixtures.** `db/fixtures.ts` exports typed
  rows with **explicit time values** — the column defaults to `now()`, so fixed
  timestamps keep results deterministic. Reuse it in the seed, DB tests, and any
  story that renders data.
- **Seed is idempotent.** `db/seed.ts` truncates before inserting, so repeated
  `npm run db:seed` runs don't accumulate duplicate rows.
- **Story data is colocated and typed.** Stories live next to components
  (`components/*.stories.tsx`), with `components/*.fixtures.ts` for anything
  non-trivial. Use `satisfies Meta<typeof C>`, `fn()` for callback args, `play`
  for interaction tests, and assertions from `storybook/test`
  (`expect` / `within` / `userEvent`) — do not add `@testing-library/react`.
  Stub network/services with MSW handlers shared by Storybook and Vitest.
- **DB tests use a dedicated database.** Point `DATABASE_URL` and
  `DATABASE_REPLICA_URL` at a throwaway instance (`.env.test`), apply
  migrations, load `db/fixtures.ts`, and isolate each test with a rolled-back
  `db.transaction(...)` or a `TRUNCATE` in `beforeEach`. Both URLs point at the
  same instance, mirroring the replica sandbox in `lib/db.ts`.
- **Unit tests keep DB access lazy.** The Zod schemas (`listQuery`, `createBody`)
  are pure; route handlers are imported and called with a `NextRequest`, mocking
  `@/lib/db`. Connections stay lazy (see `lib/db.ts`), so importing a handler
  needs no live database.

```bash
npm run storybook        # Storybook dev server (port 6006)
npm run build-storybook  # Static Storybook build
npx vitest               # story + unit test projects
```

### Current state and follow-ups

The conventions above are the target; a few gaps remain in the current setup:

- `.storybook/main.ts` still globs the scaffold at `../stories/**` instead of
  `../components/**`, so real components aren't picked up yet.
- `.storybook/main.ts` sets `staticDirs: ["..\\public"]` with a Windows
  backslash, which breaks on Linux/CI/Docker — it should be `"../public"`.
- `storybook` is declared under `dependencies`; it belongs in `devDependencies`.
- `db/fixtures.ts` doesn't exist yet — `db/seed.ts` still holds inline sample
  rows and appends on each run.
- Vitest is configured with only the Storybook browser project; a node project is
  still needed for unit and DB tests.

## Schema and migrations

Edit `db/schema.ts`, then:

```bash
npm run db:generate    # writes a new file under db/migrations
npm run db:migrate     # applies it
```

Migrations in `db/migrations` are the single source of truth for the schema.
There is deliberately no `db/init/*.sql` — a second schema definition would
drift from the migrations.

## Deploying: Vercel + Neon

1. Create a Neon project in the **same region** as your Vercel functions.
2. Run migrations against the **direct/unpooled** endpoint — Neon's pooler is
   PgBouncer in transaction mode and can break migrations.
3. Set these env vars in Vercel (Production / Preview / Development):

   | Variable                | Value                             |
   | ----------------------- | --------------------------------- |
   | `DATABASE_URL`          | Neon **pooled** primary endpoint  |
   | `DATABASE_URL_UNPOOLED` | Neon **direct** primary endpoint  |
   | `DATABASE_REPLICA_URL`  | Neon replica **pooled** endpoint  |

4. Import the repo into Vercel (framework preset: Next.js).
5. Check read-replica availability for your Neon plan before relying on it; if
   unavailable, leave `DATABASE_REPLICA_URL` unset and reads fall back to the
   primary.

`next.config.ts` sets `output: "standalone"` for the Docker image; Vercel
ignores that setting.

## Project structure

```
app/
  api/health/route.ts        DB liveness probe
  api/v1/reports/route.ts    read (replica) + write (primary) example
components/                  shared React components (+ *.stories.tsx, *.fixtures.ts)
stories/                     Storybook scaffold examples (to remove, see Testing)
db/
  schema.ts                  Drizzle table definitions
  seed.ts                    sample data
  fixtures.ts                typed sample rows shared by seed + tests (planned)
  migrations/                generated SQL (source of truth)
lib/
  db.ts                      primary + replica pools, readQuery() fallback
.storybook/                  Storybook config (main.ts, preview.tsx)
vitest.config.ts             Vitest projects (storybook browser + node)
drizzle.config.ts            drizzle-kit config (loads .env.local)
compose.yaml                 db + migrate + web services
Dockerfile                   deps / builder / migrator / runner stages
```

## Containerization notes

- **Two hostnames:** `localhost` from the host, `db` from inside a container.
- **Migrations run once**, in the `migrate` service, before `web` starts.
- **Data persists** in the `pgdata` named volume. Use `npm run db:reset` to
  recreate the schema from scratch.
- **Secrets never enter the image** — `.env*` is in `.dockerignore` and Compose
  injects runtime env vars.


