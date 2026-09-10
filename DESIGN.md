---
name: Daniel Aplan — Portfolio
description: A flat dark-mode engineering portfolio built on a 12-column hero, BentoGrid project layout, browser-mocked dashboard tiles, and a Signal-Blue accent system over a near-black surface.
colors:
  bg-page: "#09090b"
  bg-elevated: "#18181b"
  bg-panel: "rgba(9, 9, 11, 0.6)"
  bg-card: "rgba(9, 9, 11, 0.6)"
  bg-card-strong: "rgba(9, 9, 11, 0.8)"
  bg-pill: "rgba(9, 9, 11, 0.6)"
  bg-input: "rgba(9, 9, 11, 0.6)"
  ink-strong: "#ffffff"
  ink-muted: "#d4d4d8"
  ink-tertiary: "#a1a1aa"
  ink-quaternary: "#71717a"
  ink-faint: "#52525b"
  border-base: "rgba(39, 39, 42, 0.8)"
  border-soft: "rgba(39, 39, 42, 0.6)"
  border-strong: "#52525b"
  signal-blue: "#3b82f6"
  signal-blue-deep: "#2563eb"
  signal-blue-soft: "rgba(59, 130, 246, 0.1)"
  signal-blue-border: "rgba(59, 130, 246, 0.2)"
  metric-cyan: "#06b6d4"
  metric-cyan-soft: "rgba(6, 182, 212, 0.1)"
  metric-cyan-border: "rgba(6, 182, 212, 0.2)"
  status-active: "#10b981"
  status-active-soft: "rgba(16, 185, 129, 0.1)"
  status-active-border: "rgba(16, 185, 129, 0.2)"
  status-maintained: "#22d3ee"
  status-archived: "#f43f5e"
  star-amber: "#f59e0b"
  neo-light-bg: "#e6e7ee"
  neo-light-shadow: "#babecc"
  neo-light-highlight: "#ffffff"
  neo-dark-bg: "#09090b"
  neo-dark-shadow: "#1f2128"
  neo-dark-highlight: "#353945"
typography:
  display:
    fontFamily: "Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)"
    fontSizeXl: "7rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  # Multilingual name font-cycle (Hero h1). Each English "Daniel Aplan" frame
  # renders in a distinct design family before yielding to a translated language.
  font-cycle:
    - name: "Playfair Display"
      family: '"Playfair Display", Georgia, serif'
      style: "High-contrast editorial / magazine serif"
    - name: "Space Grotesk"
      family: '"Space Grotesk", system-ui, sans-serif'
      style: "Retro-futurist grotesque with character"
    - name: "JetBrains Mono"
      family: '"JetBrains Mono", monospace'
      style: "Developer / terminal monospaced"
    - name: "Anton"
      family: '"Anton", sans-serif'
      style: "Bold condensed display (sporting / impact)"
    - name: "Abril Fatface"
      family: '"Abril Fatface", Georgia, serif'
      style: "High-contrast display serif (fashion / luxury)"
    - name: "Fredoka One"
      family: '"Fredoka One", sans-serif'
      style: "Rounded friendly display (playful / app)"
    - name: "Lobster"
      family: '"Lobster", cursive'
      style: "Brush script (casual / handwritten)"
    - name: "Orbitron"
      family: '"Orbitron", sans-serif'
      style: "Sci-fi / futuristic display"
    - name: "Press Start 2P"
      family: '"Press Start 2P", monospace'
      style: "Pixel / retro-gaming"
    - name: "Raleway"
      family: '"Raleway", sans-serif'
      style: "Elegant geometric sans"
rounded:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
  pill: "9999px"
spacing:
  section-y: "5rem"
  section-y-mobile: "2.5rem"
  page-x: "3rem"
  page-x-mobile: "1.25rem"
  card-pad: "1.5rem"
  card-pad-sm: "1.25rem"
components:
  primary-cta:
    backgroundColor: "{colors.signal-blue}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  primary-cta-hover:
    backgroundColor: "{colors.metric-cyan}"
    textColor: "#ffffff"
  secondary-cta:
    backgroundColor: "{colors.bg-pill}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.border-base}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  panel-card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink-strong}"
    borderColor: "{colors.border-base}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
  project-card:
    backgroundColor: "{colors.bg-card}"
    borderColor: "{colors.border-base}"
    rounded: "{rounded.xl}"
    padding: "1.25rem"
  dashboard-tile:
    backgroundColor: "linear-gradient(135deg, #0a0e17, #020617)"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "1rem"
  badge-pill:
    backgroundColor: "{colors.bg-pill}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.border-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
  badge-status-active:
    backgroundColor: "{colors.status-active-soft}"
    textColor: "{colors.status-active}"
    borderColor: "{colors.status-active-border}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
  badge-spotlight:
    backgroundColor: "{colors.signal-blue-soft}"
    textColor: "{colors.signal-blue}"
    borderColor: "{colors.signal-blue-border}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.625rem"
  nav-link-active:
    textColor: "{colors.signal-blue}"
  input-base:
    backgroundColor: "{colors.bg-input}"
    textColor: "{colors.ink-strong}"
    borderColor: "{colors.border-base}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1rem"
---

# Design System: Daniel Aplan — Portfolio

## Overview

**Creative North Star: "Engineering Console"**

A flat dark-mode engineering portfolio that reads as a single, calm **operator console**. The page lives on `zinc-950` (`#09090b`); every panel, card, and pill uses the same near-black surface (`bg-zinc-950/60` or `/80`) with a `1px` hairline `border-zinc-800/80` edge. Depth is conveyed by panel-stack layering (cards on cards), three lift tiers (`hover:-translate-y-0.5`, `hover:-translate-y-1`, `hover:scale-105`), and the **Signal Blue → Metric Cyan shift** on every primary CTA — never by drop shadows, never by blur, never by gradients. This is the engineering-tool aesthetic: terminals, dashboards, IDEs.

The hero is a **12-column responsive grid** (`max-w-7xl`): a 7-column left column with a giant monospace-tracked headline (`Daniel Aplan` at `text-8xl font-black tracking-tight`), a 3-card "stat row," and three standardized CTAs; a 5-column right column with a bordered profile photograph. Every section past the hero (`Projects`, `Skills`, `Contact`) follows the same 12-col template, the same monospace eyebrows (`// INTERACTIVE SPOTLIGHT`, `// TECHNICAL PROFICIENCY`, `// GET IN TOUCH`), and the same two-tier interaction model: quiet at rest, cyan-shifted on action.

The page is **mono-accent discipline**: Signal Blue (`#3b82f6`) carries interactive signals (active links, hover lifts, primary CTAs, glow orbs, file-tab selections); Metric Cyan (`#06b6d4`) carries live data and metric visualizations (architecture progress bars, telemetry bars, the metric mockup center mark, hover-shift on primary CTAs, the running "● LIVE" indicator); Active Emerald (`#10b981`) carries only status (Available, Active Dev, Maintained); Slate Amber (`#f59e0b`) carries stars only. Each lives in its own semantic lane; they never blur.

**Key Characteristics:**
- **Flat dark, hairline-bordered panels** — `bg-zinc-950/60` + `border-zinc-800/80` is the only surface formula. No blur, no gradient backgrounds, no drop shadows. The blanket Tailwind overrides in `src/index.css` actively disable `backdrop-blur`, `bg-gradient-*`, and `shadow-*` to enforce this.
- **Three-tier lift interaction model** — rest (flat hairline panel) → hover (`hover:-translate-y-0.5` + border brightens to `zinc-700` + bg shifts to `zinc-900/40`) → active-press (`active:scale-95`).
- **Mono-accent discipline with cyan-shift on action** — primary CTAs are Signal Blue at rest, Metric Cyan on hover (`hover:bg-metric-cyan`). This dual-color transition is the signature life of the system.
- **Monospace eyebrows and labels everywhere** — every section header opens with a tracked uppercase `//` label in Signal Blue; metadata, stats, and dev-status badges are monospace. The voice is technical.
- **Dashboard-tile cards** — `ProjectSpotlightCard` renders a stitched browser mockup with traffic-light dots, a URL bar, and an inner dark-gradient panel showing "Throughput / Database / Security" metrics with cyan progress bars and a telemetry stream footer. This is the project's most distinctive visual.
- **Live data is a first-class visual element** — `fetchUserRepos` populates real stars, language, last-pushed, status; honest fallback states for loading, error, and stale cache are explicit, not hidden.

## Colors

A **monochrome-zinc + Signal-Blue system** with three chromatic accent roles. The page is overwhelmingly dark zinc (`#09090b`/`#18181b`/`#27272a`); Signal Blue carries interactive signals; Metric Cyan carries live data and metric visualizations; Active Emerald carries only status; Amber carries only stars. There are no chromatic backgrounds anywhere — even "blue" surfaces are tinted glass at 10–20% opacity over zinc.

### Primary
- **Signal Blue** (`#3b82f6`): the interactive accent — active nav links, primary CTA fill, focus rings (`focus-visible:ring-cyan-400/60`), status pill borders, and the small "●" pulse dots that mark active states. Appears on roughly 10% or less of any given screen.
- **Signal Blue Deep** (`#2563eb`): the slightly darker Signal Blue used as a hover/contrast variant on legacy Tailwind utilities. Code prefers `#3b82f6` (Signal Blue) as the canonical interactive hue.

### Secondary (Live Data)
- **Metric Cyan** (`#06b6d4`): the **live-data and metric accent** — telemetry stream labels, dashboard progress bars (Throughput / Database / Security), the running "● LIVE" indicator, the Architecture card eyebrow, hover states on text links, and the destination color for primary CTA hover (`hover:bg-metric-cyan`).

### Status & Semantic
- **Active Emerald** (`#10b981`): status only — "Available for hire," "Active Dev," pulsing availability dots. Never decorative.
- **Maintained Cyan** (`#22d3ee` dark / `#06b6d4` light): the Maintained repository badge (dark-mode adjusted variant of Metric Cyan).
- **Archived Rose** (`#f43f5e`): the Archived repository badge, and the red traffic-light dot on the dashboard window chrome.
- **Star Amber** (`#f59e0b`): GitHub star counts only.

### Neutral
- **Page** (`#09090b`): the page ground — `bg-zinc-950`.
- **Elevated** (`#18181b`): the slightly raised surface — `bg-zinc-900`, used for input backgrounds, button rest states, and elevated cards.
- **Panel** (`rgba(9, 9, 11, 0.6)`): the canonical card surface — `bg-zinc-950/60`, paired with `border-zinc-800/80`. Every project card, skill card, contact card, stat box, badge container, and input uses this exact pair.
- **Border Base** (`rgba(39, 39, 42, 0.8)`): the canonical 1px hairline — `border-zinc-800/80`.
- **Ink Strong** (`#ffffff`): primary text — names, headlines, titles. Always full-white at rest.
- **Ink Muted** (`#d4d4d8` / `#a1a1aa`): secondary text — descriptions, body copy. The `#a1a1aa` variant (`zinc-400`) is the most common.
- **Ink Tertiary** (`#71717a` / `#52525b`): tertiary metadata — captions, the in-card `//` annotations, the small monospace labels under stat boxes.

### Legacy Neumorphic Tokens (Defined, Disabled)
The CSS file still declares a neumorphic palette (`--bg-color`, `--shadow-light`, `--shadow-dark`, `--accent`) and provides five `neo-raised-*` utility classes plus `neo-inset`, `neo-press`, `neo-accent`. They are **defined but not used** in the rendered components — every surface in `Hero`, `Projects`, `Skills`, `Contact`, `Footer`, `Navbar` uses flat zinc panels instead. The neumorphic system is the system's previous voice; it remains as a CSS-level escape hatch but the visual world moved on. New work should not reintroduce it without an explicit design review.

### Named Rules
**The Signal Blue Rule.** Signal Blue carries every interactive and "live" signal — links, focus, the active nav link, the focus ring, the status-pill border, the small "●" pulse. It appears on roughly 10% or less of a screen; its scarcity is what makes it read as active rather than decorative.

**The Cyan-Shift Rule.** Every primary CTA shifts from Signal Blue at rest to Metric Cyan on hover (`hover:bg-metric-cyan`). This dual-color transition is the signature life of the system — never use a single-color hover for a primary action.

**The Panel Formula.** Every panel uses the same surface pair: `bg-zinc-950/60` + `border-zinc-800/80`. The only variations are the hover state (`hover:bg-zinc-900/40` + `hover:border-zinc-700`) and the lift (`hover:-translate-y-0.5`). Anything else is a design violation.

**The Three-Accent Lane Rule.** Signal Blue = interactive. Metric Cyan = live data and metrics. Active Emerald = status. Amber = stars. They never substitute for one another — picking the wrong accent for the wrong semantic role is the most common bug in this codebase.

## Typography

**Display Font:** Geist (with system-ui, Segoe UI, Roboto fallback)
**Body Font:** Geist (same stack)
**Mono / Code Font:** `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` — used for eyebrows (`// TECHNICAL PROFICIENCY`), tech-stack tags, metadata, the email address, monospace labels on stat cards, and the Code Inspector.

**Character:** A single geometric sans across the entire system — Geist keeps the voice consistent. Hierarchy comes from size, weight, and tracking (not from switching families). Uppercase tracked labels (`// TECHNICAL PROFICIENCY`, "Featured Spotlight," "Active Dev") in monospace provide the only "loud" moments; everything else is calm body text. The mono stack gives the technical metadata (commit counts, file names, status pills) its voice without breaking the system.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 6vw, 4.5rem)`, 1.05, `-0.02em`): the hero name (`Daniel Aplan` at `text-4xl → text-8xl`). Tracking-tight, confident, full-white.
- **Headline** (800, `1.875rem` → `text-4xl`, 1.1): section headings (`Projects & Engineering`, `Skills & Technologies`, `Let's Connect`). Always paired with a monospace eyebrow above.
- **Title** (700, `1.25rem` → `text-xl/text-2xl`): card titles, modal headers. Hover-shifts to Signal Blue on project cards (`group-hover:text-signal-blue`).
- **Body** (400, `0.875rem` → `text-sm/text-base`, 1.6): descriptions, captions, modal copy. The most common weight.
- **Label** (600, `0.6875rem` → `text-[10px]/[11px]`, 0.05em, uppercase): section eyebrows, status pills, badge text. Almost always monospace.
- **Mono** (400, `0.75rem` → `text-[11px]/text-xs`): commit counts, file names, `//` annotations, the running email, status metadata. The technical voice.

### Named Rules
**The One Voice Rule.** One typeface (Geist) for the entire system. Hierarchy comes from size, weight, and tracking — never from switching families. Mono is reserved for technical metadata only.

**The Eyebrow Rule.** Every section header opens with a monospace uppercase `//` label in Signal Blue (or Metric Cyan in dark mode contexts). Skipping the eyebrow is a layout violation.

## Layout

A **12-column responsive grid** at `max-w-7xl` (80rem) centered on the page, with horizontal padding `px-5 sm:px-8 lg:px-12` (1.25rem → 2rem → 3rem). Each section uses `min-h-[100dvh] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12` — full-viewport sections with vertical centering and consistent top/bottom rhythm. Sections are scroll-spy activated; the active section is full-opacity, inactive sections are dimmed to `opacity-40` with a small blur (`blur-[0.3px]`) and downward shift (`translate-y-6`).

### Grid Templates
- **Hero:** `grid-cols-1 lg:grid-cols-12` with `gap-8 sm:gap-12 lg:gap-16`. Right column (`lg:col-span-5`) holds the bordered profile photo; left column (`lg:col-span-7`) holds the headline stack, stat row, and CTAs.
- **Projects:** same 12-col header. Body uses a **BentoGrid** — full-width Featured Spotlight card on top, a 2-column grid of Standard cards, a full-width Architecture card on the bottom. Internal `gap-4 sm:gap-6`.
- **Skills:** `grid-cols-1 sm:grid-cols-2 gap-6` for the four category cards. Below: `grid-cols-1 md:grid-cols-3 gap-4` for the architecture highlight row.
- **Contact:** `grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8`. Left card (`lg:col-span-7`) is the primary email panel; right column (`lg:col-span-5`) stacks LinkedIn, GitHub, an Instagram/Facebook 2-col grid, and a turnaround-time pill.

### Layered Background Architecture (Back to Front)
1. **Page ground** — flat `bg-zinc-950`, no animations, no gradients.
2. **CSS-declared ambient orbs** — `animate-ambient-1` (18s) and `animate-ambient-2` (22s) are defined in `index.css` and hidden in dark mode (`.dark .animate-ambient-1, .dark .animate-ambient-2 { display: none; }`). They are visually absent from the live page in dark mode.
3. **Neumorphic utilities** — `neo-raised-*`, `neo-inset`, `neo-press`, `neo-accent` are defined but unused in current components.
4. **InteractiveDotGrid canvas** — `src/components/ui/InteractiveDotGrid.jsx` exists but is **not wired** into `App.jsx`. It is dead code in the current build; the breathing dot grid is not active.
5. **Content panels** — all components live at the content layer; all use the `bg-zinc-950/60 + border-zinc-800/80` formula.

### Responsive
The hero photo column stacks below the bio on mobile (`order-1 lg:order-2`); the projects BentoGrid collapses to a single column; the contact cards stack on mobile. The fan carousel height grows from 22rem (mobile) → 36rem (lg) in 4-tier breakpoints (480/768/1024). Lenis smooth scroll is active; the modal locks body scroll and uses `data-lenis-prevent` on its inner scroll containers.

## Elevation & Depth

This is a **flat dark system with layered panels, not shadows**. Depth is conveyed by:

1. **Three-tier lift interaction** — rest (flat) → hover (`-translate-y-0.5`, border brightens, bg shifts to `zinc-900/40`) → press (`active:scale-95`).
2. **Panel-on-panel stacking** — the Architecture card sits below the BentoGrid; the email address sub-panel sits inside the primary email card; the dashboard tile sits inside the Spotlight card. Each is one `bg-zinc-950/60` deeper.
3. **Brightness gradient, not shadow** — the deepest surface is `#09090b` (page), the elevated surface is `#18181b` (inputs, primary buttons at rest), the panel surface is `rgba(9,9,11,0.6)` (cards), and the hovered surface is `rgba(24,24,27,0.4)` (`zinc-900/40`). Lightness, not blur or shadow, signals elevation.

### Shadow Vocabulary
The codebase actively **disables** Tailwind shadows: `[class*="shadow-"] { box-shadow: var(--neo-sm) !important; }` (light-mode neumorphic) and `.dark` overrides. The only shadows that survive are explicit `[class*="shadow-["]` (arbitrary-value classes). In practice, the live page has:
- **`shadow-2xl`** on the Spotlight card container (the giant dashboard panel) — the only place shadows are actually applied.
- **`shadow-xs`** on the active project-pill and selected code-file tab.
- **`shadow-md shadow-signal-blue/20`** on the active jump-pill in the fan carousel.

The blanket Tailwind shadow override means **adding `shadow-lg` to a button does nothing** — write the elevation as a translate and a border-color shift instead.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only depth cue is the 1px hairline border. Shadows appear only on the largest containers (Spotlight card, modal backdrop) where the surrounding canvas is empty — never on buttons, inputs, or small cards.

**The Lift-By-Translate Rule.** Hover depth is always a `translate-y` shift (or `scale-105` on the smallest pills), paired with a border-color brightening and a background brightening. Never a `box-shadow` change.

## Shapes

A **uniform radius vocabulary** at three tiers, with one pill exception.

### Radii
- **md** (`0.75rem` = `rounded-xl`): the default for buttons, inputs, badges, tab pills, modal containers, the search field. Roughly 80% of all UI elements.
- **lg** (`1rem` = `rounded-2xl`): large surfaces — project cards (`rounded-2xl`), skill category cards (`rounded-2xl`), the email card, social-link cards, stat boxes.
- **sm** (`0.5rem` = `rounded-lg`): tight components — traffic-light dots, icon containers, the small `#tag` chips inside the project card body, the URL-bar mockup in the Spotlight card.
- **xs** (`0.375rem` = `rounded-md`): very tight — only on small icon tiles and the framework badge in the project header.
- **Pill** (`9999px`): full-rounded status badges (`Available for hire`), the active project jump-pill, the language badge, the "Full-Time / Freelance" tag.

### Form Language
- **Buttons** are `rounded-xl` rectangles with internal `gap-2` for icon+label pairs.
- **Cards** are `rounded-2xl` rectangles with 1px hairline borders.
- **The Spotlight card** uses `rounded-3xl` — its larger radius signals it is the heaviest element on the screen.
- **The browser mockup** inside the Spotlight card uses `rounded-xl` with a separate `rounded-2xl` for the title bar — a subtle inner-radius hierarchy.
- **Traffic-light dots** are perfect circles.
- **The Code Inspector editor frame** is `rounded-2xl` with `rounded-lg` for the title bar — a small but consistent inner-radius hierarchy.

### Borders
Every panel, card, button, input, badge, and chip carries a `1px` hairline border (`border-[1px] border-zinc-800`). This hairline is the only depth cue on the ground plane. Border colors brighten on hover (`border-zinc-700`) or stay on the active cyan-400 accent for selected tabs (`focus-visible:ring-2 focus-visible:ring-cyan-400/60`).

## Components

### Buttons (Three Tiers)
- **Primary CTA** (`bg-signal-blue hover:bg-metric-cyan text-accent`): Signal Blue at rest, Metric Cyan on hover, white text. Used for the highest-priority action on the page: GitHub Profile, View Details, Open Mail App, the primary "Copy Email Address" button. Always paired with `active:scale-95` and `focus-visible:ring-2 focus-visible:ring-cyan-400/60`.
- **Secondary CTA** (`bg-zinc-950/60 border-zinc-800 hover:border-zinc-700`): translucent panel fill with a hairline border, muted text. Used for "Copy Email" (hero), "Open Mail App" (contact), "Reset filters," "Try again." Border brightens on hover.
- **Tertiary / Text link** (`text-zinc-500 hover:text-signal-blue`): used for "View Projects →", "←/→ Keys or side click to cycle," the section nav footer links. No background, just a text-link color shift.
- **Icon button** (`p-2 rounded-lg`): used in the Navbar (theme toggle, mobile menu), the Spotlight carousel chevrons (prev/next), and the modal close. Square with `border-zinc-800` hairline.

### Project Jump Pills (Fan Carousel)
- **Active:** `bg-signal-blue text-white font-bold shadow-md shadow-signal-blue/20 scale-105`. The active pill is the only place a shadow + scale signal co-occurs.
- **Inactive:** `bg-slate-200/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 border border-slate-300/80 dark:border-slate-800`. Hovers brighten text and border to cyan.

### Chips / Tags
- **Tech-stack chips** (`bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:border-zinc-600`): monospace, 11px, icon + label.
- **Active filter chip** (`bg-signal-blue text-accent font-bold border-cyan-400`): inverted to Signal Blue on the project card.
- **Status pills** (`bg-active-emerald/15 text-active-emerald border-active-emerald/30`): Active Dev.
- **Spotlight eyebrow pill** (`bg-signal-blue/15 text-signal-blue-deep border-cyan-500/30`): "Featured Spotlight."
- **Architecture pill** (`bg-metric-cyan/10 text-metric-cyan border-metric-cyan/20`): "Architecture & Systems."
- **Status (Live Repos)** uses dynamic classes from `getDevStatus` — emerald for active, cyan for maintained, rose for archived. The dot color matches the badge color.

### Cards / Containers (Signature: ProjectSpotlightCard)
- **Corner Surface:** `rounded-3xl` on the Spotlight card; `rounded-2xl` on Standard and Architecture cards.
- **Background:** `bg-zinc-950/60`; deepens to `bg-zinc-950/95` in dark mode for the Spotlight card only.
- **Border:** `border border-slate-200/80 dark:border-slate-800` on Spotlight; `border-zinc-800` on Standard and Architecture.
- **Internal Padding:** `p-5 sm:p-6 md:p-8`.
- **Distinctive behavior:** the Spotlight card is the **engineering dashboard**: left column has badges, title, subtitle, description, View Details CTA; right column has a browser-window mockup (`rounded-2xl`, with traffic-light dots, URL bar, and inner image/dashboard tile). The card hover applies `hover:border-zinc-700 hover:bg-zinc-900/40` plus a 0.5px lift.

#### Dashboard Tile (Stitch Dashboard Style)
- **Layout:** three-column grid (`grid-cols-3 gap-2`) of architecture metrics — Throughput, Database, Security. Each tile has label + icon + metric value + progress bar.
- **Progress bars:** `bg-metric-cyan` on Track-Throughput and Track-Security; `bg-active-emerald` on Database.
- **Background:** `linear-gradient(135deg, #0a0e17 → #020617)` with a cyan dot-grid overlay (`radial-gradient(circle, #06b6d4 1px, transparent 1px)` at 16px spacing, 15% opacity).
- **Top status bar** with pulsing cyan dot + "Enterprise Live Node" / "Interactive App Engine" label.
- **Bottom telemetry stream bar** with a Terminal icon, `telemetry.stream: "Project" pipeline active`, and a green "● LIVE" indicator.

#### BentoGrid Layout
- **Card 1:** Featured Spotlight, full width (`md:col-span-2`), dual-column internal layout (left: badges/title/description/tech pills; right: flat dashboard preview).
- **Cards 2–5:** Standard, single-column (`md:col-span-1`), 2×2 grid. Year + category header, title, description, bottom-aligned tech pills.
- **Card 6:** Architecture, full width (`md:col-span-2`), horizontal bar with title, description, and a `View Repositories →` Metric-Cyan CTA.
- All three card variants share the same `hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-200 hover:-translate-y-0.5` formula.

### Navigation
- **Style:** sticky fixed top bar (`fixed top-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/80`). Brand wordmark on the left (`daniel` + Signal-Blue `.`), nav links centered-right, theme toggle on the far right.
- **Active state:** active link text is Signal Blue; inactive is `text-zinc-400 hover:text-white`. The legacy `nav a[data-active="true"]::after` underline pseudo-element is **defined in CSS but unused** in the current Navbar (the active style is just color).
- **Mobile:** collapses into a 2-col grid sheet (links on top, GitHub + Copy Email buttons below), all bordered panels.
- **Theme toggle:** always present, uses `Sun` / `Moon` lucide icons; active state when in dark uses `text-signal-blue` on the Sun icon.

### Modal (Project Detail)
- **Style:** React portal, full-screen dimmed backdrop (`bg-zinc-950/80`), centered panel with `bg-zinc-950/60 border-zinc-800 rounded-xl max-h-[calc(100dvh-3rem)]`.
- **Tabs:** Project Overview / Code Inspector (the latter has an "IDE" badge in zinc-800).
- **Header:** status pill + Featured badge + Category badge + Year badge + close button. Title in `text-2xl font-bold`.
- **Body:** Overview tab is a 2-col grid with feature list, tech tags, and a "LIVE" preview strip; Code tab embeds the `CodeInspector`.
- **Close:** Esc key, click on backdrop, or close button. Body scroll is locked while open.

### 3D Card Fan Carousel (Curated Spotlight)
- **Layout:** perspective container (`perspective: 1500px`), absolutely-positioned cards in a parabolic arc.
- **Card size:** responsive 11rem→18.5rem wide × 16.5rem→27rem tall across 5 breakpoints (480/640/768/1024).
- **Interaction:** swipe/touch (38px threshold), debounced navigation (250ms), ArrowLeft/ArrowRight keyboard nav. Click on a flanking card to center it.
- **GSAP animation:** parabolic vertical arc (`yPercent: yStepFactor * diff²`), 3D rotation (`rotateY`, `rotateZ`), 0.55s `power2.out` ease. Active card at `z-30` opacity 1; flanking cards at `z-20` opacity 1 (also 100% opaque); outer cards opacity 0, scale 0.65, z=-180.
- **Top Stage Bar:** `SPOTLIGHT 3D` cyan chip + category breadcrumb on the left, counter + chevron steppers on the right.
- **Bottom Jump Pills:** pill-shaped jump buttons (active = Signal Blue + scale-105 + shadow-md; inactive = `bg-zinc-900/40 text-zinc-500`).

### Code Inspector
- **Style:** IDE-frame editor with title bar (traffic-light dots + filename + UTF-8/language label), line-number gutter, syntax highlighting.
- **File tabs:** monospace, file-type icon (TS/JS/C#/SQL/PY/generic), selected tab is Signal Blue.
- **Live README button:** fetches `raw.githubusercontent.com/danielaplan/{repo}/main/README.md` (fallback to master) with 8s `AbortController` timeout. Falls back to curated architecture files on error.
- **Syntax highlighting:** strings (Active Emerald), keywords (purple), SQL keywords (Signal Blue), types (Metric Cyan), numbers (Signal Blue Deep). Tokenized via regex replacement — no external highlighter.
- **Action buttons:** Copy Code (with `Copied!` confirmation), GitHub link.

### Hero Section
- **Layout:** 12-col grid; right column holds the profile photo (`/profile.webp`) inside a `border-zinc-800 bg-zinc-950/60 rounded-2xl` frame, `aspect-[4/5]`, `group-hover:scale-103` on hover.
- **Headline stack:** pill (`3rd-Year BSIT @ University of Caloocan City` with GraduationCap icon), `text-8xl font-black` name, Signal Blue `Full-Stack Developer` subtitle, body description, location/specialization tags.
- **Stat Row:** three cards (`6+ Featured Builds`, `React · Node Core Stack`, `Active Available For Hire`) using `bg-zinc-950/60 border-zinc-800`.
- **CTAs:** GitHub Profile (Signal-Blue primary), Copy Email (zinc secondary), View Projects → (text link).
- **Profile image treatment:** `filter: grayscale(1) contrast(1.04)` applied globally to `img[alt="Daniel Aplan"]`.

### Footer
- **Style:** zinc-950 base with `border-t border-zinc-800/80`, copyright + "Crafted with React & Tailwind" on the left, section nav links centered, "Back to Top" zinc-pill button on the right. Lenis scroll-to-top via `window.__lenis.scrollTo(0, { duration: 1.2 })`.

## Do's and Don'ts

### Do:
- Do use the **panel formula** (`bg-zinc-950/60` + `border-zinc-800/80` + `rounded-2xl`) for every card. It is the only surface formula in the system.
- Do use the **three-tier lift** (`-translate-y-0.5` on hover + border brightens + bg brightens, `active:scale-95` on press) as the universal interaction pattern.
- Do use the **Signal Blue → Metric Cyan hover shift** on every primary CTA — `bg-signal-blue hover:bg-metric-cyan`. This dual-color transition is the signature.
- Do use **monospace eyebrows** (`// TECHNICAL PROFICIENCY`) in Signal Blue above every section heading.
- Do respect the **accent lane**: Signal Blue for interactive, Metric Cyan for live data and metrics, Active Emerald for status only, Amber for stars only.
- Do **fetch live GitHub data** (`fetchUserRepos('danielaplan')` with 15-min `localStorage` cache) for stars, language, last-pushed, dev-status. Treat the Live Repos view as real engineering telemetry, not decoration.
- Do **fall back honestly** when the GitHub API is rate-limited, offline, or returning 403 — show the `Couldn't load live GitHub data` panel with the original error message and a `Try again` button. Never silently substitute fake data.
- Do keep all motion **subtle and short** (`transition-all duration-200` is the default). The fan carousel arc and the spinning refresh icon are the only long-running animations.
- Do use **`focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none`** on every interactive element. Focus visibility is part of the craft.

### Don't:
- Don't reintroduce **glass blur, gradients, or drop shadows** on regular panels — they are actively disabled in `index.css` and would contradict the system's flat dark voice. The Spotlight card and modal backdrop are the only places shadows are permitted.
- Don't use **arbitrary Tailwind color utilities** (`bg-blue-500`, `text-emerald-600`) — they are silently overridden to zinc by the blanket `[class*="bg-blue-"]` / `[class*="text-*-"]` rules. Use the chromatic-safe classes (`bg-signal-blue`, `text-metric-cyan`, `bg-active-emerald`) or `bg-zinc-*` instead.
- Don't substitute **active-emerald for status-active** in interactive contexts — emerald is status-only, never interactive.
- Don't let primary CTAs use a **single-color hover** — always `hover:bg-metric-cyan` (cyan shift). Same-hue hover reads as dead.
- Don't add the **breathing dot grid canvas** unless wired through `App.jsx` — the `InteractiveDotGrid.jsx` component exists but is not in the render tree. Adding new instances must update `App.jsx`.
- Don't reintroduce the **neumorphic utilities** (`neo-raised-*`, `neo-inset`, `neo-press`) on new surfaces — they are defined but unused. Using them on a new component is a regression.
- Don't add a **font family switch** — Geist for everything, `ui-monospace` for technical metadata. No Inter, no Helvetica, no Söhne.
- Don't **disable the `prefers-reduced-motion` media query** — the existing rule disables ambient orbs, fan carousel transitions, and neo-press animations for users who request it. Preserve this.
- Don't treat **Tailwind shadow classes** as decoration — they are overridden to `neo-sm` (light mode) only. Use arbitrary `shadow-["…"]` syntax for genuine shadow needs.

## Accessibility & Inclusion

The build carries visible focus states (`focus-visible:ring-2 focus-visible:ring-cyan-400/60` on every interactive element), keyboard navigation for the fan carousel (ArrowLeft/ArrowRight), Esc to close the modal, `aria-label` on icon-only buttons, `aria-current="page"` on the active nav link, `aria-modal="true"` on the modal, `aria-roledescription="carousel"` and `"slide"` on the fan carousel, and `prefers-reduced-motion` support that disables the ambient orbs, fan carousel transitions, and neo-press animations. The mobile menu uses `aria-expanded`. Future work should preserve and extend these rather than regress them.