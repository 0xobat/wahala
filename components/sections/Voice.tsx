"use client";

import { useChaos } from "@/lib/chaos-store";

const TAGLINE = "Got a big problem to solve?";
const ANSWER = "No Wahala";

export default function Voice() {
  const { chaos } = useChaos();

  return (
    <section className="surface voice">
      <div className="voice-inner">
        <div>
          <div
            style={{
              marginBottom: 24,
              color: "var(--primary)",
              opacity: 0.6,
              letterSpacing: "0.18em",
              fontSize: 11,
              textTransform: "uppercase",
            }}
          >
            // THE QUESTION
          </div>
          <h1 className="question">{TAGLINE}</h1>
          <h2
            className="answer"
            style={{
              transform: `rotate(${-1.5 * chaos * 0.4}deg)`,
              transformOrigin: "left center",
            }}
          >
            {ANSWER}
            <span className="dot">.</span>
          </h2>
        </div>

        <div className="meta">
          <div className="col">
            <h6>/ Pidgin</h6>
            <p>
              <em>Once wahala dey, WAHALA.studio go arrange am.</em>
            </p>
          </div>
          <div className="col">
            <h6>/ English</h6>
            <p>
              We exist to solve your problems. A Toronto creative studio with Lagos energy — translating chaos into work that <em>resolves</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
