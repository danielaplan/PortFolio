# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A 3rd-year BSIT student's professional audience, balanced equally across three personas:
- **Recruiters / hiring managers** screening for internships or junior roles.
- **Freelance / client prospects** who might commission a site or app.
- **Professors / academic evaluators** assessing BSIT coursework and capstone work.

All are addressed at once; the site must read as a credible working engineer to each, not optimize for one.

## Product Purpose

A personal portfolio for Daniel Aplan (3rd-year BSIT, University of Caloocan City, based in Caloocan City, Metro Manila, Philippines). It exists to **grow a professional network** and demonstrate real software-engineering capability. Success is measured in new professional connections and visibility, not immediate job offers or sales.

## Positioning

The site is defined by two things a typical peer student portfolio cannot truthfully claim together:
1. **Live GitHub data synchronization** — real repositories, star counts, and "last pushed" timestamps pulled from the GitHub REST API at view time (not screenshots or hand-copied numbers).
2. **Engineering Console aesthetic** — a flat dark operator-console visual system built around `bg-zinc-950/60` surfaces, hairline `border-zinc-800` edges, Signal Blue (`#3b82f6`) as the primary accent with Metric Cyan (`#06b6d4`) as the hover/active state, and interactive breathing dot-grid canvas as ambient texture.

Peer portfolios usually show static screenshots inside a generic template. This one shows live engineering activity inside a distinct operator-console design world with signature Signal Blue → Cyan hover transitions on CTAs.

## Operating Context

Single-page web experience evaluated on desktop and mobile. A visitor scrolls through anchored sections (Home/Hero → Projects → Skills → Contact) with scroll-spy nav, toggles between **Curated** projects and **Live Repos** (GitHub-synced), opens a project modal with an embedded code inspector, copies the email, and follows external links (GitHub, social). Used in job-fair screens, cold outreach, and course assessment.

## Capabilities and Constraints

- **Live GitHub REST API integration** (unauthenticated, ~60 req/hr per IP, client-cached 15 min via `localStorage`, with stale-cache fallback). Must degrade gracefully when rate-limited or offline.
- **Curated project datasets** — six projects in `src/data/projects.js` plus six Bento Grid cards in `src/data/bentoProjects.js`. The two datasets partially overlap; BentoGrid showcases are the primary curated view.
- **Project detail modal** with tabbed navigation: **Project Overview** (description, key features, tech tags) and **Code Inspector** (live `README.md` fetch from `raw.githubusercontent.com` with 8-second AbortController timeout, regex-based syntax tokenizer for strings/keywords/SQL/types/numbers, master-branch fallback).
- **Dark / light theme** with persistence and system-preference detection.
- **Smooth inertial scroll** via Lenis; navigation relies on a `window.__lenis` instance.
- **GSAP-powered 3D card fan carousel** (`src/components/ui/card-fan-carousel.tsx`) for the curated project showcase, featuring swipe/touch support, debounced navigation (250ms), keyboard arrow navigation, and dynamically measured stage heights. GSAP v3.15.0 is a project dependency.
- **BentoGrid project layout** (`src/components/BentoGrid.jsx`) — responsive 2×2 + featured + architecture-card grid using flat dark `bg-zinc-950/60 border-zinc-800` cards with `hover:-translate-y-0.5` lift and no backdrop-filter. Three card variants: `FeaturedSpotlightCard` (md:col-span-2, dual-column), `StandardProjectCard` (md:col-span-1, 2×2 grid), `ArchitectureCard` (md:col-span-2, horizontal bar with CTA).
- **Project Spotlight architecture** (`src/components/ProjectSpotlightCard.jsx`) — browser-window mockup tile cards presenting each project with architecture metrics (throughput, database, security), a live telemetry stream bar, traffic-light window controls, and status indicators (Active Dev / Maintained / Archived / Completed). Uses `ProjectTileCardPlaceholder` dark-gradient tile with dot-grid overlay for non-spotlight cards.
- **Interactive Spotlight Showcase** — the Projects section (`src/components/Projects.jsx`) supports a view toggle between **Curated Spotlight** (BentoGrid layout) and **Live Repos** (searchable/filterable GitHub list from `fetchUserRepos('danielaplan')`), with tag filtering, live refresh, and graceful loading/error states including "Couldn't load live GitHub data" honest fallback panel with Try again button.
- **Flat dark Engineering Console design system** — `bg-zinc-950/60` surfaces, `border-zinc-800/80` hairline edges, no glassmorphism, no backdrop-filter. Signal Blue (`#3b82f6`) → Metric Cyan (`#06b6d4`) dual-color CTA hover transition is the signature interaction. Tailwind CSS v4 blanket overrides in `src/index.css` enforce this flat aesthetic: `[class*="backdrop-blur"]`, `[class*="bg-gradient"]`, and all `shadow-*` are overridden. Neumorphic CSS variables are defined but unused.
- **Interactive breathing dot-grid canvas** (`src/components/ui/InteractiveDotGrid.jsx`) — ambient background texture, cursor-reactive, rendered behind all content via `z-0` fixed layer.
- **Existing tech stack (fixed unless a redesign is signed off):** React 19 + Vite + Tailwind CSS v4, `lucide-react` icons, Lenis, GSAP. New visual work should not silently swap this foundation.
- **Explicitly undecided:** whether to add a blog/writing section, testimonials, case studies, or analytics. Recorded as open, not assumed.

## Brand Commitments

- Identity: "Daniel Aplan" / "daniel" wordmark; personal, approachable, technically credible voice.
- **Must stay accurate:** email `danielaplan.bsit2024@gmail.com`; GitHub `github.com/danielaplan`; Instagram `@dniel_apln`; Facebook `daniel.aplan.9`; LinkedIn `daniel-aplan-5ba561334`. The profile photo (`public/profile.webp`) is a real asset and must not be replaced with placeholder imagery.

## Evidence on Hand

Real, codebase-backed content (do not fabricate more):
- **Six curated projects** (`src/data/projects.js`) with long descriptions, key features, and links: FaithQuest, CRM Enterprise System, Rental Ops Manager, Developer Portfolio, Messiah Baptist Church, Youth Organization Website.
- **Six Bento Grid project cards** (`src/data/bentoProjects.js`) with Unsplash/Google image URLs, demo URLs, and status fields: FaithQuest, Big Brew POS & CRM, Inventory Tycoon, Empire Salon Management, Youth Event Summit Portal, Multi-Tier Enterprise Topologies. Three of these (Big Brew, Empire Salon, Youth Event Summit) do not appear in `projects.js` — they are exclusive to the BentoGrid showcase.
- Live GitHub username `danielaplan` and the public repositories it syncs.
- Contact/social handles listed above; profile image at `public/profile.webp` (164 KB `profile.jpg` also present).
- **Engineering Console aesthetic confirmed in code:** flat dark CSS overrides active in `src/index.css` (blanket `[class*="backdrop-blur"]`, `[class*="bg-gradient"]`, and all `shadow-*` overrides); `bg-zinc-950/60 border-zinc-800` surface formula across all components; Signal Blue `#3b82f6` and Metric Cyan `#06b6d4` color tokens; `InteractiveDotGrid.jsx` wired in `App.jsx` as ambient background.
- **Absent (must not be invented in future work):** testimonials, client logos, case studies, press, metrics/benchmarks, or licensing claims.

## Product Principles

1. **Show real work, not mockups.** Live data and actual repos outrank static claims or screenshots.
2. **Craft is the differentiator.** Motion, finish, and interaction quality are first-class, not decoration.
3. **Speak to every audience at once.** No persona is sacrificed to flatter another.
4. **Performance and accessibility are part of the craft.** Polish that breaks on mobile, on slow networks, or for keyboard/screen-reader users is not polish.

## Accessibility & Inclusion

No formal WCAG level was mandated, but the build already carries `aria-label`s on icon-only buttons, visible focus states, and a persisted light/dark theme. Future work should preserve and extend these rather than regress them.
