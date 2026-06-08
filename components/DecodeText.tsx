"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Same glyph alphabet as the wordmark's chaos vocabulary.
const NOISE = "WAHL∆∂Ω∑#@!*?";

type Props = {
  /** The resolved text the decode settles on. */
  text: string;
  /** Total decode time, ms. */
  duration?: number;
  /** How fast unlocked glyphs flicker, ms between cycles. */
  cycleMs?: number;
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/*
 * One-shot "decode" intro: on mount the text starts fully scrambled and locks
 * in left→right, settling on `text`, then stops. Every glyph — including the
 * first — scrambles for a real share of the run (a glyph locks only once the
 * eased reveal passes its slot), so nothing settles instantly.
 *
 * SSR-safe — the first render returns the plain text (so hydration matches the
 * server), and a layout effect flushes the first scrambled frame before the
 * browser paints, so the resolved text never flashes first. Respects
 * prefers-reduced-motion.
 */
export default function DecodeText({ text, duration = 5000, cycleMs = 55 }: Props) {
  const [output, setOutput] = useState(text);
  const startedRef = useRef(false);

  useLayoutEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setOutput(text);
      return;
    }

    const len = text.length;
    const cache = text.split("");
    const randGlyph = () => NOISE[Math.floor(Math.random() * NOISE.length)];

    // Synchronous fully-scrambled first frame (before first paint).
    for (let i = 0; i < len; i++) cache[i] = randGlyph();
    setOutput(cache.join(""));

    let raf = 0;
    let start = 0;
    let lastCycle = 0;

    const frame = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const reveal = easeInOutCubic(p);
      const cycle = now - lastCycle >= cycleMs;
      if (cycle) lastCycle = now;

      let s = "";
      for (let i = 0; i < len; i++) {
        // A glyph locks only once the reveal passes its slot, so the first
        // glyph (W) keeps scrambling until reveal ≥ 1/len rather than instantly.
        if ((i + 1) / len <= reveal) {
          s += text[i];
        } else {
          if (cycle) cache[i] = randGlyph();
          s += cache[i];
        }
      }
      setOutput(s);

      if (p < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setOutput(text);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, cycleMs]);

  return <>{output}</>;
}
