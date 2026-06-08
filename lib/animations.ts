import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrub, SECTIONS } from "./tokens";
import { setChaos } from "./chaos-store";

let registered = false;

function ensureRegistered() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * Global scroll-scrubbed timeline.
 * Drives :root CSS variables AND publishes `chaos`/`sectionIdx` to the
 * React store so JSX-side calculations (Hero rotation, glitch intensity,
 * section markers) read from the same scroll value.
 */
export function initGlobalTimeline(): () => void {
  ensureRegistered();

  const root = document.documentElement;
  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const chaos = 1 - progress;
      const calm = progress;

      root.style.setProperty("--progress", progress.toFixed(4));
      root.style.setProperty("--chaos", chaos.toFixed(4));
      root.style.setProperty(
        "--rotation",
        `${(scrub.rotationStart * chaos).toFixed(3)}deg`
      );
      root.style.setProperty(
        "--glow-blur",
        `${(scrub.glowBlurStartPx * chaos).toFixed(2)}px`
      );
      root.style.setProperty(
        "--scanline-opacity",
        (scrub.scanlineOpacityEnd + (scrub.scanlineOpacityStart - scrub.scanlineOpacityEnd) * chaos).toFixed(3)
      );

      const v = Math.round(lerp(scrub.bgStart, scrub.bgEnd, calm));
      document.body.style.background = `rgb(${v}, ${v}, ${v})`;

      const sectionIdx = Math.min(SECTIONS.length - 1, Math.floor(progress * SECTIONS.length));
      setChaos(chaos, sectionIdx);
    },
  });

  return () => {
    trigger.kill();
  };
}
