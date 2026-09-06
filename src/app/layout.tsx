import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { requireProfile } from "@/lib/db";

// Every page reads from D1 at request time.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await requireProfile();
  return {
    title: { default: profile.name, template: `%s · ${profile.name}` },
    description: profile.hero_subhead,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await requireProfile();

  return (
    <html lang="en">
      <body>
        <div className="shell">
          <SiteHeader name={profile.name} />
          {children}
          <SiteFooter name={profile.name} note={profile.footer_note} />
        </div>
      </body>
    </html>
  );
}
