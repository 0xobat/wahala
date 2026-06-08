"use client";

import { useChaos } from "@/lib/chaos-store";
import { useCountdown } from "@/lib/useCountdown";
import { launch } from "@/lib/tokens";
import Countdown from "../Countdown";
import DecodeText from "../DecodeText";

export default function Hero() {
  const { chaos } = useChaos();
  const countdown = useCountdown(launch.iso);

  return (
    <section className="surface hero">
      <div
        className="wordmark-stack"
        style={{ position: "relative", height: "1em", display: "flex", justifyContent: "center" }}
      >
        <div
          className="wordmark primary"
          style={{
            transform: `rotate(${-1.5 * chaos}deg)`,
          }}
        >
          <DecodeText text="WAHALA" />
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
          <Countdown countdown={countdown} size="huge" decodeMs={7000} accent />
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
