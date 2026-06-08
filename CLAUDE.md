# WAHALA.studio

Creative-studio brand. Tagline: "Creative chaos — resolved." Toronto studio, Lagos energy;
the Danfo bus (yellow on near-black) is the visual anchor and the page transforms from
**WAHALA DAY** (chaos) to **CHILLO MODE** (calm) as you scroll.

## Repo

A single flat Next.js 16 app (App Router, Turbopack) + React 19 + GSAP + Tailwind v4 at the
repo root — **not** a monorepo. It's a **simple placeholder** standing in for the full studio
website. Keep it minimal — don't grow it into the full multi-section studio site; if that gets
built, it belongs in a separate repo (or reintroduce Bun workspaces deliberately then).

## Setup & commands

Run from the repo root (Bun 1.3+):

- `bun install` — install (node_modules is gitignored; absent on fresh checkout)
- `bun run dev` — dev server (port 3000)
- `bun run build` — production build
- `bun run start` — serve the production build
- `bun run typecheck` — `tsc --noEmit`

## Design system

`DESIGN.md` (root) is the authoritative brand/design system — read it before any visual work.
Hard rules from it: one accent only (Wahala Yellow `#FFDC00`, no second color, no light mode);
two fonts with non-overlapping roles (Space Grotesk = display only, JetBrains Mono = everything
else); flat (no box-shadow elevation); sharp corners; the interaction is the pitch.

## How the app works

A single GSAP `ScrollTrigger` (`lib/animations.ts`, `scrub: true`) reads scroll
once and writes to both `:root` CSS variables (CSS-driven scrubbing) and a `useSyncExternalStore`
bridge (`lib/chaos-store.ts`, read via `useChaos()`) so React JSX reads the same `chaos` value
(1→0). Most styling lives in `app/globals.css`. Four sections: Hero / Voice / Boarding / Chillo.

## Conventions

- **Defer commits** — propose the message and wait for the user; don't commit unprompted.
- **No emoji** in code, comments, or commit messages.
- Spec/design history lives in `docs/`; the original 5-section spec there is historical intent —
  the built 4-section coming-soon app + `DESIGN.md` are current.
