---
name: Daniel Aplan — Portfolio
description: A glassmorphism portfolio where live GitHub data drifts inside slow, calm motion.
colors:
  primary: "#3b82f6"
  primary-deep: "#2563eb"
  neutral-bg: "#f8fafc"
  neutral-bg-dark: "#020617"
  glass-light: "rgba(255, 255, 255, 0.92)"
  glass-dark: "rgba(15, 23, 42, 0.65)"
  ink-strong: "#0f172a"
  ink-muted: "#475569"
  ink-inverse: "#f8fafc"
  status-active: "#10b981"
  status-archived: "#f43f5e"
  status-maintained: "#06b6d4"
  star: "#f59e0b"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  sm: "8px"
  button: "12px"
  input: "16px"
  card: "24px"
  pill: "9999px"
spacing:
  container: "56rem"
  section: "3rem"
  gutter: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "0.625rem 1.25rem"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.button}"
    padding: "0.625rem 1.25rem"
  tag-chip:
    backgroundColor: "rgba(255, 255, 255, 0.8)"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
  card-project:
    backgroundColor: "{colors.glass-light}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  nav-pill:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
---

# Design System: Daniel Aplan — Portfolio

## Overview

**Creative North Star: "Liquid Aurora"**

This is a glassmorphism portfolio in which live engineering data drifts inside slow, calm motion. Frosted glass panels float over a dark-to-light field of softly animated gradient orbs — blue, indigo, violet, and cyan blooms that drift on 18–22 second loops behind everything. The surface is quiet at rest and reveals its life only on interaction: a card lifts a few pixels and a blue refraction glow tracks the cursor; a "Live Repos" tab shows real GitHub stars and last-pushed timestamps pulled at view time. The personality is premium but approachable — the craft is the proof of competence, not a separate decoration from it.

The system is built on Tailwind's default slate neutral scale with Signal Blue as the single interactive accent, and a small set of semantic status colors (emerald / rose / cyan / amber) reserved for repository state. Density is mid-weight: a 56rem reading column, generous section rhythm, and rounded glass surfaces. Motion is ambient and non-urgent; nothing on this surface hurries.

**Key Characteristics:**
- Frosted glass (blur + saturate + layered inset highlights) is the primary material, not a flat fill.
- Signal Blue is the only interactive accent and is used sparingly — its rarity is the point.
- Depth and life appear as a *response* (hover, focus, live data), never at rest.
- Live GitHub data is a first-class visual element, not a screenshot.
- Motion is slow and ambient (18–22s loops); the system feels calm, not busy.

## Colors

A cool slate field with a single confident blue accent and a restrained set of semantic status colors. Light mode is a soft `slate-50` page; dark mode drops to near-black `slate-950`. Glass surfaces are translucent white (light) or translucent slate (dark) so the ambient orbs glow through them.

### Primary
- **Signal Blue** (#3b82f6): the only interactive accent. Links, focus rings, the active nav pill, primary buttons, and the live-data glow on cards. Used on a small fraction of any screen so it always reads as "live / active."

### Neutral
- **Page Light** (#f8fafc): light-mode page background behind the glass.
- **Page Dark** (#020617): dark-mode page background.
- **Ink Strong** (#0f172a): primary text on light; inverts to near-white on dark.
- **Ink Muted** (#475569): secondary text, captions, tags.
- **Glass Light** (rgba(255,255,255,0.92)) / **Glass Dark** (rgba(15,23,42,0.65)): the translucent card and panel fills that let the aurora show through.

### Named Rules
**The Signal Blue Rule.** Signal Blue carries every interactive and "live" signal — links, focus, the active nav pill, and the card hover glow. It appears on roughly 10% or less of a screen; its scarcity is what makes it read as active rather than decorative.

## Typography

**Display Font:** Inter (with system-ui, Segoe UI, Roboto fallback)
**Body Font:** Inter (same stack)
**Label/Mono Font:** Inter for uppercase eyebrow labels; `ui-monospace` stack for code and tech-stack tags

**Character:** A single humanist sans across the whole system — Inter keeps the voice consistent and lets weight, size, and tracking do the hierarchy work. Uppercase tracked labels (section eyebrows, status pills) provide the only "loud" moments; everything else is calm body text.

### Hierarchy
- **Display** (700, clamp(1.875rem,5vw,3rem), 1.05, -0.02em): hero name and modal titles. Tracking-tight, confident.
- **Headline** (700, ~1.5–1.875rem): section headings ("Projects & Engineering").
- **Title** (600, ~1.125rem): card titles, modal sub-headers.
- **Body** (400, 0.875rem, 1.625): descriptions, captions, modal copy. Comfortable measure inside the 56rem column.
- **Label** (600, 0.6875rem, 0.05em, uppercase): section eyebrows, status pills, tag chips.

### Named Rules
**The One Voice Rule.** One typeface (Inter) for the entire system. Hierarchy comes from size, weight, and tracking — never from switching families.

## Layout

A single 56rem (`max-w-4xl`) reading column centered on the page, with `1.25rem` gutters that widen to `1.5rem` on small-and-up. Vertical rhythm uses `3rem` section padding (`py-12`), opening to `5rem` from `sm` up. The page is one long scroll: Hero → Projects → Skills → Contact, with scroll-spy nav and Lenis inertial smooth scrolling. The background is a fixed, `pointer-events-none` layer of four blurred gradient orbs plus a faint radial dot grid; all content sits above it at `z-10`. Responsive: the hero stacks (image below bio) below `md`, the projects grid is one column on mobile and two from `md`, and the contact cards go single-column on mobile.

## Elevation & Depth

Depth is built from **glass, not shadows**. Every surface is `backdrop-filter: blur(24px) saturate(190%)` over a translucent fill, finished with layered *inset* highlights (a top white sheen, a faint bottom shade) and a soft, low-opacity drop shadow. The signature depth cue is a **mouse-tracking radial refraction**: a blue radial gradient follows the cursor inside each card and fades in only on hover. Dark mode deepens the inset shadow and lowers surface opacity so the aurora reads through more strongly. Hard, opaque drop shadows are not used as the primary depth mechanism.

### Shadow Vocabulary
- **Glass Rest** (`0 8px 24px -6px rgba(0,0,0,0.04)` + inset sheen): default card depth in light mode.
- **Glass Hover** (`0 20px 40px -12px rgba(59,130,246,0.15)` + blue border): card on hover/focus, with a 2.5px lift.
- **Panel** (`0 12px 32px -8px rgba(0,0,0,0.05)`): modal and large glass containers.

### Named Rules
**The Resting Glass Rule.** Glass surfaces are calm and flat at rest. The blue refraction glow, the border brightening, and the lift appear only as a response to hover, focus, or live data — never by default.

## Shapes

Form language is soft and rounded. Project cards and modals use a large **24px** radius (`rounded-3xl`); buttons and inputs use **12–16px**; tag chips and the active nav indicator use a tighter **8px**; true pills (status badges, the nav container, social cues) are fully rounded. Every glass surface carries a `1px` hairline border (light: `rgba(226,232,240,…)`, dark: `rgba(255,255,255,0.09)`) that reads as the glass edge. Corners are always clipped to the surface radius (`overflow: hidden`) so the refraction glow stays contained.

## Components

### Buttons
- **Shape:** 12px radius (8px on compact icon buttons).
- **Primary:** Signal Blue Deep fill (`#2563eb`), white label; hover slightly darker, optional lift.
- **Secondary / Glass:** translucent white (`rgba(255,255,255,0.7)`) with hairline border, ink-strong label; hover toward solid white. Used for "Copy", "Send", social.
- **Icon button:** square, hairline border, muted icon; hover tints Signal Blue.

### Chips / Tags
- **Style:** 8px radius, translucent white fill, muted ink text, monospace for tech-stack tags.
- **State:** selected tag gets Signal Blue fill + white text; clicking a tag filters the project grid. Status pills (Active Dev / Maintained / Archived) are fully rounded with a colored dot and a semantic border (emerald / cyan / rose).

### Cards / Containers (Signature: Liquid Glass Card)
- **Corner Style:** 24px.
- **Background:** Glass Light translucent fill; `backdrop-filter: blur(24px) saturate(190%)`.
- **Border:** 1px hairline.
- **Internal Padding:** 1.5rem (1.75rem from `sm`).
- **Distinctive behavior:** a `::before` radial gradient tracks `--mouse-x` / `--mouse-y` and fades in on hover, giving a cursor-following refraction. Cards lift 2.5px and gain a blue glow on hover. This is the defining component of the system.

### Navigation
- **Style:** sticky top bar; desktop uses a rounded "floating pill" indicator that slides under the active link (position read from the tab's `offsetLeft`/`clientWidth`). A "Available for hire" status pill and a theme toggle sit at the right.
- **Mobile:** the same links collapse into a dropdown sheet; theme toggle and a GitHub/Copy row replace the desktop cluster.
- **Active state:** the pill is Signal Blue Deep with white text; inactive links are muted ink.

### Modal (Project detail)
- **Style:** a Glass Panel rendered through a React portal, dimmed blurred backdrop, 24px radius, capped at viewport height with internal scroll (`data-lenis-prevent`). Tabs switch between Overview and the Code Inspector. Esc closes and `body` scroll is locked while open.

## Do's and Don'ts

### Do:
- Do keep glass at `blur(24px) saturate(190%)` with the layered inset sheen — that is the material.
- Do reserve Signal Blue for interactive and "live" signals only; let it stay rare.
- Do keep the card mouse-refraction and the 2.5px hover lift — they are the signature life of the surface.
- Do keep motion slow (18–22s ambient loops) and ambient; the system should feel calm.
- Do keep content inside the 56rem column and above the `pointer-events-none` aurora layer.

### Don't:
- Don't use hard, opaque drop shadows as the primary depth cue — depth comes from glass + inset highlights + the hover glow.
- Don't introduce saturated neon colors outside the status set (emerald / rose / cyan / amber) — they would break the calm.
- Don't shrink control radii below 12px or card radii below 24px; the softness is the voice.
- Don't let ambient orbs sit above content or cover text — they stay behind and non-interactive.
- Don't treat Live Repos as decorative: it must show real GitHub data (stars, last-pushed) or fall back honestly to the error/cached state.
