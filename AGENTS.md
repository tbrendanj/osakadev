<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Testing conventions

- Run tests with `npx vitest` — component/interaction tests run through
  Storybook's `storybookTest` plugin in a headless browser (see `vitest.config.ts`).
- Test data has one source of truth: typed, deterministic fixtures. Pass explicit
  timestamps.
- Stories are colocated with components (`components/*.stories.tsx`) and use
  `storybook/test` utilities (`expect`, `within`, `userEvent`) — not
  `@testing-library/react`.
- DB-backed tests use a dedicated test database seeded from the shared fixtures,
  and isolate each test (transaction rollback or truncate).
- Keep DB access lazy so importing route handlers in unit tests needs no live
  database.

See the "Testing and test data" section in [`README.md`](./README.md) for detail.
