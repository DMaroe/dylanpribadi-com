"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Same resolution order as the inline script in the root layout. */
function storedTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

/**
 * data-theme on <html> is the source of truth: the inline script sets it before
 * first paint and this reads back from it, so the knob (positioned in CSS off
 * that same attribute) is never briefly on the wrong side.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    // React's dev-only Strict Mode remount resets <html> to the attributes it
    // manages from JSX, dropping the one the inline script set. No-op in production.
    document.documentElement.setAttribute("data-theme", storedTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this page.
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label="Light mode"
      title="Toggle light mode"
      className={styles.toggle}
      onClick={toggle}
    >
      <span className={styles.knob} aria-hidden="true" />
    </button>
  );
}
