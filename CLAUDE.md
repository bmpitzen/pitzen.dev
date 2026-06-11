# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Minimal personal portfolio website built with Nuxt 4 and hosted on Netlify. Uses pnpm as the package manager. The site is a single-page application (SPA) showcasing work experience, with custom theming and shadcn-vue UI components.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build locally
- `pnpm install` - Install dependencies (runs `nuxt prepare` automatically via postinstall)

## Architecture

### Framework & Routing
- **Nuxt 4** (legacy v3 directory layout, auto-detected) with file-based routing via `pages/` directory
- SPA mode (converted from multi-page to single-page application)
- Main entry point: [app.vue](app.vue) wraps all pages with `<NuxtLayout>` and `<NuxtPage>`
- Pages: [index.vue](pages/index.vue), [about.vue](pages/about.vue), [contact.vue](pages/contact.vue), [experience.vue](pages/experience.vue), [contactTest.vue](pages/contactTest.vue)

### Layout Structure
- Single layout: [layouts/default.vue](layouts/default.vue)
- Contains menubar navigation (currently commented out) and theme switcher
- Uses slot-based content injection

### UI Components
- **shadcn-vue** components in [components/ui/](components/ui/) directory
- Custom components:
  - [ThemeSwitcher.vue](components/ThemeSwitcher.vue) - Dark/light mode toggle using `@nuxtjs/color-mode`
  - [jobInfo.vue](components/jobInfo.vue) - Reusable job experience card with slots for description, responsibilities, and footer

### Styling System
- **TailwindCSS** for utility classes
- Custom color palette defined in [assets/css/tailwind.css](assets/css/tailwind.css) and [assets/pitzenDevPalette.scss](assets/pitzenDevPalette.scss)
- Custom colors: spruce, sage, moss, salmonberry, cedar, birch, natural, charcoal
- Dark mode: Class-based switching with `@nuxtjs/color-mode`
- Custom font: "National Park" variable font loaded in base layer

### Component Patterns
- **jobInfo.vue** uses Vue slots pattern:
  - `description` slot for job overview
  - `responsibilities` slot for bulleted list
  - `footer` slot for badges/tags
- Props passed for jobTitle, company, startDate, endDate
- All content lives in [pages/index.vue](pages/index.vue) (experience section embedded in homepage)

### Configuration
- [nuxt.config.ts](nuxt.config.ts) - Nuxt modules: tailwindcss, shadcn-nuxt, color-mode
- [tailwind.config.js](tailwind.config.js) - Extended theme with custom colors, animations, and border radius
- [components.json](components.json) - shadcn-vue configuration
- TypeScript extends auto-generated `.nuxt/tsconfig.json`

## Key Design Decisions
- Single-page layout with all experience content on homepage rather than separate pages
- Slot-based component architecture for flexible content rendering
- CSS custom properties for theming instead of hardcoded values
- Radix Vue primitives via shadcn-vue for accessible UI components

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
