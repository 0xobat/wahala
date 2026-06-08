"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Remaining } from "@/lib/useCountdown";

type Props = {
  countdown: Remaining;
  size?: "huge" | "medium";
  /** If set, digits decode-scramble for this many ms on mount, then tick live. */
  decodeMs?: number;
  /** Render digits in the accent (yellow), both while decoding and once stable. */
  accent?: boolean;
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const GROUPS = [
  { key: "days", width: 3, unit: "D" },
  { key: "hours", width: 2, unit: "H" },
  { key: "minutes", width: 2, unit: "M" },
  { key: "seconds", width: 2, unit: "S" },
] as const;

const TOTAL = GROUPS.reduce((n, g) => n + g.width, 0); // 9 digits, DDD-HH-MM-SS

function realDigits(c: Remaining): string {
  return (
    String(c.days).padStart(3, "0") +
    String(c.hours).padStart(2, "0") +
    String(c.minutes).padStart(2, "0") +
    String(c.seconds).padStart(2, "0")
  );
}

/*
 * The countdown can "decode" like the wordmark: on mount all 9 digits scramble
 * and lock in left→right over `decodeMs`, settling on the live value, then tick
 * normally. Locked digits already follow the real value, so the clock is
 * running underneath as it resolves. Without `decodeMs` it just renders live.
 *
 * Hydration-safe: first render shows the real (deterministic) digits to match
 * the server; a layout effect flushes the scrambled first frame before paint.
 */
export default function Countdown({ countdown, size = "huge", decodeMs, accent }: Props) {
  const real = realDigits(countdown);

  // While decoding, holds the 9-char scrambled string; null = show live `real`.
  const [display, setDisplay] = useState<string | null>(null);
  const realRef = useRef(real);
  realRef.current = real;

  useLayoutEffect(() => {
    if (!decodeMs) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cache = realRef.current.split("");
    const randDigit = () => String(Math.floor(Math.random() * 10));
    for (let i = 0; i < TOTAL; i++) cache[i] = randDigit();
    setDisplay(cache.join("")); // fully-scrambled first frame, before paint

    let raf = 0;
    let start = 0;
    let lastCycle = 0;
    const cycleMs = 55;

    const frame = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / decodeMs);
      const reveal = easeInOutCubic(p);
      const cycle = now - lastCycle >= cycleMs;
      if (cycle) lastCycle = now;

      const target = realRef.current; // live value — locked digits follow it
      let s = "";
      for (let i = 0; i < TOTAL; i++) {
        if ((i + 1) / TOTAL <= reveal) {
          s += target[i];
        } else {
          if (cycle) cache[i] = randDigit();
          s += cache[i];
        }
      }
      setDisplay(s);

      if (p < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setDisplay(null); // decode done → fall back to live `real`
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [decodeMs]);

  const shown = display ?? real;

  let idx = 0;
  const parts = GROUPS.map((g) => {
    const seg = shown.slice(idx, idx + g.width);
    idx += g.width;
    return { ...g, seg };
  });

  return (
    <div className={`countdown ${size}${accent ? " accent" : ""}`}>
      {parts.map((g) => (
        <span className="unit-pair" key={g.key}>
          <span className="num">{g.seg}</span>
          <span className="unit">{g.unit}</span>
        </span>
      ))}
    </div>
  );
}
