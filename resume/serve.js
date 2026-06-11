// Live preview server for the résumé.  Run: npm run resume:dev
// Serves the exact HTML the PDF is built from, on a Letter-sized "page",
// and auto-reloads the browser whenever you save resume.md / resume.css /
// template.html. Tweak CSS, see it instantly; run `npm run resume:pdf`
// (or just print the page with Cmd+P) when you're happy.

import { createServer } from "node:http";
import { watch } from "node:fs";
import { join } from "node:path";
import { buildHtml, root, here } from "./render.js";

const PORT = 5174;
const clients = new Set();

// screen-only chrome: a centered Letter sheet on a gray backdrop + live reload.
// Wrapped in @media screen so it can never leak into the printed/PDF output.
const PREVIEW = `
<style media="screen">
  html { background: #54564f; }
  body { display: flex; justify-content: center; }
  .resume {
    width: 8.5in;
    min-height: 11in;
    background: #fff;
    margin: 28px 0;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.45);
  }
</style>
<script>
  const es = new EventSource("/__reload");
  es.onmessage = () => location.reload();
</script>
`;

const server = createServer((req, res) => {
  if (req.url === "/__reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 500\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  try {
    const html = buildHtml().replace("</body>", `${PREVIEW}</body>`);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Build error:\n\n" + (err.stack || err.message));
  }
});

// debounced reload broadcast on any source change
let timer = null;
const broadcast = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    for (const res of clients) res.write("data: reload\n\n");
  }, 80);
};

for (const file of ["resume.css", "template.html", "render.js"]) {
  watch(join(here, file), broadcast);
}
watch(join(root, "resume.md"), broadcast);

server.listen(PORT, () => {
  console.log(`\n  résumé preview → http://localhost:${PORT}\n  edit resume.md / resume.css and the page reloads on save.\n  print to PDF with Cmd+P, or run: npm run resume:pdf\n`);
});
