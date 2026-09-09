"use client";

import { useMemo, useState } from "react";
import { yearValue } from "@/lib/projectYear";
import type { Project } from "@/lib/types";
import { ProjectGrid } from "./ProjectGrid";
import styles from "./ProjectsBrowser.module.css";

type SortOrder = "newest" | "oldest";

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [sort, setSort] = useState<SortOrder>("newest");

  const sorted = useMemo(() => {
    const list = [...projects];
    list.sort((a, b) =>
      sort === "newest" ? yearValue(b.year) - yearValue(a.year) : yearValue(a.year) - yearValue(b.year),
    );
    return list;
  }, [projects, sort]);

  return (
    <>
      <div className={styles.sortRow} role="group" aria-label="Sort projects by year">
        <button
          type="button"
          className={`${styles.sortButton} ${sort === "newest" ? styles.active : ""}`}
          aria-pressed={sort === "newest"}
          onClick={() => setSort("newest")}
        >
          Newest
        </button>
        <button
          type="button"
          className={`${styles.sortButton} ${sort === "oldest" ? styles.active : ""}`}
          aria-pressed={sort === "oldest"}
          onClick={() => setSort("oldest")}
        >
          Oldest
        </button>
      </div>
      <ProjectGrid projects={sorted} variant="full" />
    </>
  );
}
