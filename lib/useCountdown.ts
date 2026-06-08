"use client";

import { useEffect, useMemo, useState } from "react";

export type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calc(targetMs: number): Remaining {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const ZERO: Remaining = { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(targetISO: string): Remaining {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  // Seed with a deterministic zero so SSR and the first client render match;
  // calc() (which reads Date.now()) only runs after mount, in the effect below.
  const [t, setT] = useState<Remaining>(ZERO);
  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}
