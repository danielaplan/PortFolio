# Daniel Aplan — Portfolio

A single-page personal portfolio for **Daniel Aplan**, a 3rd-year BSIT student at the University of Caloocan City (Caloocan City, Metro Manila, Philippines). It exists to grow a professional network and demonstrate real software-engineering capability — to recruiters, freelance prospects, and academic evaluators alike.

Unlike most peer-student portfolios (static screenshots inside a generic template), this one shows **live engineering activity** inside a distinct motion-design system.

## What makes it different

- **Live GitHub data** — real repositories, star counts, and "last pushed" timestamps are pulled from the GitHub REST API *at view time* (not screenshots or hand-copied numbers).
- **High interaction craft** — glassmorphism surfaces, animated ambient gradient orbs, and inertial smooth scrolling as first-class design elements.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Icons | `lucide-react` |
| Fonts | Inter (self-hosted via `@fontsource/inter`) |
| Smooth scroll | Lenis |
| Testing | Vitest + happy-dom |

> The stack is fixed unless a redesign is signed off. New visual work should extend this foundation rather than silently swap it.

## Features

- **Scroll-spy navigation** with smooth anchor scrolling powered by a `window.__lenis` instance.
- **Curated projects** (`src/data/projects.js`) — six showcased builds, each with description, tags, and links.
- **Live Repos (GitHub-synced)** — a toggle that maps live repo metrics onto the curated entries.
- **Project detail modal** with a code inspector that fetches a live `README.md` from `raw.githubusercontent.com`.
- **Dark / light theme** that follows the visitor's local time (7:00–19:00 → light, otherwise dark), with a manual override and system-preference detection.
- **Copy-to-clipboard email** with a toast confirmation and a graceful fallback for non-secure contexts.
- **Ambient gradient orbs** with subtle, reduced-motion-friendly animation.
- **Accessibility baseline** — `aria-label`s on icon-only buttons, visible focus states, and a persisted theme.

### Live GitHub integration

`src/services/github.js` calls the unauthenticated GitHub REST API (`/users/danielaplan/repos`), which allows ~60 requests/hour per IP. To stay within limits it:

- Caches responses in `localStorage` for **15 minutes** (`portfolio_github_repos_v1`).
- Falls back to **stale cached data** if a request fails (rate limit, offline, timeout).
- Aborts hung requests after **8 seconds** via `AbortController`.
- Derives a dev-status badge (`Active Dev` / `Maintained` / `Completed` / `Archived`) from each repo's `pushed_at` timestamp.

No API token is required. The site degrades gracefully — visitors still see curated content if the API is unreachable.

## Project structure

```
portfolio/
├── index.html              # App shell + meta/SEO tags
├── vite.config.mjs         # Vite + React + Tailwind plugins
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root: theme, Lenis, layout, toast
│   ├── index.css           # Tailwind + design tokens / animations
│   ├── components/
│   │   ├── Navbar.jsx      # Scroll-spy nav + theme toggle
│   │   ├── Hero.jsx        # Landing / intro
│   │   ├── Projects.jsx    # Curated + Live Repos tabs
│   │   ├── ProjectModal.jsx# Detail modal + code inspector
│   │   ├── CodeInspector.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx     # Copy-email + social links
│   │   ├── Footer.jsx
│   │   └── icons/          # Social + tech-stack icon components
│   ├── data/
│   │   ├── projects.js     # Six curated projects
│   │   └── codeSnippets.js # Snippets shown in the inspector
│   └── services/
│       ├── github.js       # GitHub REST client + caching
│       └── github.test.js  # Vitest unit tests
├── public/
│   └── profile.webp        # Real profile photo (do not replace)
├── DESIGN.md               # Visual design system (source of truth)
└── PRODUCT.md              # Product brief (source of truth)
```

> `DESIGN.md` and `PRODUCT.md` are the authoritative design/product references. Keep them in sync when the build changes.

## Getting started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Then open the local URL Vite prints (default http://localhost:5173).

### Build

```bash
npm run build      # Output to dist/
npm run preview    # Serve the production build locally
```

### Test

```bash
npm run test       # Run the Vitest suite once
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run test` | Run `vitest run` (unit tests) |

## Deployment

The project is configured for **Vercel** (a `.vercel/` directory is present). Push to the connected Git repository, or run `vercel` from the repo root. Any static host that serves the `dist/` output works equally well.

## Brand & accuracy commitments

- **Identity:** "Daniel Aplan" / "daniel" wordmark; personal, approachable, technically credible voice.
- **Contact (must stay accurate):** email `danielaplan.bsit2024@gmail.com` · GitHub [`danielaplan`](https://github.com/danielaplan) · Instagram `@dniel_apln` · Facebook `daniel.aplan.9` · LinkedIn `daniel-aplan-5ba561334`.
- **Profile photo** (`public/profile.webp`) is a real asset — do not replace it with placeholder imagery.

## License

See `package.json`. (No license claim is made for the showcased project content; the curated projects belong to their respective repos.)
