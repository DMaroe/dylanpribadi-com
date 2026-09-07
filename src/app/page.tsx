import Link from "next/link";
import { HeroStage } from "@/components/HeroStage";
import { Lines } from "@/components/Lines";
import { ProjectGrid } from "@/components/ProjectGrid";
import { listFacts, listProjects, listSkills, requireProfile } from "@/lib/db";
import styles from "./home.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, facts, featured, toolkit] = await Promise.all([
    requireProfile(),
    listFacts(),
    listProjects({ featured: true }),
    listSkills("toolkit"),
  ]);

  return (
    <main className="page">
      <HeroStage photoAlt={`${profile.name} — LinkedIn background`}>
        <section className={`container ${styles.hero}`}>
          <p className={styles.eyebrow}>{profile.hero_eyebrow}</p>
          <h1 className={styles.headline}>
            <Lines text={profile.hero_headline} />
          </h1>
          <p className={styles.subhead}>{profile.hero_subhead}</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="pill pillPrimary">
              Contact me
            </Link>
            <Link href="/projects" className="pill pillGhost">
              See projects
            </Link>
          </div>
        </section>
      </HeroStage>

      <section className="container">
        <div className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.id}>
              <p className={styles.factLabel}>{fact.label}</p>
              <p className={styles.factValue}>
                <Lines text={fact.value} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.block}`}>
        <div className={styles.blockHead}>
          <h2 className="sectionHeading">Selected work.</h2>
          <Link href="/projects" className={styles.allLink}>
            All projects ›
          </Link>
        </div>
        <ProjectGrid projects={featured} variant="home" />
      </section>

      <section className={`container ${styles.block}`}>
        <h2 className={`sectionHeading ${styles.toolkitHeading}`}>Toolkit.</h2>
        <div className={styles.toolkit}>
          {toolkit.map((skill) => (
            <span key={skill.id} className={styles.toolkitChip}>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className={`container ${styles.ctaWrap}`}>
        <div className={styles.cta}>
          <h2 className={styles.ctaHeading}>
            <Lines text={profile.cta_heading} />
          </h2>
          <p className={styles.ctaNote}>{profile.cta_note}</p>
          <Link href="/contact" className={`pill pillPrimary ${styles.ctaButton}`}>
            Contact me
          </Link>
        </div>
      </section>
    </main>
  );
}
