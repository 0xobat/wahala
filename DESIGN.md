---
version: alpha
name: WAHALA.studio
description: "Creative chaos — resolved. Danfo-bus energy translated into a digital lens; the brand performs its own thesis by transforming from WAHALA DAY to CHILLO MODE."
colors:
  primary: "#FFDC00"
  surface: "#0A0A0A"
  surface-1: "#0D0D0A"
  surface-2: "#0F0F0C"
  surface-3: "#111111"
  surface-4: "#131313"
  on-surface: "#FFFFFF"
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 120px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -3px
    fontFeature: '"ss01" on'
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -2px
  display-md:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1.5px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.02em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.04em
  label-marker:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.15em
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 9999px
spacing:
  unit: 8px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 96px
  gutter: 24px
  margin: 24px
  section: 100vh
components:
  scanline-overlay:
    backgroundColor: rgba(255, 220, 0, 0.02)
  section-1-bg:
    backgroundColor: "{colors.surface}"
  section-2-bg:
    backgroundColor: "{colors.surface-1}"
  section-3-bg:
    backgroundColor: "{colors.surface-2}"
  section-4-bg:
    backgroundColor: "{colors.surface-3}"
  section-5-bg:
    backgroundColor: "{colors.surface-4}"
  section-marker:
    textColor: "{colors.primary}"
    typography: "{typography.label-marker}"
    padding: 24px
  scroll-progress-dash-active:
    backgroundColor: "{colors.primary}"
  scroll-progress-dash-inactive:
    backgroundColor: rgba(255, 220, 0, 0.2)
  hero-wordmark:
    textColor: "{colors.primary}"
    typography: "{typography.display-xl}"
  hero-tagline:
    textColor: rgba(255, 255, 255, 0.35)
    typography: "{typography.body-sm}"
  body-text:
    textColor: rgba(255, 255, 255, 0.35)
    typography: "{typography.body-md}"
  link-default:
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  link-hover:
    textColor: "{colors.primary}"
  card-work:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 24px
  card-work-hover:
    backgroundColor: "{colors.surface-4}"
---

## Brand & Style

WAHALA.studio is a creative studio born from Lagos energy — the noise, the chaos, the genius improvisation of a Danfo bus weaving through traffic. The brand exists to translate that energy into work that *resolves*. "Once wahala dey, WAHALA.studio go arrange am."

The visual identity sits in a single emotional arc: **chaos → calm**. The wordmark tilts and glows. Typography starts loose and over-spaced; by the bottom of any surface it has snapped to grid. Yellow burns at the top; by the resolution moment, it has dimmed to a single quiet indicator. The brand is never *not* dark — but the darkness lifts as the work resolves, the way pre-dawn becomes morning.

Two non-negotiable principles:

1. **The interaction is the pitch.** Whenever possible, the brand should *perform* its thesis rather than describe it. A scroll, a hover, a transition — these should demonstrate "creative chaos, resolved." Static screens are allowed; static *experiences* are not.
2. **Pidgin and English live side by side.** The voice carries Lagos cadence ("Once wahala dey…") without performing it. English handles the institutional load; Pidgin lands the punchline.

The aesthetic neighbourhood: late-night code editors, CRT monitors, the underside of a Danfo bus at dusk. References include `airborne.studio`, `terminal-industries.com`, `waxyweb.agency`, and `awge.com` — sharp typography, dark surfaces, no decorative chrome.

## Colors

The palette is a two-note composition: a single high-saturation yellow against a graduated near-black. Yellow is the Danfo body and the brake-light flash; the black scale is the sky outside the window at every hour from midnight to dawn.

- **Primary (Wahala Yellow `#FFDC00`):** The Danfo. The only accent. Used for the wordmark, all interactive accents, section markers, and the glow that signals "this is alive." Never tinted toward orange or chartreuse — the exact hex matters because the saturation has to feel electric, not warm.
- **Surface scale (`#0A0A0A` → `#131313`):** Five steps of near-black, each one fractionally lighter than the last. The scale represents *time of night*: `surface` (`#0A0A0A`) is true midnight; `surface-4` (`#131313`) is the moment before dawn. On the marketing site, backgrounds interpolate continuously through this scale as the user scrolls — the chaos resolves into morning. The differences are small on purpose (3–9 units of lightness) so the transition reads as *atmosphere*, not theme-switching.
- **On-surface (`#FFFFFF`):** Pure white for headlines and high-importance text. Used at full opacity only where it would otherwise compete with the yellow accent.
- **Muted on-surface (white at ~35% opacity):** All body copy, mono labels, supporting text. The low opacity keeps the page quiet so the yellow can do the speaking. This is an *opacity decision*, not a separate color value — implement via `rgba(255, 255, 255, 0.35)` directly so the relationship survives as backgrounds shift. Do not add a `muted` color token to the palette; that would suggest a second color exists, which it doesn't.

The brand has **no second accent**. No blue, no red, no secondary brand color. The discipline is the design. If a surface needs another color, escalate to a brand conversation before adding one.

Translucent values (the `rgba()` scanline overlay, glow shadows, muted text) belong in the `components` layer, not in `colors`. The colors palette is the canonical set of opaque hex values.

## Typography

Two voices, no overlap.

- **Space Grotesk (display, bold italic):** Every headline, every wordmark, every moment of impact. Bold + italic + tight letter-spacing is the chaos signature. At the top of a scroll, the italic skew is visible; by the bottom, the brand "resolves" into upright type. Use `display-xl` for hero wordmarks, `display-lg` for section openers, `display-md` for in-content emphasis. Negative letter-spacing (`-1.5px` to `-3px`) is non-negotiable on display sizes — without it the type reads as a generic SaaS landing page.
- **JetBrains Mono (system, body, labels):** Everything else. Body copy is *small* (11–13px) and *wide* (positive letter-spacing). The mono voice is the studio's "system layer" — terminal prompts, code comments, build logs. Lowercase by default; uppercase only for the `[ 00X ]` section markers and other label-marker usage. Never use mono for headlines — that pushes the brand toward developer-tool aesthetic and loses the Lagos warmth.

**Display rotation as a token-adjacent property.** The wordmark is rotated `-1.5deg` at maximum chaos and interpolates to `0deg` at full resolution. This rotation is a CSS custom property (`--global-rotation`), not a per-instance style — it should be set once and inherited.

**Glow as text-shadow, not a color.** Display elements on dark backgrounds carry a yellow text-shadow whose blur radius is bound to scroll position: `30px → 0px` from chaos to calm. The shadow color is `rgba(255, 220, 0, 0.3)` (Wahala Yellow at 30% opacity). Apply only to Space Grotesk display levels — never to body or mono.

## Layout & Spacing

The marketing site is a **single-page vertical scroll** of viewport-height sections. There is no horizontal layout to speak of — content centers within a generous margin and lets the typography carry the composition. This is intentional: the brand's narrative *is* the scroll position, and a grid system would compete with it.

The launch (coming-soon) site uses a four-section rhythm:

1. **Hero / WAHALA moment** — maximum chaos; fragmented wordmark, live transmission, countdown to launch
2. **Voice** — the question and the answer ("Got a big problem to solve?" → "No Wahala."); Pidgin and English side-by-side
3. **Boarding** — the Danfo: passengers (creatives, developers, writers, etc.) loaded into the bus, one empty seat marked "YOU?"
4. **Chillo** — resolution: serene wordmark, smaller countdown, email capture, contact, footer

Longer-form surfaces (the eventual full studio site) extend the same arc to five sections by inserting a Process/midpoint between Voice and Work. The principle is constant: every surface starts at chaos and resolves to chillo.

Spacing follows an **8px base unit**. Tight scales (`xs: 8`, `sm: 16`, `md: 24`) inside component groups; wider scales (`lg: 48`, `xl: 96`) between sections. Section markers (`[ 00X ]`) sit at `24px` from the top-right corner of every section — this is a brand constant, not a layout decision.

Section transitions are achieved by background interpolation across the surface scale, not by dividers or whitespace. There should be no visible "seam" between sections on the marketing site — the only signal of progress is the section marker in the corner and the progress dashes.

## Elevation & Depth

WAHALA is a **flat** design system. There are no drop shadows, no card elevations, no Material-style z-axis. Depth is communicated through three non-shadow channels:

1. **The scanline overlay.** A fixed full-viewport repeating gradient (yellow at 2% opacity, 4px stripe) sits above all content with `pointer-events: none`. Its opacity is bound to scroll: `1.0` at the top of any surface, `0.1` at the bottom. This is the brand's CRT/Danfo-window texture — the "atmosphere" the content lives inside.
2. **Yellow glow as halo, not shadow.** Headlines and the wordmark carry a yellow text-shadow that *appears* to glow but is actually depth — it implies a light source somewhere behind the screen. Glow intensity scrubs from `30px blur` (chaos) to `0px` (resolved).
3. **Tonal layering.** The surface scale (`surface` through `surface-4`) provides "elevation" by virtue of being slightly lighter. A Work card on a `surface-3` section uses `surface-3` itself as its container — depth comes from the *next* card being on `surface-4`, not from a shadow underneath.

Never add box-shadow except as part of the yellow-glow vocabulary. If a UI needs more depth than the system provides, the answer is usually "less content, more space."

## Shapes

Sharp. Rectangular. Slightly raw.

The `rounded` scale tops out at `4px` (`md`). The default for cards, inputs, and containers is `none` (0px) — true right angles. The `full` token (`9999px`) exists only for circular elements like avatar placeholders or single-character glyphs. There is no `rounded-lg` or larger; if a designer reaches for one, the request should be reconsidered.

Circles and arcs may appear as **decorative graphic elements** (e.g., a yellow dot for the "● chillo" indicator, segmented dashes for scroll progress), but containers stay rectangular. The contrast between the soft graphic flourishes and the hard container edges is part of the chaos-vs-structure tension.

SVG scrawl underlines may underline key phrases (1–2 hand-drawn path variations, kept on file). These are *not* a system primitive — they are flourishes used sparingly for emphasis. Treat them like punctuation, not pattern.

## Components

### Section markers `[ 00X ]`

The most-used component in the system. Mono, uppercase-rendered (the characters are already uppercase), Wahala Yellow at a quiet opacity (~30–60%). Always positioned top-right of a section at `24px` from each edge. The marker text follows a strict format: opening bracket, space, three-digit zero-padded number, space, closing bracket.

```
[ 001 ]   [ 002 ]   [ 003 ]   [ 004 ]   [ 005 ]
```

### Scanline overlay

A fixed full-viewport `<div>` styled with a repeating linear gradient. Yellow at 2% opacity, 2px transparent / 2px scanline / repeat. The overlay sits at `z-index: 50` above content with `pointer-events: none` so it never intercepts clicks. Its opacity is driven by a CSS custom property (`--scanline-opacity`) so animation can scrub it without React re-renders.

### Scroll progress

Three to five horizontal yellow dashes, top-right of the viewport (below the section marker). Each dash is `1px` tall and `24px` wide, separated by `6px` gutters. Active dashes (those scrolled past) sit at full Wahala Yellow; inactive dashes drop to 20% opacity. The transition between active and inactive should be instant — no easing — to reinforce the "snap to grid" feeling of progress.

### Hero wordmark

The brand wordmark in `display-xl` Space Grotesk bold italic, rotated `-1.5deg` at maximum chaos. On the marketing hero, multiple instances of the wordmark may overlap at varied sizes and opacities, drifting at different parallax rates before *converging* into the single canonical wordmark as the user scrolls. The `.studio` suffix is set in `body-sm` JetBrains Mono at 35% white opacity, beside or below the main mark.

### Work cards

Sharp-cornered (`rounded: none`) tiles on the `surface-3` or `surface-4` background. The card itself uses the section's surface color — no fill, no border — so the only thing distinguishing it from the background is its content and a `surface-4` hover state (`#131313`). Hover may reveal a `1px` Wahala Yellow top border as a structural marker. Cards should appear in a clean grid that *implies capacity* even with a small number of projects — show empty slots before showing fewer cards.

### Links

All links are Wahala Yellow. No underlines by default — color carries the affordance. On hover, add a yellow text-shadow (8–12px blur, 30% opacity) so the link briefly "lights up" in the same vocabulary as the headlines. Visited state is not styled separately; the brand treats the site as ephemeral, not as a library.

## Do's and Don'ts

- **Do** use Wahala Yellow as the only accent. If a surface needs a second color, the answer is "less yellow," not "add a second color."
- **Do** keep body copy small (11–13px) and quiet (~35% opacity white). The page should feel like a terminal, not a brochure.
- **Do** rotate the wordmark `-1.5deg` at maximum chaos and interpolate to `0deg` at resolution. The rotation is the brand signature.
- **Do** pair Pidgin and English in the voice. Pidgin lands the punchlines; English carries the institutional weight.
- **Do** use the `[ 00X ]` section marker on every distinct surface, even off-site (decks, social tiles). It is the studio's calling card.
- **Don't** introduce a second brand color, a gradient palette, or a "light mode." The brand is always dark.
- **Don't** use box-shadow for elevation. Depth comes from the scanline overlay, yellow glow, and tonal surface scale — nothing else.
- **Don't** use rounded corners larger than `4px`. Sharp edges are part of the chaos vocabulary.
- **Don't** use Space Grotesk for body copy or JetBrains Mono for headlines. The two fonts have non-overlapping roles.
- **Don't** decorate. No background patterns, no illustrated mascots, no stock photography. The scanline texture is the only ambient decoration the system permits.
- **Don't** describe the brand in copy when you can *perform* it through interaction. "We resolve chaos" written on a static page is worse than a scroll that demonstrates the same idea wordlessly.
