"use client";

import { useChaos } from "@/lib/chaos-store";
import { useCountdown } from "@/lib/useCountdown";
import { launch } from "@/lib/tokens";
import Countdown from "../Countdown";

type Ghost = {
  dx: number;
  dy: number;
  rot: number;
  scale: number;
  op: number;
};

const GHOSTS: Ghost[] = [
  { dx: -22, dy: -10, rot: 6, scale: 0.75, op: 0.12 },
  { dx: 18, dy: 14, rot: -7, scale: 0.55, op: 0.18 },
  { dx: -8, dy: 22, rot: 3, scale: 0.85, op: 0.1 },
  { dx: 12, dy: -18, rot: -4, scale: 0.65, op: 0.16 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Hero() {
  const { chaos } = useChaos();
  const countdown = useCountdown(launch.iso);

  return (
    <section className="surface hero">
      <div
        className="wordmark-stack"
        style={{ position: "relative", height: "1em", display: "flex", justifyContent: "center" }}
      >
        {GHOSTS.map((g, i) => (
          <div
            key={i}
            className="wordmark ghost"
            style={{
              transform: `translate(${g.dx * chaos}vw, ${g.dy * chaos * 0.4}vh) rotate(${g.rot * chaos}deg) scale(${lerp(1, g.scale, chaos)})`,
              opacity: g.op * chaos,
              mixBlendMode: "screen",
            }}
          >
            WAHALA
          </div>
        ))}

        <div
          className="wordmark primary"
          style={{
            transform: `rotate(${-1.5 * chaos}deg)`,
          }}
        >
          WAHALA
          <span className="studio-tag">.STUDIO &nbsp;/&nbsp; TORONTO</span>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="transmission">
          <span className="pulse-dot" />
          INCOMING TRANSMISSION
          <br />
          ETA — {launch.label.toUpperCase()}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Countdown countdown={countdown} chaos={chaos} size="huge" />
        </div>

        <div className="scroll-cue">
          <span>SCROLL TO RESOLVE</span>
          <span className="line" />
          <span className="arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
