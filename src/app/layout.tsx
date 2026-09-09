import type { Metadata } from "next";
import "./globals.css";
import { InlineScript } from "@/components/InlineScript";
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

// Runs synchronously while the browser parses the HTML, so the theme is on
// <html> before the first paint. Falls back to the OS preference on a first
// visit, and to the dark default if localStorage is unavailable.
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await requireProfile();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <InlineScript html={THEME_SCRIPT} />
      </head>
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
