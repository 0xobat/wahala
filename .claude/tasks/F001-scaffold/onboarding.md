# F001 — Scaffold WAHALA.studio (Next.js + GSAP)

> Onboarding doc for the task: *"complete the scaffold for wahala.studio."*
> Written so a fresh session (or another agent) can pick up cold without re-deriving context.

---

## 1. What this project is

**WAHALA.studio** is a creative studio brand. The first deliverable is its own website — a single-page, scroll-scrubbed Next.js site that *performs* the brand promise ("creative chaos — resolved") by transforming visually from chaos (top of page) to calm (bottom). The site doubles as the studio's first portfolio piece.

The site is not a marketing template. The interaction *is* the pitch.

### Brand concept (one-paragraph version)

Lagos energy in a digital lens. The Danfo bus (yellow + black) is the visual anchor; the journey from **WAHALA DAY** (chaos) to **CHILLO MODE** (calm) is the narrative spine. Typography tilts and glows at the top, snaps to grid by the bottom. Every animated property (rotation, opacity, scanline texture, glow blur, background brightness) is tied directly to scroll position via GSAP ScrollTrigger `scrub: true` — the user controls the speed of transformation.

### Status of brand strategy

`WAHALA.md` is a CVP/strategy template that is **mostly empty** (only category/audience/pain-point filled in). The website spec ships ahead of full strategy — that's intentional. Don't try to derive missing strategy fields from the spec; ask the user if they need to be filled.

---

## 2. The authoritative spec

**Read first:** `docs/superpowers/specs/2026-04-20-wahala-website-brand-design.md`

This is the source of truth for the scaffold. Key extracts:

### Stack (locked)

- **Framework:** Next.js (App Router)
- **Animation:** GSAP + ScrollTrigger
- **Styling:** Tailwind CSS + CSS custom properties for design tokens
- **Fonts:** Space Grotesk (variable, display) + JetBrains Mono (mono)
- **Deploy target:** Vercel
- **Package manager:** Bun (decided this session — `.gitignore` already excludes `bun.lockb`)

### Required file structure (from spec §Technical Architecture)

```
app/
  layout.tsx          — font loading, global styles, metadata
  page.tsx            — assembles sections, initializes GSAP context
  globals.css         — design tokens, scanline overlay, base styles

components/
  sections/
    Hero.tsx          — [ 001 ] fragmented wordmark, max chaos
    About.tsx         — [ 002 ] identity statement
    Process.tsx       — [ 003 ] wahala day → chillo mode timeline
    Work.tsx          — [ 004 ] project grid
    Contact.tsx       — [ 005 ] minimal, resolved
  ScrollProgress.tsx  — fixed [ 00X ] indicator + segmented progress bar
  ScanlineOverlay.tsx — full-page repeating gradient texture

lib/
  animations.ts       — GSAP timeline definitions per section
  tokens.ts           — design token constants (colors, spacing, timing)
```

### Design tokens (paste-ready)

| Token | Value | Usage |
|-------|-------|-------|
| `wahala-yellow` | `#FFDC00` | Primary accent |
| `wahala-yellow-glow` | `rgba(255,220,0,0.3)` | Text shadows |
| `void-black` | `#0A0A0A` | Hero bg |
| `surface-1` | `#0D0D0A` | Section 2 bg |
| `surface-2` | `#0F0F0C` | Section 3 bg |
| `surface-3` | `#111111` | Section 4 bg |
| `surface-4` | `#131313` | Section 5 bg |
| `text-primary` | `#FFFFFF` | Headlines |
| `text-secondary` | `rgba(255,255,255,0.35)` | Body, mono |
| `scanline` | `rgba(255,220,0,0.02)` | Repeating overlay |

Background interpolates `#0A0A0A → #131313`, scanline opacity `1 → 0.1`, glow blur `30px → 0px`, rotation `-1.5deg → 0deg`, letter-spacing `-3px → normal` across the full scroll.

### Out of scope for v1 (do NOT add)

- CMS / dynamic content
- Routing beyond single page
- Contact form (email `mailto:` link only)
- Blog
- Analytics
- Dark/light toggle (always dark)

---

## 3. Decisions made this session

Recorded so the next session doesn't re-ask:

| Question | Decision | Why |
|---|---|---|
| Package manager | **Bun** | Already installed (1.3.0); `.gitignore` excludes `bun.lockb`; user preference |
| Starter content | **Skeleton only** | Empty sections + TODOs. User wants to write copy/animations themselves later |
| Init approach | **Hand-roll minimal** | Match the spec's file structure exactly; no `create-next-app` boilerplate to prune |
| GSAP install | **Install now** | Stub `lib/animations.ts` so the scaffold is animation-ready out of the box |

---

## 4. Current repo state (snapshot)

### Files

- `CLAUDE.md` — project instructions: use gstack's `/browse`, never `mcp__claude-in-chrome__*`. Lists all gstack slash commands.
- `WAHALA.md` — CVP/strategy template (mostly empty, has uncommitted edits)
- `inspo.md` — list of inspiration sites + brand concept notes
- `docs/superpowers/specs/2026-04-20-wahala-website-brand-design.md` — the spec (read this!)
- `.superpowers/brainstorm/` — two prior brainstorm session dirs with HTML artifacts (typography, color, approach, scroll-behavior). Historical context, not deliverables.
- `.claude/skills/gstack/` — git submodule (initialized, on `main` at `1868636f`)
- `.gitignore` — node_modules, dist, .env, .DS_Store, bun.lockb

### Git

- Branch: `main`
- One commit: `a2afaf3 Initial commit: project setup with gstack, CLAUDE.md, and gitignore`
- Working tree: `WAHALA.md` modified; `.superpowers/`, `docs/`, `inspo.md` untracked
- The git status mentions `WAHALA-obat.md` and `ideas.md` — those files **do not exist on disk** (stale start-of-conversation snapshot)

### What does NOT exist yet

- No `package.json`
- No `app/`, `components/`, `lib/`
- No `node_modules/`
- No `tailwind.config.*`, `postcss.config.*`, `next.config.*`, `tsconfig.json`
- No `.claude/tasks/` (created this session for this doc)

---

## 5. Build plan (the scaffold steps)

In order. Each step is small enough to verify before the next.

1. **Init Bun + Next.js dependencies**
   - `bun init` (minimal) or write `package.json` directly
   - Add: `next`, `react`, `react-dom`, `gsap`, `@gsap/react`
   - Dev: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer` (Tailwind v4 path — verify current docs)
   - **Verify:** `bun install` succeeds; lockfile generated

2. **Config files**
   - `tsconfig.json` — Next.js defaults, `"@/*"` path alias
   - `next.config.ts` — minimal, `reactStrictMode: true`
   - `tailwind.config.ts` (or v4 CSS-first config in `globals.css`)
   - `postcss.config.mjs`
   - `.eslintrc.json` (or use Next.js default)
   - **Verify:** `bunx next info` or `bunx tsc --noEmit` runs without error

3. **App shell**
   - `app/layout.tsx` — load Space Grotesk + JetBrains Mono via `next/font/google`, set `<html>` bg to `void-black`, attach mono as default body font, metadata block (title, description, OG placeholder)
   - `app/globals.css` — Tailwind directives, design-token CSS custom properties (all 10 tokens from the table), scanline overlay base utility class, reset that hides scrollbar overflow horizontally
   - `app/page.tsx` — imports & stacks the 5 section components, mounts `ScrollProgress` and `ScanlineOverlay`, sets up GSAP context with `useGSAP`
   - **Verify:** `bun run dev` boots, `/` renders empty sections with correct backgrounds

4. **Section skeletons**
   - One file per section in `components/sections/` — each is a typed React component with: a `<section>` wrapper carrying `id={001..005}`, the section bg color from tokens, the `[ 00X ]` marker top-right, a TODO comment listing the spec's per-section visual + animation notes, and a ref for GSAP targeting.
   - Identical shape across all five so future work is just filling in the body.

5. **Fixed-element components**
   - `ScrollProgress.tsx` — fixed top-right `[ 00X ]` (updates from scroll) + segmented dash row
   - `ScanlineOverlay.tsx` — fixed full-viewport div with the `repeating-linear-gradient` overlay, opacity bound to a CSS var so GSAP can scrub it

6. **GSAP stub**
   - `lib/animations.ts` — exports a single `initGlobalTimeline(ctx)` that registers ScrollTrigger and sets up the global scroll-scrub for: background color, scanline opacity, glow blur, rotation, letter-spacing. Per-section timelines are stubbed as `// TODO` functions.
   - `lib/tokens.ts` — TS constants mirroring the design tokens (so animations can reference colors without magic strings)

7. **Smoke test**
   - `bun run dev` → open `localhost:3000` via gstack's `/browse` skill
   - Scroll the page; confirm background transitions, no console errors, sections stack
   - Run `bunx tsc --noEmit` for a clean type check

8. **Commit**
   - One commit titled e.g. `scaffold: Next.js + GSAP shell with five-section structure`
   - Do NOT commit `node_modules/` (gitignored) or `bun.lockb` (gitignored, per project convention)
   - Leave `WAHALA.md` working-tree edits untouched (separate concern)

---

## 6. Things to be careful about

- **Tailwind v3 vs v4 split.** v4 (current) configures via CSS-first `@theme` blocks; v3 uses `tailwind.config.ts`. Check `bun add tailwindcss` resolved version and follow the matching docs. Pin v4 if available — it's the default of fresh Next.js scaffolds.
- **GSAP plugins are paid in some bundles.** ScrollTrigger is in the free `gsap` package. Don't accidentally pull in Club GSAP plugins (`SplitText`, `MorphSVG`, etc.) — the spec doesn't need them.
- **`useGSAP` hook.** Use `@gsap/react`'s `useGSAP` instead of raw `useEffect` for React 18+ Strict Mode safety. ScrollTrigger cleanup must run on unmount.
- **Font loading.** `next/font/google` is the right path; do NOT use `<link>` tags. Space Grotesk italic + JetBrains Mono only (no other weights to keep bundle small).
- **The scanline overlay** must be `pointer-events: none` and sit above content (`z-index` high) but not block clicks. The opacity scrub will go through a CSS variable, not by re-rendering React.
- **No `WAHALA-obat.md` / `ideas.md`.** Git status mentioned them but they don't exist. Ignore those entries.
- **Don't fill copy yet.** User explicitly chose "skeleton only." Section components get TODO placeholders, not real copy. If you find yourself writing "Once wahala dey…" stop.
- **`mcp__claude-in-chrome__*` is BANNED.** Per `CLAUDE.md`, use gstack's `/browse` for any browser interaction.

---

## 7. Project conventions

- **Gstack-first workflow.** This repo runs on gstack skills (`/ship`, `/review`, `/browse`, `/qa`, etc.) — see `CLAUDE.md` for the full list. Use them instead of hand-rolling.
- **Spec-driven.** Brainstorm → spec in `docs/superpowers/specs/YYYY-MM-DD-slug.md` → implementation. Don't deviate from the spec without re-running brainstorm or asking.
- **Submodule for gstack.** `.claude/skills/gstack/` is pinned via `.gitmodules`. Fresh clones need `git submodule update --init`.
- **No emoji** (per system prompt). Skip them in code, comments, and commit messages.
- **Defer commits.** Don't create commits unless the user asks. After the scaffold is built, *propose* the commit message and wait.

---

## 8. Reference: inspiration sites

From `inspo.md` — for vibe-matching when wiring concrete styling later:

- buttermax.net, sageeast.com, pomegranate.health, dorstenlesser.com
- tux.co/en/contact (contact page reference)
- waxyweb.agency, geex-arts.com, erichu.info
- airbagstudio.it/en (limited-work layout)
- overpx.com, airborne.studio (typography), terminal-industries.com
- rejouice.com, tessarakt.com, petragarmon.com/en
- brandingthatslaps.com, nakula.framer.website (how we work)
- wearecheck.co (messaging), awge.com/home

---

## 9. Open questions (none currently blocking)

All four scaffold-blocking questions were answered this session. The following are open but can be deferred:

- **Domain registered?** wahala.studio — not yet verified. Affects metadata `metadataBase` and OG image absolute URLs.
- **Strategy fields in `WAHALA.md`.** Many empty (Market Size, CVP details, pricing, team). Not needed for scaffold.
- **Real project entries for §004 (Work grid).** Spec says "Grid implies capacity even with limited projects" — placeholder cards are fine for v1.
- **Favicon source asset.** Spec calls for a simplified W glyph or wordmark. Can ship scaffold with a temporary one.

---

## 10. Resume protocol (for a future session)

If you're a future Claude opening this doc cold:

1. Read this file end-to-end.
2. Read `docs/superpowers/specs/2026-04-20-wahala-website-brand-design.md` end-to-end.
3. Skim `CLAUDE.md` (gstack rules) and `WAHALA.md` (brand framing).
4. Run `git status` and `bun pm ls` to see how far the scaffold got.
5. Pick up at the next unchecked step in §5 "Build plan."
6. Use `/browse` (not `mcp__claude-in-chrome__*`) for any browser verification.
