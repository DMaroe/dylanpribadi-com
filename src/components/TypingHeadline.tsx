"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import styles from "./TypingHeadline.module.css";

type Segment = { text: string; bold?: boolean };
type Char = { char: string; bold: boolean };
type Run = { text: string; bold: boolean };

const PHRASES: Segment[][] = [
  [{ text: "Hi, I'm Dylan D. Pribadi and " }, { text: "novelty intrigues me.", bold: true }],
  [{ text: "Learning. Adapting. Thriving.", bold: true }],
];

const TYPE_MS = 42;
const DELETE_MS = 24;
const HOLD_MS = 1800;
const NEXT_DELAY_MS = 300;

function flatten(segments: Segment[]): Char[] {
  return segments.flatMap((segment) =>
    [...segment.text].map((char) => ({ char, bold: Boolean(segment.bold) })),
  );
}

function toRuns(chars: Char[]): Run[] {
  const runs: Run[] = [];
  for (const { char, bold } of chars) {
    const last = runs[runs.length - 1];
    if (last && last.bold === bold) {
      last.text += char;
    } else {
      runs.push({ text: char, bold });
    }
  }
  return runs;
}

const FLAT_PHRASES = PHRASES.map(flatten);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function TypingHeadline() {
  const reducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"typing" | "deleting">("typing");

  const chars = FLAT_PHRASES[phraseIndex];

  useEffect(() => {
    if (reducedMotion) return;

    const timeout = setTimeout(
      () => {
        if (mode === "typing") {
          if (count < chars.length) {
            setCount((c) => c + 1);
          } else {
            setMode("deleting");
          }
        } else {
          if (count > 0) {
            setCount((c) => c - 1);
          } else {
            setPhraseIndex((i) => (i + 1) % FLAT_PHRASES.length);
            setMode("typing");
          }
        }
      },
      mode === "typing"
        ? count < chars.length
          ? TYPE_MS
          : HOLD_MS
        : count > 0
          ? DELETE_MS
          : NEXT_DELAY_MS,
    );

    return () => clearTimeout(timeout);
  }, [mode, count, chars.length, reducedMotion]);

  const visible = reducedMotion ? chars : chars.slice(0, count);
  const runs = useMemo(() => toRuns(visible), [visible]);

  return (
    <p className={styles.typing}>
      {runs.map((run, i) =>
        run.bold ? <strong key={i}>{run.text}</strong> : <span key={i}>{run.text}</span>,
      )}
      {!reducedMotion && <span className={styles.cursor} aria-hidden="true" />}
    </p>
  );
}
