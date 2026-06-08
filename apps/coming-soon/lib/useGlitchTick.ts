"use client";

import { useEffect, useState } from "react";

/*
 * RAF-driven tick that emits a monotonically-increasing integer at ~`hz`Hz
 * while `intensity > 0.01`. Used by glitch components to re-render and
 * re-randomise their visible characters. Returns 0 when idle.
 */
export function useGlitchTick(intensity: number, hz = 14): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (intensity <= 0.01) {
      setTick(0);
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (ts: number) => {
      if (ts - last > 1000 / hz) {
        last = ts;
        setTick((n) => (n + 1) >>> 0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [intensity, hz]);
  return tick;
}
