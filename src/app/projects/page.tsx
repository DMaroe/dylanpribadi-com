import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { listProjects } from "@/lib/db";
import styles from "./projects.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Six things I built end to end — brief, build, and the part after launch where it has to keep working.",
};

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <main className={`container page ${styles.main}`}>
      <h1 className="pageTitle">Projects.</h1>
      <p className={`pageIntro ${styles.intro}`}>
        Six things I built end to end — brief, build, and the part after launch where it
        has to keep working.
      </p>
      <ProjectGrid projects={projects} variant="full" />
    </main>
  );
}
