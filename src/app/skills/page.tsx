import type { Metadata } from "next";
import { listExperience, listSkills } from "@/lib/db";
import styles from "./skills.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What I Know",
  description:
    "What I reach for day to day, and the skills I'll claim in an interview — each one backed by the work that earned it.",
};

export default async function SkillsPage() {
  const [tools, receipts, experience] = await Promise.all([
    listSkills("tool"),
    listSkills("receipt"),
    listExperience(),
  ]);

  return (
    <main className={`container page ${styles.main}`}>
      <h1 className="pageTitle">What I know.</h1>
      <p className={`pageIntro ${styles.intro}`}>
        What I reach for day to day, and the skills I&rsquo;ll claim in an interview —
        each one backed by the work that earned it.
      </p>

      <section className={styles.toolsSection}>
        <h2 className={styles.heading}>Tools</h2>
        <div className={styles.chips}>
          {tools.map((tool) => (
            <span key={tool.id} className={styles.chip}>
              {tool.name}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.receiptsSection}>
        <h2 className={styles.headingTight}>Skills, with receipts</h2>
        <p className={styles.receiptsNote}>
          Each one is something I have actually shipped and can talk through in detail.
        </p>
        <div className={styles.receiptGrid}>
          {receipts.map((skill) => (
            <div key={skill.id} className={styles.receipt}>
              <h3 className={styles.receiptTitle}>{skill.name}</h3>
              <p className={styles.receiptBody}>{skill.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.headingExperience}>Experience</h2>
        <ol className={styles.timeline}>
          {experience.map((role, i) => (
            <li
              key={role.id}
              className={
                i === experience.length - 1
                  ? `${styles.entry} ${styles.entryLast}`
                  : styles.entry
              }
            >
              <div className={styles.entryHead}>
                <h3 className={styles.entryTitle}>
                  {role.role} · {role.company}
                </h3>
                <span className={styles.entryPeriod}>{role.period}</span>
              </div>
              <p className={styles.entryBody}>{role.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
