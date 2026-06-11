// Reads resume.md from disk and returns parsed positions for the site.
// Called by the homepage via useAsyncData; resolved at prerender (generate),
// so the result is baked into the static HTML. `parseResume` is auto-imported
// from server/utils/resume.ts.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineEventHandler(() => {
  const md = readFileSync(resolve(process.cwd(), "resume.md"), "utf8");
  return parseResume(md);
});
