"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";
import styles from "./ProjectGrid.module.css";

/**
 * The design opens project detail in a modal rather than on its own route, and
 * uses the same grid on the home page (three featured, compact cards) and the
 * projects page (all six, taller cards with a role line). Which project is open
 * lives in the `project` query param (shallow — no server round-trip) rather
 * than component state, so the modal is linkable, survives a refresh, and
 * closes on browser back.
 */
export function ProjectGrid({
  projects,
  variant,
}: {
  projects: Project[];
  variant: "home" | "full";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openSlug = searchParams.get("project");
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  const openProject = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeProject = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("project");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className={variant === "home" ? styles.gridHome : styles.gridFull}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <ProjectCard
              project={project}
              variant={variant}
              onOpen={() => openProject(project.slug)}
            />
          </Reveal>
        ))}
      </div>
      {open && <ProjectModal project={open} onClose={closeProject} />}
    </>
  );
}
