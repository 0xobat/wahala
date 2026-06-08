"use client";

import { useState } from "react";
import { useCountdown } from "@/lib/useCountdown";
import { launch } from "@/lib/tokens";
import Countdown from "../Countdown";

type State = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Chillo() {
  const countdown = useCountdown(launch.iso);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [helper, setHelper] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting" || state === "done") return;
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setHelper("invalid address — try again.");
      return;
    }
    setState("submitting");
    setHelper("transmitting…");
    // TODO: replace with real submission (e.g. Resend, ConvertKit, etc.)
    setTimeout(() => {
      setState("done");
      setHelper(`✓ seat reserved for ${email.trim()}. driver go pick you up soon.`);
    }, 700);
  };

  return (
    <section className="surface chillo" id="board">
      <div className="chillo-inner">
        <div className="lockup">
          <span className="indicator" />
          <span className="label">
            CHILLO MODE
            <small>SIGNAL ACQUIRED · STANDBY</small>
          </span>
        </div>

        <h1 className="resolved-wordmark">
          WAHALA<span className="studio">.studio</span>
        </h1>

        <Countdown countdown={countdown} size="medium" />

        <div className="signup">
          <div className="prompt">// RESERVE YOUR SEAT — boarding the danfo</div>
          <form onSubmit={submit}>
            <span className="prefix">
              hi@wahala.studio:~$
              <span className="caret" />
            </span>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") {
                  setState("idle");
                  setHelper("");
                }
              }}
              disabled={state === "done"}
              autoComplete="email"
              spellCheck={false}
            />
            <button type="submit" disabled={state === "submitting" || state === "done"}>
              {state === "submitting" ? "…" : state === "done" ? "SENT" : "TRANSMIT"}
            </button>
          </form>
          <div className={`helper${state === "done" ? " success" : ""}`}>
            {helper || `departure — ${launch.label.toLowerCase()}. one email. zero noise.`}
          </div>
        </div>

        <div className="contact">
          <a href="mailto:hi@wahala.studio">
            <h6>/ CONTACT</h6>
            <span className="value">hi@wahala.studio</span>
          </a>
          <a href="https://instagram.com/wahalastudio" target="_blank" rel="noreferrer">
            <h6>/ INSTAGRAM</h6>
            <span className="value">@wahalastudio</span>
          </a>
          <div className="cell">
            <h6>/ STUDIO</h6>
            <span className="value">Toronto, Canada</span>
          </div>
        </div>

        <div className="foot">
          <span>WAHALA.STUDIO — V0.alpha</span>
          <span>BUILT IN TORONTO · 2026</span>
        </div>
      </div>
    </section>
  );
}
