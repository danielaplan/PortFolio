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
2. **High visual / interaction craft** — glassmorphism surfaces, animated ambient gradient orbs, and inertial smooth scrolling as first-class design elements.

Peer portfolios usually show static screenshots inside a generic template. This one shows live engineering activity inside a distinct motion-design system.

## Operating Context

Single-page web experience evaluated on desktop and mobile. A visitor scrolls through anchored sections (Home/Hero → Projects → Skills → Contact) with scroll-spy nav, toggles between **Curated** projects and **Live Repos** (GitHub-synced), opens a project modal with an embedded code inspector, copies the email, and follows external links (GitHub, social). Used in job-fair screens, cold outreach, and course assessment.

## Capabilities and Constraints

- **Live GitHub REST API integration** (unauthenticated, ~60 req/hr per IP, client-cached 15 min via `localStorage`, with stale-cache fallback). Must degrade gracefully when rate-limited or offline.
- **Curated project dataset** (`src/data/projects.js`) of six showcased builds, plus dynamic mapping of live repo metrics onto curated entries.
- **Project detail modal** with a code inspector that can fetch a live `README.md` from `raw.githubusercontent.com`.
- **Dark / light theme** with persistence and system-preference detection.
- **Smooth inertial scroll** via Lenis; navigation relies on a `window.__lenis` instance.
- **Existing tech stack (fixed unless a redesign is signed off):** React 19 + Vite + Tailwind CSS v4, `lucide-react` icons, Lenis. New visual work should not silently swap this foundation.
- **Explicitly undecided:** whether to add a blog/writing section, testimonials, case studies, or analytics. Recorded as open, not assumed.

## Brand Commitments

- Identity: "Daniel Aplan" / "daniel" wordmark; personal, approachable, technically credible voice.
- **Must stay accurate:** email `danielaplan.bsit2024@gmail.com`; GitHub `github.com/danielaplan`; Instagram `@dniel_apln`; Facebook `daniel.aplan.9`; LinkedIn `daniel-aplan-5ba561334`. The profile photo (`public/profile.webp`) is a real asset and must not be replaced with placeholder imagery.

## Evidence on Hand

Real, codebase-backed content (do not fabricate more):
- Six curated projects with descriptions, tags, and links: FaithQuest, Customer Relationship Management System, Rental Ops Manager, Messiah Baptist Church Official Website, Youth Organization Website, Developer Portfolio.
- Live GitHub username `danielaplan` and the public repositories it syncs.
- Contact/social handles listed above; profile image at `public/profile.webp` (164 KB `profile.jpg` also present).
- **Absent (must not be invented in future work):** testimonials, client logos, case studies, press, metrics/benchmarks, or licensing claims.

## Product Principles

1. **Show real work, not mockups.** Live data and actual repos outrank static claims or screenshots.
2. **Craft is the differentiator.** Motion, finish, and interaction quality are first-class, not decoration.
3. **Speak to every audience at once.** No persona is sacrificed to flatter another.
4. **Performance and accessibility are part of the craft.** Polish that breaks on mobile, on slow networks, or for keyboard/screen-reader users is not polish.

## Accessibility & Inclusion

No formal WCAG level was mandated, but the build already carries `aria-label`s on icon-only buttons, visible focus states, and a persisted light/dark theme. Future work should preserve and extend these rather than regress them.
