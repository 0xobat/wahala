"use client";

import { useGlitchTick } from "@/lib/useGlitchTick";

const NOISE = "WAHL∆∂Ω∑#@!*?";
const REAL = "WAHALA";

export default function GlitchWordmark({ chaos }: { chaos: number }) {
  const tick = useGlitchTick(chaos, 10);
  let s = "";
  for (let i = 0; i < REAL.length; i++) {
    s +=
      Math.random() < chaos * 0.5
        ? NOISE[Math.floor(Math.random() * NOISE.length)]
        : REAL[i];
  }
  void tick;
  return <>{s}</>;
}
