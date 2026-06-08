# WAHALA.studio — Project Onboarding (current state)

> Written 2026-06-07. Captures the **verified** current state of the repo so a fresh
> session can pick up cold. Supersedes `.claude/tasks/F001-scaffold/onboarding.md`,
> which predates the monorepo restructure and the pivot to a coming-soon site.

---

## 1. What this is

**WAHALA.studio** is a creative-studio brand. Tagline: *"Creative chaos — resolved."*
Toronto studio, Lagos energy. The Danfo bus (yellow `#FFDC00` on near-black) is the
visual anchor; the narrative spine is the journey from **WAHALA DAY** (chaos, top of
page) to **CHILLO MODE** (calm, bottom). The site *performs* the brand: every animated
property is scrubbed by scroll position, so the user controls the chaos→calm transform.

The current deliverable is the **coming-soon / launch site** — live target "Summer 2026"
(countdown to `2026-08-22T12:00:00-04:00`). This is a marketing pre-launch page with an
email-capture, **not** the full 5-section studio site described in the original spec.

## 2. Repo layout (flat single app — NOT a monorepo)

The Bun-workspaces monorepo was flattened to a single root-level Next.js app on 2026-06-07
(user chose "keep it simple"; `apps/coming-soon/*` moved up to the root via `git mv`).

```
/ (wahala-studio, private — no `workspaces` field)
├── package.json          — plain scripts: dev / build / start / typecheck (no `--filter`)
├── bun.lock              — committed (note: .gitignore excludes bun.lockb, NOT bun.lock)
├── tsconfig.json         — `@/*` → `./*` (root-relative)
├── next.config.ts        — reactStrictMode: true
├── postcss.config.mjs    — @tailwindcss/postcss
├── app/                  — layout.tsx, page.tsx, globals.css
├── components/           — sections/ + Chrome, Danfo, Countdown, Glitch*, Scanline, GlobalAnimations
├── lib/                  — animations, chaos-store, tokens, useCountdown, useGlitchTick
├── CLAUDE.md             — current (rewritten 2026-06-07 for the flat layout)
├── DESIGN.md             — the authoritative brand/design system (read this)
├── WAHALA.md             — CVP/strategy template, mostly EMPTY (only market/audience filled)
├── inspo.md              — inspiration site list + brand concept notes
├── README.md             — one line ("Wahala Studio mockup")
├── docs/
│   ├── inspo/coming-soon-v1.html                      — static HTML design reference
│   └── 2026-04-20-wahala-website-brand-design.md      — ORIGINAL 5-section spec (now partly superseded)
└── .claude/tasks/        — onboarding docs (F001-scaffold/ is stale; onboarding/ is current)
```

## 3. The app (flat, at repo root)

Next.js 16.2 (App Router, **Turbopack**) + React 19 + GSAP 3.15 + Tailwind v4 (CSS-first,
`@import "tailwindcss"` + `@theme` in `globals.css`, no `tailwind.config`). TypeScript 6.

### Structure & roles

```
app/
  layout.tsx         — loads Space Grotesk + JetBrains Mono via next/font/google; metadata
  page.tsx           — assembles: ScanlineOverlay, Chrome, Hero, Voice, Boarding, Chillo, GlobalAnimations
  globals.css        — ~980 lines. ALL real styling lives here (tokens, scanlines, every section, the Danfo, responsive)
components/
  sections/
    Hero.tsx         — [001] fragmented overlapping wordmarks ("ghosts") + countdown + "scroll to resolve"
    Voice.tsx        — [002] "Got a big problem to solve?" → "No Wahala." + Pidgin/English columns
    Boarding.tsx     — [003] the Danfo, passenger manifest (designers…), empty "YOU?" seat, CTA
    Chillo.tsx       — [004] resolved wordmark, medium countdown, EMAIL CAPTURE FORM, contact, footer
  Chrome.tsx         — fixed corners: [00X] marker, progress dashes, transmission label, location, ©
  Danfo.tsx          — the bus, pure positioned divs (geometry in globals.css under .danfo)
  Countdown.tsx      — D/H/M/S, composed of GlitchNum
  GlitchNum.tsx      — randomises digits proportional to `chaos` (uses Math.random() in render)
  GlitchWordmark.tsx — glitch text effect — DEFINED BUT NOT IMPORTED anywhere (dead/spare)
  ScanlineOverlay.tsx— vignette + scanline divs (opacity scrubbed via --scanline-opacity)
  GlobalAnimations.tsx — mounts the GSAP timeline in a useEffect; renders null
lib/
  animations.ts      — initGlobalTimeline(): one ScrollTrigger, scrub:true, writes CSS vars + chaos-store
  chaos-store.ts     — useSyncExternalStore bridge: GSAP → React (chaos 1→0, sectionIdx 0..3)
  tokens.ts          — colors, scrub endpoints, launch ISO/label, location, SECTIONS=["001".."004"]
  useCountdown.ts    — 1s-interval countdown hook → {days,hours,minutes,seconds}
  useGlitchTick.ts   — RAF tick (~14Hz) to re-randomise glitch chars while chaos>0.01
```

### How the animation system works (the core idea)

1. `GlobalAnimations` (client) calls `initGlobalTimeline()` on mount.
2. That creates **one** `ScrollTrigger` over `document.body`, `scrub: true`.
3. On every update it computes `progress` (0→1), `chaos = 1 - progress`, and writes:
   - CSS vars on `:root` — `--progress`, `--chaos`, `--rotation`, `--glow-blur`,
     `--scanline-opacity`, plus `document.body.style.background` (interpolated `#0a→#13`).
     → drives all *pure-CSS* scrubbing (glow, scanline fade, bg lightening).
   - `setChaos(chaos, sectionIdx)` into `chaos-store` → React components read via `useChaos()`.
     → drives *JSX* calculations (Hero ghost transforms, glitch intensity, section marker).
   This dual-write is deliberate: keeps CSS and React reading the **same** scroll value, no drift.

Section background lightening over the surface scale (`#0A0A0A → #131313`) = "time of night,
midnight → pre-dawn." Yellow `#FFDC00` is the **only** accent — no second color, ever (DESIGN.md rule).

## 4. Commands (verified working 2026-06-07, post-flatten)

From repo root:
- `bun install` — ✅ 54 packages
- `bun run dev` — `next dev` (port 3000)
- `bun run build` — ✅ builds clean (Turbopack, 3 static routes)
- `bun run start` — serve the production build
- `bun run typecheck` — ✅ passes (`tsc --noEmit`)

`node_modules/` is gitignored and was absent on a fresh checkout — run `bun install` first.

## 5. Design system — source of truth

**`DESIGN.md`** (root) is the authoritative, detailed brand system. Key non-negotiables:
- **One accent only**: Wahala Yellow `#FFDC00`. No second color, no gradients, no light mode.
- **Two fonts, no overlap**: Space Grotesk (bold italic) = display/headlines/wordmark only;
  JetBrains Mono (11–13px, wide tracking, ~35% white) = everything else. Never swap roles.
- **Flat**: no box-shadow for elevation. Depth = scanline overlay + yellow glow + surface scale.
- **Sharp corners** (max 4px radius; default 0). Circles only for dots/avatars.
- **`[ 00X ]` section marker** top-right, 24px from edges — the studio's calling card.
- **Perform, don't describe**: the interaction is the pitch.

`DESIGN.md` front-matter also carries a token spec; `lib/tokens.ts` + `globals.css` `@theme`
mirror it. The original `docs/2026-04-20-…md` describes a **5-section**
marketing site (Hero/About/Process/Work/Contact) — the built coming-soon app is a **4-section**
reinterpretation (Hero/Voice/Boarding/Chillo). Treat DESIGN.md + the actual app as current; treat
that spec as historical intent, not a checklist.

## 6. Stale / watch-out items

- **CLAUDE.md — FIXED 2026-06-07.** It used to tell you to `git submodule update --init` for gstack
  and listed gstack slash commands, but gstack was removed (commit *"Restructure to Bun-workspaces
  monorepo and drop gstack vendoring"*; there is **no `.gitmodules`**, no gstack skills in this checkout).
  CLAUDE.md was rewritten to match the real Bun-monorepo + coming-soon app. Note: the old
  "never use `mcp__claude-in-chrome__*`" rule was dropped along with the (now-gone) gstack `/browse`
  skill — if the user still wants chrome MCP avoided, re-add it.
- **`.claude/tasks/F001-scaffold/onboarding.md` is stale** — predates the monorepo + the coming-soon
  pivot. It describes a flat (non-monorepo) layout and the 5-section site. Don't follow its build plan.
- **`GlitchWordmark.tsx` is unused** (not imported). Either wire it in or it's spare.
- **Email capture is a stub** — `Chillo.tsx` `submit()` fakes success with `setTimeout`. TODO in code:
  wire a real provider (Resend / ConvertKit / etc.). No backend exists.
- **Hydration**: `GlitchNum`/`GlitchWordmark` use `Math.random()` during render. Fine for the effect,
  but it's the place to look if SSR hydration warnings ever appear.
- **`WAHALA.md` strategy is mostly empty** — CVP/pricing/team/market-size fields are blank. Don't
  invent them from the design; ask the user if a task needs them.

## 7. Git

- Branch `main`, clean tree. Recent: `324922e Restructure to Bun-workspaces monorepo and drop gstack vendoring`.
- Remote: github.com/0xobat/wahala. Git user: 0xobat.
- Deploy target per spec: **Vercel** (no `.vercel` config committed yet; `.vercel` is gitignored).
- Convention: **defer commits** — propose the message and wait for the user. No emoji.

## 8. Open questions (ask the user when a task needs them)

- What is the actual task this session? (onboard was run without one.)
- Email capture provider + where leads should go.
- Is `wahala.studio` domain registered? (affects `metadataBase`, OG absolute URLs — none set yet).
- (Done 2026-06-07) CLAUDE.md rewritten to drop stale gstack/submodule instructions.
- Favicon + OG image assets (spec calls for a W glyph / hero-as-static-image — none present).
