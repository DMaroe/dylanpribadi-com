import type { Metadata } from "next";
import { listSocialLinks, requireProfile } from "@/lib/db";
import styles from "./contact.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Contract work, full-time roles, or a second opinion on a gnarly interface — send it over.",
};

export default async function ContactPage() {
  const [profile, socials] = await Promise.all([requireProfile(), listSocialLinks()]);

  return (
    <main className={`page ${styles.main}`}>
      <p className={styles.availability}>{profile.availability}</p>
      <h1 className={styles.title}>Contact me.</h1>
      <p className={styles.intro}>{profile.contact_intro}</p>

      <div className={styles.cards}>
        <a href={`mailto:${profile.email}`} className={`${styles.card} ${styles.cardEmail}`}>
          <span className={styles.cardLabelEmail}>Email</span>
          <span className={styles.cardAction}>Send a mail ›</span>
          <span className={styles.cardValueEmail}>{profile.email}</span>
        </a>

        {profile.whatsapp_url && (
          <a
            href={profile.whatsapp_url}
            className={`${styles.card} ${styles.cardWhatsapp}`}
          >
            <span className={styles.cardLabelWhatsapp}>WhatsApp</span>
            <span className={styles.cardAction}>Message me ›</span>
            <span className={styles.cardValueWhatsapp}>{profile.whatsapp_number}</span>
          </a>
        )}
      </div>

      <div className={styles.elsewhere}>
        <span className={styles.elsewhereLabel}>Elsewhere</span>
        {socials.map((link) => (
          <a key={link.id} href={link.url} className={styles.elsewhereLink}>
            {link.label}
          </a>
        ))}
      </div>
    </main>
  );
}
