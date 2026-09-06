import type { Project } from "@/lib/types";
import styles from "./ProjectCard.module.css";

/**
 * Rendered as a <button> rather than the design's clickable <article>: the whole
 * card opens the modal and contains no other interactive content, so a button is
 * the honest element and gets keyboard and screen-reader behaviour for free.
 */
export function ProjectCard({
  project,
  variant,
  onOpen,
}: {
  project: Project;
  variant: "home" | "full";
  onOpen: () => void;
}) {
  const isHome = variant === "home";
  const summary = isHome ? (project.home_summary ?? project.summary) : project.summary;
  const cardTags = project.tags.filter((t) => t.on_card === 1);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={isHome ? `${styles.card} ${styles.cardHome}` : styles.card}
      aria-label={`Open details for ${project.title}`}
    >
      <div className={isHome ? `shot ${styles.shotHome}` : `shot ${styles.shotFull}`}>
        <span className="shotLabel">Project shot</span>
      </div>
      <div className={isHome ? styles.bodyHome : styles.bodyFull}>
        <h3 className={isHome ? styles.titleHome : styles.titleFull}>{project.title}</h3>
        {!isHome && <p className={styles.role}>{project.role}</p>}
        <p className={styles.summary}>{summary}</p>
        <div className="tagRow">
          {cardTags.map((tag) => (
            <span key={tag.name} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
