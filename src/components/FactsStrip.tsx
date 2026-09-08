"use client";

import type { CSSProperties } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { Fact } from "@/lib/types";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useReveal } from "@/lib/useReveal";
import { Lines } from "./Lines";
import styles from "@/app/home.module.css";

const COUNT_MS = 900;

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

/**
 * Facts whose first line opens with a number (e.g. "4+ years") count up from
 * zero on reveal instead of just appearing. Everything else renders as plain
 * `Lines`. The delay lets each fact's count start alongside its own
 * stagger-in rather than all at once.
 */
function AnimatedFactValue({
  text,
  visible,
  delay,
}: {
  text: string;
  visible: boolean;
  delay: number;
}) {
  const reducedMotion = useReducedMotion();
  const [firstLine, ...restLines] = text.split("\n");
  const match = firstLine.match(/^\d+/);
  const target = match ? Number(match[0]) : null;
  const suffix = match ? firstLine.slice(match[0].length) : "";

  const [count, setCount] = useState(target === null || reducedMotion ? (target ?? 0) : 0);
  const started = useRef(false);

  useEffect(() => {
    if (target === null || reducedMotion || !visible || started.current) return;
    started.current = true;

    let raf: number;
    let startTime: number;
    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        if (startTime === undefined) startTime = now;
        const progress = Math.min(1, (now - startTime) / COUNT_MS);
        setCount(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, reducedMotion, visible, delay]);

  if (target === null) return <Lines text={text} />;

  return (
    <>
      {count}
      {suffix}
      {restLines.map((line, i) => (
        <Fragment key={i}>
          <br />
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function FactsStrip({ facts }: { facts: Fact[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="container">
      <div ref={ref} className={styles.facts}>
        {facts.map((fact, i) => (
          <div
            key={fact.id}
            className={`reveal ${visible ? "visible" : ""}`}
            style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
          >
            <p className={styles.factLabel}>{fact.label}</p>
            <p className={styles.factValue}>
              <AnimatedFactValue text={fact.value} visible={visible} delay={i * 70} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
