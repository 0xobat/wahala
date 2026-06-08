"use client";

import { useEffect } from "react";
import { initGlobalTimeline } from "@/lib/animations";

export default function GlobalAnimations() {
  useEffect(() => {
    const cleanup = initGlobalTimeline();
    return cleanup;
  }, []);

  return null;
}
