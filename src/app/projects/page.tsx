import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { Reveal } from "@/components/Reveal";
import { listProjects } from "@/lib/db";
import { yearValue } from "@/lib/projectYear";
import styles from "./projects.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Six things I built end to end — brief, build, and the part after launch where it has to keep working.",
};

export default async function ProjectsPage() {
  const projects = await listProjects();

  const years = projects.map((p) => yearValue(p.year)).filter((y) => y > 0);
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const yearRange = minYear && maxYear ? (minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`) : null;
  const count = String(projects.length).padStart(2, "0");

  return (
    <main className={`container page ${styles.main}`}>
      <Reveal>
        <p className={styles.kicker}>
          {count} projects{yearRange ? ` · ${yearRange}` : ""}
        </p>
      </Reveal>
      <Reveal delay={70}>
        <h1 className="pageTitle">Projects.</h1>
      </Reveal>
      <Reveal delay={150} className={styles.ruleWrap}>
        <span className={styles.rule} aria-hidden="true" />
      </Reveal>
      <Reveal delay={190}>
        <p className={`pageIntro ${styles.intro}`}>
          Six things I built end to end — brief, build, and the part after launch where it
          has to keep working.
        </p>
      </Reveal>
      <ProjectsBrowser projects={projects} />
    </main>
  );
}
