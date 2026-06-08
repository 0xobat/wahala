# WAHALA.studio — Website & Brand Identity Design Spec

## Overview

A single-page scrolling website for WAHALA.studio that IS the brand experience. The page transforms from creative chaos to calm resolution as the user scrolls — proving the studio's value proposition through interaction rather than explanation.

## Brand Identity System

### Concept

"Creative chaos — resolved." The brand is the Danfo bus reimagined through a digital/tech lens. Lagos energy expressed as electric light and code. The journey from WAHALA DAY to CHILLO MODE is the core narrative.

### Wordmark

- "WAHALA" in bold italic display type, rotated -1.5deg
- `.studio` in monospace, reduced opacity, alongside or below
- The tilt and glow ARE the chaos — no separate logomark needed
- SVG scrawl underlines for emphasis on key phrases

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `wahala-yellow` | `#FFDC00` | Primary accent, glowing headlines, markers |
| `wahala-yellow-glow` | `rgba(255,220,0,0.3)` | Text shadows, ambient light |
| `void-black` | `#0A0A0A` | Primary background (hero) |
| `surface-1` | `#0D0D0A` | Section 2 background |
| `surface-2` | `#0F0F0C` | Section 3 background |
| `surface-3` | `#111111` | Section 4 background |
| `surface-4` | `#131313` | Section 5 background (most resolved) |
| `text-primary` | `#FFFFFF` | Headlines |
| `text-secondary` | `rgba(255,255,255,0.35)` | Body, mono text |
| `scanline` | `rgba(255,220,0,0.02)` | Repeating horizontal texture overlay |

### Typography

- **Display/Headlines**: Bold italic variable font (Space Grotesk or similar with strong italic). Tight letter-spacing (-1.5px to -3px). Used for impact statements.
- **Body/System**: JetBrains Mono. Small size (11-13px), wide letter-spacing. Used for descriptions, labels, navigation.
- **Section markers**: `[ 001 ]` format in mono, wahala-yellow at low opacity (0.3-0.4). Always top-right of section.
- **Hand-drawn moments**: Slight rotation on wordmark, SVG scrawl underlines on key phrases. Imperfection as accent, not system.

### Texture

- Full-page scanline overlay: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,220,0,0.02) 2px, rgba(255,220,0,0.02) 4px)`
- Opacity decreases from 100% in hero to near-invisible by contact section
- Gives CRT/digital feel without overwhelming content

## Page Structure

Single continuous scroll. Five sections. Background subtly lightens section-to-section. All properties (rotation, opacity, spacing, glow) interpolate from chaos to calm based on scroll position.

### Section 1 — Hero / WAHALA Moment `[ 001 ]`

- **Energy**: Maximum chaos
- **Visual**: Multiple overlapping "WAHALA" text at different sizes, rotations, and opacities. Fragmented, layered. The wordmark assembles from these fragments.
- **Copy**: "WAHALA.studio" + `// creative chaos — resolved`
- **Animation**: Text fragments drift at different parallax rates. Glow pulses subtly. Maximum scanline visibility.
- **Background**: `#0A0A0A`

### Section 2 — Who We Are `[ 002 ]`

- **Energy**: Still chaotic but gaining direction
- **Visual**: Typography slightly rotated but readable. Compact — one or two lines.
- **Copy**: "Ragtag group of creative mavericks." / "Once wahala dey — WAHALA.studio go arrange am."
- **Animation**: Text rotation eases toward 0deg through this section. Pidgin voice hits here.
- **Background**: `#0D0D0A`

### Section 3 — How We Work `[ 003 ]`

- **Energy**: Midpoint — chaos transitioning to structure
- **Visual**: Timeline from "WAHALA DAY" (left, glowing, chaotic) → "CHILLO MODE" (right, calm, dimmer). Connecting line animates with scroll.
- **Copy**: Minimal labels. The visual IS the explanation.
- **Animation**: Elements start snapping to grid. Rotation hits zero. Spacing normalizes. Most visible transformation point.
- **Background**: `#0F0F0C`

### Section 4 — Work `[ 004 ]`

- **Energy**: Calm, structured, confident
- **Visual**: Clean grid of project cards. Hover reveals details. Grid implies capacity even with limited projects.
- **Copy**: "Selected work" — understated
- **Animation**: Stable. No drift or rotation. Grid is the proof that chaos was resolved.
- **Background**: `#111111`

### Section 5 — Contact `[ 005 ]`

- **Energy**: Chillo mode — serene, resolved
- **Visual**: Minimal. Email, socials, a short line. Soft `● chillo` indicator.
- **Copy**: Direct email link. No form.
- **Animation**: Scanlines faded to near-invisible. Yellow at its softest. Everything breathes.
- **Background**: `#131313`

### Fixed Elements (always visible)

- **Section indicator**: `[ 00X ]` top-right corner, updates on scroll position
- **Progress bar**: 3-5 segmented yellow dashes showing overall scroll progress

## Animation System

### Approach: Scroll-Scrubbed Properties

Every animated property is tied directly to scroll position via GSAP ScrollTrigger with `scrub: true`. The user controls the transformation speed — the page is a timeline they scrub through.

### Global interpolations (0% → 100% scroll):

- Background color: `#0A0A0A` → `#131313`
- Scanline opacity: `1` → `0.1`
- Yellow glow intensity: `30px blur` → `0px blur`
- Overall text rotation: `-1.5deg` → `0deg`
- Letter-spacing: `-3px` → `normal`

### Per-section animations:

- Hero fragments: opacity and position scatter → converge
- Section 2 text: rotation -0.5deg → 0deg
- Section 3 timeline: connecting line draws left-to-right
- Section 4 grid cards: fade in from low opacity as section enters viewport
- Section 5: minimal — just a soft opacity entrance

### Performance considerations:

- Use `will-change` on animated properties
- Prefer `transform` and `opacity` (GPU-composited)
- Avoid animating layout properties (width, height, margin)
- GSAP ScrollTrigger handles debouncing

## Technical Architecture

### Framework & Stack

- **Framework**: Next.js (App Router)
- **Animation**: GSAP + ScrollTrigger
- **Styling**: Tailwind CSS (for utility) + CSS custom properties (for design tokens)
- **Fonts**: Space Grotesk (variable, display) + JetBrains Mono (mono)
- **Deploy**: Vercel

### File Structure

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

### Component Architecture

Each section is a self-contained component with:
- Its own GSAP timeline definition
- Ref-based element targeting for animations
- Props interface (for future flexibility / CMS integration)

This structure allows individual sections to become pages later (the v2 multi-page breakout) without rewriting animation logic.

### What's NOT in v1

- No CMS or dynamic content
- No routing beyond single page
- No contact form (email link only)
- No blog
- No analytics (can add later)
- No dark/light mode toggle (it's always dark)

## Assets Needed

- Space Grotesk font (Google Fonts or self-hosted variable)
- JetBrains Mono font (Google Fonts or self-hosted)
- SVG scrawl underline (1-2 hand-drawn path variations)
- Favicon: simplified WAHALA "W" glyph in yellow on black, or the full wordmark at small size
- OG image: hero section rendered as static image for social sharing

## Success Criteria

- The scroll experience communicates "chaos → resolution" without reading a single word
- Typography, color, and motion work together — no element feels disconnected
- Performance: 60fps scroll animation on modern hardware
- The site works as the first portfolio piece — it demonstrates what WAHALA.studio does
- Mobile: simplified animations (reduce parallax layers, maintain color narrative)
