"use client";

import type { Remaining } from "@/lib/useCountdown";
import GlitchNum from "./GlitchNum";

type Props = {
  countdown: Remaining;
  chaos: number;
  size?: "huge" | "medium";
};

export default function Countdown({ countdown, chaos, size = "huge" }: Props) {
  const { days, hours, minutes, seconds } = countdown;
  return (
    <div className={`countdown ${size}`}>
      <span className="unit-pair">
        <GlitchNum value={days} digits={3} chaos={chaos} />
        <span className="unit">D</span>
      </span>
      <span className="unit-pair">
        <GlitchNum value={hours} digits={2} chaos={chaos * 0.85} />
        <span className="unit">H</span>
      </span>
      <span className="unit-pair">
        <GlitchNum value={minutes} digits={2} chaos={chaos * 0.7} />
        <span className="unit">M</span>
      </span>
      <span className="unit-pair">
        <GlitchNum value={seconds} digits={2} chaos={chaos * 0.55} />
        <span className="unit">S</span>
      </span>
    </div>
  );
}
