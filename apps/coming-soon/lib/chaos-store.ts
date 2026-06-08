/*
 * Single source of truth for scroll-driven `chaos` (1 at top → 0 at bottom)
 * and `sectionIdx` (0..3). GSAP ScrollTrigger writes here; React components
 * subscribe via useChaos(). Avoids drift between CSS-var animation and
 * React-state-driven JSX calculations.
 */

import { useSyncExternalStore } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();

const state = {
  chaos: 1,
  sectionIdx: 0,
};

let snapshot = { ...state };

function emit() {
  snapshot = { ...state };
  listeners.forEach((l) => l());
}

export function setChaos(chaos: number, sectionIdx: number) {
  if (chaos === state.chaos && sectionIdx === state.sectionIdx) return;
  state.chaos = chaos;
  state.sectionIdx = sectionIdx;
  emit();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

const SERVER_SNAPSHOT = { chaos: 1, sectionIdx: 0 };
function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function useChaos() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
