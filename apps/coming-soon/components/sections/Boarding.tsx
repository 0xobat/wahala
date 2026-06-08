"use client";

import { useChaos } from "@/lib/chaos-store";
import Danfo from "../Danfo";

const PASSENGER_TYPES = [
  "designers",
  "developers",
  "writers",
  "directors",
  "musicians",
  "strategists",
] as const;

export default function Boarding() {
  const { chaos } = useChaos();

  return (
    <section className="surface boarding">
      <div className="boarding-inner">
        <div className="boarding-header">
          <div className="boarding-eyebrow">// boarding — the danfo dey pick up</div>
          <h2
            className="boarding-headline"
            style={{ transform: `rotate(${-1.5 * chaos * 0.4}deg)` }}
          >
            Hop on<span className="dot">.</span>
          </h2>
          <div className="boarding-sub">
            <span className="pidgin">If you fit build, fit write, fit dream — enter the danfo.</span>
            <span className="english">
              WAHALA.studio is the bus. Creatives and developers are the passengers. We dey pick up at every stop between idea and resolution.
            </span>
          </div>
        </div>

        <div className="danfo-wrap">
          <Danfo />
        </div>

        <div className="manifest">
          <h6>/ MANIFEST · NOW BOARDING</h6>
          <ul>
            {PASSENGER_TYPES.map((t) => (
              <li key={t}>{t}</li>
            ))}
            <li className="empty">YOU?</li>
          </ul>
        </div>

        <a
          className="boarding-cta"
          href="#board"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("board")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          reserve your seat at the next stop
        </a>
      </div>
    </section>
  );
}
