"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TypingHeadline } from "./TypingHeadline";
import styles from "./HeroStage.module.css";

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export function HeroStage({
  children,
  photoAlt = "",
}: {
  children: React.ReactNode;
  photoAlt?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.style.setProperty("--progress", "1");
      content.style.pointerEvents = "auto";
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const distance = rect.height * 0.6;
      const raw = distance > 0 ? -rect.top / distance : 0;
      const progress = easeOutCubic(Math.min(1, Math.max(0, raw)));
      section.style.setProperty("--progress", `${progress}`);
      content.style.pointerEvents = progress > 0.5 ? "auto" : "none";
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.stage}>
      <div className={styles.photoLayer} aria-hidden="true">
        <Image
          src="/images/hero-bg2.png"
          alt={photoAlt}
          fill
          className={styles.image}
          style={{ objectFit: "cover" }}
          preload
        />
        <div className={styles.scrim} />
        <div className={styles.typingWrap}>
          <TypingHeadline />
        </div>
      </div>
      <div ref={contentRef} className={styles.content} style={{ pointerEvents: "none" }}>
        {children}
      </div>
    </div>
  );
}
