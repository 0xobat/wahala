"use client";

import { useGlitchTick } from "@/lib/useGlitchTick";

type Props = {
  value: number;
  digits?: number;
  chaos: number;
};

export default function GlitchNum({ value, digits = 2, chaos }: Props) {
  const tick = useGlitchTick(chaos);
  const real = String(value).padStart(digits, "0");
  let display = real;
  if (chaos > 0.03) {
    let s = "";
    for (let i = 0; i < real.length; i++) {
      const positionBias = (i + 1) / real.length;
      s +=
        Math.random() < chaos * positionBias
          ? String(Math.floor(Math.random() * 10))
          : real[i];
    }
    display = s;
  }
  void tick;
  return <span className={`num${chaos > 0.05 ? " glitching" : ""}`}>{display}</span>;
}
