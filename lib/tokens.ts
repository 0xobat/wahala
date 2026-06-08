/*
 * Design tokens — mirror of CSS custom properties in app/globals.css.
 * Source of truth for the values: DESIGN.md
 */

export const scrub = {
  rotationStart: -1.5,
  rotationEnd: 0,
  glowBlurStartPx: 30,
  glowBlurEndPx: 0,
  scanlineOpacityStart: 1,
  scanlineOpacityEnd: 0.18,
  bgStart: 0x0a,
  bgEnd: 0x13,
} as const;

export const launch = {
  // Aug 1, 2026, 12:00pm Eastern (−04:00 = EDT, the correct offset for that date).
  iso: "2026-08-01T12:00:00-04:00",
  label: "Summer 2026 / Toronto",
} as const;

export const location = {
  city: "TORONTO, CA",
  coords: "43°39′N 79°23′W",
} as const;

export const SECTIONS = ["001", "002", "003", "004"] as const;
