import styles from "./SiteFooter.module.css";

export function SiteFooter({ name, note }: { name: string; note: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.text}>
          Copyright © {year} {name}. All rights reserved.
        </span>
        <span className={styles.text}>{note}</span>
      </div>
    </footer>
  );
}
