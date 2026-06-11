// Parses resume.md (the single source of truth) into structured data.
// Server-only (Nitro auto-imports this in server/ routes), so `marked` never
// ships to the client. Site-only prose lives in `<!-- site: ... -->` blocks,
// which the PDF build strips and the website renders.

import { marked } from "marked";

marked.setOptions({ breaks: true, gfm: true });
const inline = (s: string) => marked.parseInline(s) as string;
const block = (s: string) => marked.parse(s) as string;

export interface Position {
  title: string;
  company: string;
  dates: string;
  start: string;
  end: string;
  introHtml: string;
  bulletsHtml: string[];
  siteHtml: string | null;
}

export interface EarlierRole {
  html: string;
}

export function parseResume(md: string): {
  positions: Position[];
  earlier: EarlierRole[];
} {
  const main = md.split("<!-- MAIN -->")[1] ?? "";
  const [techPart, earlierPart = ""] = main.split(/^##\s+Earlier Experience\s*$/m);

  // Each `### ` heading starts a position (drop the leading "# Technical Experience").
  const blocks = techPart.split(/^###\s+/m).slice(1);

  const positions: Position[] = blocks.map((blockText) => {
    const lines = blockText.split("\n");
    const heading = (lines.shift() ?? "").trim();
    let rest = lines.join("\n");

    // Pull out the site-only block before parsing bullets/intro.
    let siteHtml: string | null = null;
    const siteMatch = rest.match(/<!--\s*site:([\s\S]*?)-->/i);
    if (siteMatch) {
      siteHtml = block(siteMatch[1].trim());
      rest = rest.replace(siteMatch[0], "");
    }

    // Heading: "Title - Company (dates)"
    const dateMatch = heading.match(/\(([^)]*)\)\s*$/);
    const dates = dateMatch ? dateMatch[1].trim() : "";
    const titleCompany = heading.replace(/\s*\([^)]*\)\s*$/, "").trim();
    const sep = titleCompany.indexOf(" - ");
    const title = sep >= 0 ? titleCompany.slice(0, sep).trim() : titleCompany;
    const company = sep >= 0 ? titleCompany.slice(sep + 3).trim() : "";
    const [start = "", end = ""] = dates.split(" - ").map((s) => s.trim());

    // Intro = non-bullet lines before the first bullet; bullets = "- " lines.
    const introLines: string[] = [];
    const bullets: string[] = [];
    for (const line of rest.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      if (t.startsWith("- ")) bullets.push(t.slice(2).trim());
      else if (bullets.length === 0) introLines.push(t);
    }

    return {
      title,
      company,
      dates,
      start,
      end,
      introHtml: inline(introLines.join(" ")),
      bulletsHtml: bullets.map(inline),
      siteHtml,
    };
  });

  const earlier: EarlierRole[] = earlierPart
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => ({ html: inline(l.slice(2).trim()) }));

  return { positions, earlier };
}
