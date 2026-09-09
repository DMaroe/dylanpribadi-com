"use client";

/**
 * Renders an inline script the browser executes while parsing the HTML, before
 * first paint. The server emits it as executable JavaScript; on the client it
 * renders as inert text/plain, which is what stops React's dev-only warning
 * about script tags inside components (the script has already run by then, and
 * scripts inserted during hydration never execute anyway).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
