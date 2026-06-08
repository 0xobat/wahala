"use client";

import { useChaos } from "@/lib/chaos-store";
import { SECTIONS, location } from "@/lib/tokens";

export default function Chrome() {
  const { sectionIdx } = useChaos();
  const label = `[ ${SECTIONS[sectionIdx]} ]`;
  return (
    <div className="chrome">
      <div className="section-marker">{label}</div>
      <div className="progress-dashes" aria-hidden="true">
        {SECTIONS.map((_, i) => (
          <div key={i} className={`dash${i <= sectionIdx ? " active" : ""}`} />
        ))}
      </div>
      <div className="top-left">
        <div>
          <span className="dot" />
          TRANSMISSION 0001 / LIVE
        </div>
      </div>
      <div className="bottom-left">
        {location.city}&nbsp;·&nbsp;{location.coords}
      </div>
      <div className="bottom-right">©︎ 2026 WAHALA.STUDIO</div>
    </div>
  );
}
