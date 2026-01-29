# Zobacz - Agent Instructions

## Commands
- `bun dev` - Start Vite dev server
- `bunx convex dev` - Start Convex backend (run in separate terminal)
- `bun run build` - TypeScript check + Vite build
- `bun run typecheck` - TypeScript only
- `bun run lint` - ESLint

## Architecture
- **Frontend**: React + Vite + TypeScript in `src/`
- **Backend**: Convex (real-time DB) in `convex/` - schema.ts defines tables, pages.ts has queries/mutations
- **Styling**: Tailwind CSS v4 with glass morphism theme in `src/index.css`
- **Auth**: Passkey auth via auth.pcstyle.dev - see `src/lib/auth.ts` and `src/hooks/useAuth.ts`
- **PWA**: Configured in vite.config.ts with vite-plugin-pwa

## Code Style
- Use `bun` not npm/yarn/pnpm
- Functional React components with hooks
- Convex queries use `useQuery(api.module.fn)`, mutations use `useMutation(api.module.fn)`
- Polish UI text (this is a Polish app)
- No comments unless complex logic requires explanation
