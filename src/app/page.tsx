import Link from "next/link";
import { FactsStrip } from "@/components/FactsStrip";
import { HeroStage } from "@/components/HeroStage";
import { Lines } from "@/components/Lines";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
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

      <FactsStrip facts={facts} />

      <section className={`container ${styles.block}`}>
        <Reveal>
          <div className={styles.blockHead}>
            <h2 className="sectionHeading">Selected work.</h2>
            <Link href="/projects" className={styles.allLink}>
              All projects ›
            </Link>
          </div>
        </Reveal>
        <ProjectGrid projects={featured} variant="home" />
      </section>

      <section className={`container ${styles.block}`}>
        <Reveal>
          <h2 className={`sectionHeading ${styles.toolkitHeading}`}>Toolkit.</h2>
        </Reveal>
        <div className={styles.toolkit}>
          {toolkit.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 40} className={styles.toolkitChip}>
              {skill.name}
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`container ${styles.ctaWrap}`}>
        <Reveal className={styles.cta}>
          <div className={styles.availabilityBadge}>
            <span className={styles.pulseDot} aria-hidden="true" />
            {profile.availability}
          </div>
          <h2 className={styles.ctaHeading}>
            <Lines text={profile.cta_heading} />
          </h2>
          <p className={styles.ctaNote}>{profile.cta_note}</p>
          <Link href="/contact" className={`pill pillPrimary ${styles.ctaButton}`}>
            Contact me
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
