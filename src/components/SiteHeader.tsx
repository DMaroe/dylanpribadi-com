"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "What I Know" },
  { href: "/contact", label: "Contact Me" },
] as const;

// Keep in sync with the .closing exit transition durations in the CSS.
const CLOSE_ANIMATION_MS = 220;

export function SiteHeader({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const requestClose = () => {
    if (reducedMotion) {
      setOpen(false);
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_ANIMATION_MS);
  };

  // Escape-to-close and a scroll lock while the drawer is open — same pattern
  // used by ProjectModal.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Route changes (i.e. clicking a nav link) should close the drawer instantly.
  useEffect(() => {
    setOpen(false);
    setClosing(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>
          {name}
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? `${styles.link} ${styles.active}` : styles.link}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && <span className={styles.underline} />}
                </Link>
              );
            })}
          </nav>
          <div className={styles.desktopToggle}>
            <ThemeToggle />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`${styles.overlay} ${closing ? styles.closing : ""}`}
          onClick={requestClose}
        >
          <div
            id="mobile-nav"
            className={`${styles.drawer} ${closing ? styles.closing : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <ThemeToggle />
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close menu"
                onClick={requestClose}
              >
                ✕
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {NAV.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? `${styles.drawerLink} ${styles.drawerLinkActive}`
                        : styles.drawerLink
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
