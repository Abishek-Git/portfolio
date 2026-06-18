# Portfolio — Abisheak S

Personal portfolio website built with **Angular 21** (standalone components), featuring a multi-theme system, Three.js particle background, and scroll animations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 21 (standalone components) |
| Language | TypeScript 5.9 |
| Styling | SCSS + CSS custom properties |
| Effects | Three.js (particle background) |
| Build | Angular CLI + esbuild |
| Package Manager | npm |

## Features

- **4 Themes** — Dark, Light, Cyberpunk, Orange (cycle with toggle button)
- **Particle Background** — Interactive Three.js canvas
- **Custom Cursor** — Animated cursor following mouse
- **Scroll Reveal** — Elements animate on scroll
- **Inline SVG Icons** — Theme-adaptive skill icons using `currentColor`
- **Skill Card Hover** — Scale + glow + accent color effects on hover
- **Achievements Marquee** — Auto-scrolling horizontal carousel with nav buttons
- **Social Link Icons** — SVG icons for LinkedIn, GitHub, LeetCode in contact section
- **Single Page** — No routing, smooth scrollable layout
- **Responsive** — Mobile-first design

## Project Structure

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.config.ts             # App config (no router)
│   ├── app.html / app.scss       # Root template & styles
│   ├── components/
│   │   ├── navbar/               # Fixed navigation + theme toggle
│   │   ├── hero/                 # Landing with typing animation
│   │   ├── about/                # Summary section
│   │   ├── skills/               # Tech stack grid with hover effects
│   │   ├── experience/           # Work timeline
│   │   ├── projects/             # Project cards
│   │   ├── achievements/         # Marquee carousel with nav buttons
│   │   ├── contact/              # Contact form + social icons
│   │   ├── footer/               # Footer
│   │   ├── particle-bg/          # Three.js background
│   │   ├── custom-cursor/        # Cursor effect
│   │   └── profile-card/         # Profile widget
│   ├── data/
│   │   └── portfolio.data.ts     # All content data
│   ├── directives/
│   │   └── scroll-reveal.directive.ts
│   └── services/
│       ├── theme.service.ts      # Theme management
│       └── cursor.service.ts     # Cursor state
├── styles.scss                   # Global styles & theme variables
└── index.html
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start
# → http://localhost:4200

# Production build
npm run build

# Run tests
npm test
```

## Architecture Notes

- **All components are standalone** — no NgModules anywhere
- **Angular control flow** — uses `@if`, `@for`, `@switch` (not structural directives)
- **Signals** for state — `signal()`, `computed()`, `effect()`
- **No routing** — single-page scrollable app
- **Data-driven** — all content in `portfolio.data.ts`, UI reads from `PORTFOLIO` constant
- **Theme via CSS custom properties** — `data-theme` attribute on `<html>`, variables in `styles.scss`

## Adding Content

### New Skill
1. Add to `PORTFOLIO.skills` in `src/app/data/portfolio.data.ts`
2. Add SVG icon to `SKILL_ICONS` in `src/app/components/skills/skills.component.ts`
   - Must use `fill="currentColor"` for theme adaptation

### New Section
1. `ng generate component components/section-name`
2. Import in `src/app/app.ts` and add to `src/app/app.html`

### Theme Colors
Edit `src/styles.scss` under `[data-theme="dark|light|cyberpunk|orange"]` selectors

## License

Private — All rights reserved.
