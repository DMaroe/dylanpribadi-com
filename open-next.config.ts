import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override: every page reads from D1 per request and the
// dataset is small enough that an R2/KV cache layer would only add moving parts.
export default defineCloudflareConfig({});
