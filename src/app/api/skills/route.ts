import { listSkills } from "@/lib/db";
import type { SkillCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORIES: SkillCategory[] = ["toolkit", "tool", "receipt"];

function isCategory(value: string | null): value is SkillCategory {
  return value !== null && (CATEGORIES as string[]).includes(value);
}

export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get("category");

  if (requested !== null && !isCategory(requested)) {
    return Response.json(
      { error: `Unknown category. Expected one of: ${CATEGORIES.join(", ")}` },
      { status: 400 },
    );
  }

  const skills = await listSkills(isCategory(requested) ? requested : undefined);

  return Response.json(
    { skills },
    { headers: { "cache-control": "public, max-age=0, s-maxage=60" } },
  );
}
