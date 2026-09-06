import { Fragment } from "react";

/**
 * Several strings in the design carry a deliberate line break (the hero
 * headline, the fact values). They're stored with newlines and rendered as
 * <br> here rather than as HTML in the database.
 */
export function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
