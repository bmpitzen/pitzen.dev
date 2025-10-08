# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Minimal personal portfolio website built with Nuxt 3 and hosted on Netlify. The site is a single-page application (SPA) showcasing work experience, with custom theming and shadcn-vue UI components.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies (runs `nuxt prepare` automatically via postinstall)

## Architecture

### Framework & Routing
- **Nuxt 3** with file-based routing via `pages/` directory
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
