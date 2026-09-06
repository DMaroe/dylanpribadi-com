import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override: every page reads from D1 per request and the
// dataset is small enough that an R2/KV cache layer would only add moving parts.
// `defineCloudflareConfig` doesn't forward `buildCommand`, so it's added
// separately here. It decouples this from the top-level `build` npm script,
// which runs `opennextjs-cloudflare build` itself — without this, OpenNext's
// default of re-running `npm run build` would recurse infinitely.
export default {
  ...defineCloudflareConfig({}),
  buildCommand: "npm run build:next",
};
