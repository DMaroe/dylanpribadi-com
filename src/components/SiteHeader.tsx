"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "What I Know" },
  { href: "/contact", label: "Contact Me" },
] as const;

export function SiteHeader({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>
          {name}
        </Link>
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
      </div>
    </header>
  );
}
