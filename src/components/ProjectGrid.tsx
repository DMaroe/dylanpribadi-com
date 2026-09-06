"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import styles from "./ProjectGrid.module.css";

/**
 * The design opens project detail in a modal rather than on its own route, and
 * uses the same grid on the home page (three featured, compact cards) and the
 * projects page (all six, taller cards with a role line).
 */
export function ProjectGrid({
  projects,
  variant,
}: {
  projects: Project[];
  variant: "home" | "full";
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <>
      <div className={variant === "home" ? styles.gridHome : styles.gridFull}>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant={variant}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpenSlug(null)} />}
    </>
  );
}
