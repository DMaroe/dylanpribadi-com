import { listProjects } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const featured = new URL(request.url).searchParams.get("featured") === "1";
  const projects = await listProjects(featured ? { featured: true } : {});

  return Response.json(
    { projects },
    { headers: { "cache-control": "public, max-age=0, s-maxage=60" } },
  );
}
