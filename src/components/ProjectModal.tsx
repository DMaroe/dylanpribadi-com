"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./ProjectModal.module.css";

// Keep in sync with the .closing exit transition durations below.
const CLOSE_ANIMATION_MS = 220;

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const reducedMotion = useReducedMotion();

  // Plays the exit transition before actually closing (which unmounts this
  // component), instead of cutting the modal out instantly.
  const requestClose = () => {
    if (reducedMotion) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, CLOSE_ANIMATION_MS);
  };

  // The design closes on Escape; focus handling and the scroll lock are added
  // here because a dialog that traps neither is only half-built.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lede = project.modal_summary ?? project.summary;

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ""}`}
      onClick={requestClose}
    >
      <article
        className={`${styles.dialog} ${closing ? styles.closing : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className={styles.close}
        >
          ✕
        </button>

        <div className={`shot ${styles.hero}`}>
          <span className="shotLabel">Hero shot — {project.title}</span>
        </div>

        <div className={styles.body}>
          <p className={styles.meta}>
            {project.role} · {project.year}
          </p>
          <h2 id="project-modal-title" className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.lede}>{lede}</p>
          {project.detail && <p className={styles.detail}>{project.detail}</p>}

          <div className={`tagRow ${styles.tags}`}>
            {project.tags.map((tag) => (
              <span key={tag.name} className={`tag ${styles.modalTag}`}>
                {tag.name}
              </span>
            ))}
          </div>

          <div className={styles.screens}>
            <div className={`shot ${styles.screen}`}>
              <span className={styles.screenLabel}>Screen 1</span>
            </div>
            <div className={`shot ${styles.screen}`}>
              <span className={styles.screenLabel}>Screen 2</span>
            </div>
            <div className={`shot ${styles.screen}`}>
              <span className={styles.play}>▶</span>
              <span className={styles.screenLabel}>Demo video</span>
            </div>
          </div>

          <div className={styles.actions}>
            <a href={project.link_url ?? "#"} className="pill pillPrimary">
              Visit project ›
            </a>
            <a href={project.repo_url ?? "#"} className="pill pillGhost">
              Source code
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
