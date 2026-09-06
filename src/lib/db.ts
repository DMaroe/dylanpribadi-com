import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  Experience,
  Fact,
  Profile,
  Project,
  ProjectTag,
  Skill,
  SkillCategory,
  SocialLink,
} from "./types";

/** D1 binding for request-time (dynamic) rendering. */
function getDb(): D1Database {
  return getCloudflareContext().env.DB;
}

/**
 * Projects are stored normalized, so tags arrive as a separate result set and
 * get stitched on here — one query per table rather than N+1 per project.
 */
async function attachTags(db: D1Database, projects: ProjectRow[]): Promise<Project[]> {
  if (projects.length === 0) return [];

  const placeholders = projects.map(() => "?").join(", ");
  const { results } = await db
    .prepare(
      `SELECT pt.project_id, t.name, pt.on_card, pt.sort_order
         FROM project_tags pt
         JOIN tags t ON t.id = pt.tag_id
        WHERE pt.project_id IN (${placeholders})
        ORDER BY pt.sort_order`,
    )
    .bind(...projects.map((p) => p.id))
    .all<ProjectTag & { project_id: number }>();

  const byProject = new Map<number, ProjectTag[]>();
  for (const row of results) {
    const list = byProject.get(row.project_id) ?? [];
    list.push({ name: row.name, on_card: row.on_card, sort_order: row.sort_order });
    byProject.set(row.project_id, list);
  }

  return projects.map((p) => ({ ...p, tags: byProject.get(p.id) ?? [] }));
}

type ProjectRow = Omit<Project, "tags">;

export async function getProfile(): Promise<Profile | null> {
  return getDb().prepare("SELECT * FROM profile WHERE id = 1").first<Profile>();
}

/**
 * Profile is the one row every page depends on, and its absence always means
 * the same thing: migrations haven't been applied. Say so rather than letting a
 * null propagate into an unreadable render error.
 */
export async function requireProfile(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) {
    throw new Error(
      "No profile row found in D1. Run `npm run db:migrate:local` to apply migrations and seed content.",
    );
  }
  return profile;
}

export async function listFacts(): Promise<Fact[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM facts ORDER BY sort_order")
    .all<Fact>();
  return results;
}

export async function listProjects(options: { featured?: boolean } = {}): Promise<Project[]> {
  const db = getDb();
  const stmt = options.featured
    ? db.prepare("SELECT * FROM projects WHERE featured = 1 ORDER BY sort_order")
    : db.prepare("SELECT * FROM projects ORDER BY sort_order");
  const { results } = await stmt.all<ProjectRow>();
  return attachTags(db, results);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM projects WHERE slug = ?")
    .bind(slug)
    .first<ProjectRow>();
  if (!row) return null;
  const [project] = await attachTags(db, [row]);
  return project;
}

export async function listSkills(category?: SkillCategory): Promise<Skill[]> {
  const db = getDb();
  const stmt = category
    ? db.prepare("SELECT * FROM skills WHERE category = ? ORDER BY sort_order").bind(category)
    : db.prepare("SELECT * FROM skills ORDER BY category, sort_order");
  const { results } = await stmt.all<Skill>();
  return results;
}

export async function listExperience(): Promise<Experience[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM experience ORDER BY sort_order")
    .all<Experience>();
  return results;
}

export async function listSocialLinks(): Promise<SocialLink[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM social_links ORDER BY sort_order")
    .all<SocialLink>();
  return results;
}
