// Build resume.pdf from resume.md.  Run: npm run resume:pdf
// HTML assembly (content + template + css + embedded fonts/assets) lives in
// render.js, shared with the live preview server (serve.js).

import puppeteer from "puppeteer";
import { join } from "node:path";
import { buildHtml, root } from "./render.js";

const html = buildHtml();

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.pdf({
    path: join(root, "resume.pdf"),
    format: "Letter",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log("✓ wrote resume.pdf");
} finally {
  await browser.close();
}
