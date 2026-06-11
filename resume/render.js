// Shared HTML assembly for both the PDF build (build.js) and the live
// preview server (serve.js). Reads resume.md + template + css + assets,
// embeds fonts, and returns the full HTML string.

import { marked } from "marked";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

export const here = dirname(fileURLToPath(import.meta.url));
export const root = resolve(here, "..");

marked.setOptions({ breaks: true, gfm: true });

// safe single-token replace (avoids `$` interpretation in replacements)
const fill = (str, token, value) => str.split(token).join(value);

// fonts: first existing path per weight wins (licensed → not committed)
const FONTS = [
  {
    family: "John Muir Sans",
    weight: 400,
    paths: [
      "/Users/brandon.pitzen/Library/Mobile Documents/com~apple~CloudDocs/_Trailrun.dad/Fonts/John Muir Sans/JohnMuirSans.otf",
      "/Users/brandon.pitzen/Library/Application Support/Adobe/.User Owned Fonts/John Muir Sans Regular-1613.otf",
    ],
  },
  { family: "SF Pro Rounded", weight: 400, paths: ["/Library/Fonts/SF-Pro-Rounded-Regular.otf"] },
  { family: "SF Pro Rounded", weight: 500, paths: ["/Library/Fonts/SF-Pro-Rounded-Medium.otf"] },
  { family: "SF Pro Rounded", weight: 600, paths: ["/Library/Fonts/SF-Pro-Rounded-Semibold.otf"] },
  { family: "SF Pro Rounded", weight: 700, paths: ["/Library/Fonts/SF-Pro-Rounded-Bold.otf"] },
];

function fontFaces() {
  return FONTS.map(({ family, weight, paths }) => {
    const file = paths.find(existsSync);
    if (!file) {
      console.warn(`⚠︎  ${family} ${weight} not found — falling back`);
      return "";
    }
    const b64 = readFileSync(file).toString("base64");
    return `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url(data:font/otf;base64,${b64}) format("opentype");}`;
  }).join("\n");
}

export function buildHtml() {
  const css = readFileSync(join(here, "resume.css"), "utf8");
  const avatar = "data:image/png;base64," + readFileSync(join(root, "assets/Brandon_Hair.png")).toString("base64");
  const treeSvg = readFileSync(join(root, "assets/spruce.svg"), "utf8");

  const md = readFileSync(join(root, "resume.md"), "utf8");
  const [sidebarAll, mainMd = ""] = md.split("<!-- MAIN -->");
  const afterSidebar = sidebarAll.replace("<!-- SIDEBAR -->", "");
  const [nameMd = "", afterTree = ""] = afterSidebar.split("<!-- TREE -->");
  const [contactMd = "", bodyMd = ""] = afterTree.split("<!-- BODY -->");

  let html = readFileSync(join(here, "template.html"), "utf8");
  html = fill(html, "{{FONT_FACES}}", fontFaces());
  html = fill(html, "{{CSS}}", css);
  html = fill(html, "{{AVATAR}}", avatar);
  html = fill(html, "{{TREE_SVG}}", treeSvg);
  html = fill(html, "{{SIDEBAR_NAME}}", marked.parse(nameMd.trim()));
  html = fill(html, "{{CONTACT}}", marked.parse(contactMd.trim()));
  html = fill(html, "{{SIDEBAR_BODY}}", marked.parse(bodyMd.trim()));
  // strip site-only prose (`<!-- site: ... -->`) so it never reaches the PDF
  const mainForPdf = mainMd.replace(/<!--\s*site:[\s\S]*?-->/gi, "");
  html = fill(html, "{{MAIN}}", marked.parse(mainForPdf.trim()));
  return html;
}
