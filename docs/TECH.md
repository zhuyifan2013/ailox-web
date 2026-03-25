# Ailox Web — Technical Document

## Stack Overview

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + static gen, SEO-friendly, excellent DX |
| Language | TypeScript | Type safety, long-term maintainability |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Animations | Framer Motion | Best-in-class React animation library |
| 3D / WebGL | Three.js + React Three Fiber + Drei | Declarative 3D, good ecosystem |
| Scroll | Lenis | Silky smooth scrolling |
| Icons | Lucide React | Consistent, tree-shakeable icon set |
| Theme | next-themes | Dark/light mode support |
| Utils | clsx | Conditional class name merging |

---

## Project Structure

```
ailox-web/
├── app/
│   ├── layout.tsx          # Root layout — metadata, Lenis provider
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, Tailwind base, utilities
│
├── components/
│   ├── sections/           # Full-page sections (one per scroll area)
│   │   ├── HeroSection.tsx         # Three.js star field + animated brand name
│   │   ├── PhilosophySection.tsx   # Stats + 3 philosophy cards
│   │   ├── EcosystemSection.tsx    # Interactive 3D ecosystem graph
│   │   ├── AppShowcase.tsx         # 4-column app grid with 3D tilt cards
│   │   ├── AIFeatures.tsx          # Neural net SVG bg + AI chat demo
│   │   └── Roadmap.tsx             # Vertical timeline
│   │
│   ├── three/              # React Three Fiber components
│   │   ├── StarField.tsx           # Animated star field for Hero
│   │   └── EcosystemGraph.tsx      # Interactive 3D node graph
│   │
│   └── ui/                 # Reusable UI primitives
│       ├── AppCard.tsx             # App card with 3D tilt on hover
│       ├── GlassCard.tsx           # Glassmorphism card with scroll-in animation
│       ├── TimelineNode.tsx        # Roadmap timeline node + item
│       └── LenisProvider.tsx       # Client-side smooth scroll provider
│
├── lib/
│   └── apps-data.ts        # All app data, stats, philosophy, roadmap
│
├── docs/
│   ├── PRODUCT.md          # Product vision, app roster, competitive analysis
│   └── TECH.md             # This file
│
└── public/
    └── apps/               # App icons and screenshots (to be added)
```

---

## Design System

### Colors

```css
--bg-deep:      #0a0a0f   /* Primary background — deep space black */
--color-primary: #6366f1  /* Indigo — brand primary */
--color-cyan:   #06b6d4   /* Cyan — secondary accent */
--color-accent: #f0abfc   /* Pink-purple — highlight accent */
--color-text:   #f8fafc   /* Near-white — primary text */
--card-bg:      rgba(255,255,255,0.05)  /* Glass card background */
```

### Typography

- **Font:** Geist Sans (variable) for UI, Geist Mono for labels/code
- **Scale:** Tailwind defaults (text-sm through text-9xl)
- **Gradient text:** Used for section headings with `bg-clip-text`

### Section Background Progression

```
Hero:         #0a0a0f  (with aurora animation)
Philosophy:   #0d0d1a
Ecosystem:    #08080f
App Showcase: #0a0a0f
AI Features:  #06060e
Roadmap:      #0a0a0f
```

Subtle variation prevents the page from looking flat while keeping the dark theme.

---

## Key Components

### `StarField.tsx`
- Uses `@react-three/drei` `<Stars>` component
- Mouse movement drives slow rotation via `useFrame`
- Loaded with `next/dynamic` (SSR: false) to avoid hydration issues

### `EcosystemGraph.tsx`
- 8 app nodes placed in an elliptical orbit around a central "Core" node
- Auto-rotates via `useFrame`
- Hover state per node: glows brighter, shows tooltip via `<Html center>`
- Connection lines via `@react-three/drei` `<Line>`

### `AppCard.tsx`
- Pure CSS 3D tilt driven by `onMouseMove` — no library needed
- `perspective(1000px) rotateX() rotateY()` applied directly to `card.style.transform`
- Framer Motion handles scroll-in animation

### `LenisProvider.tsx`
- Wraps the entire app
- Uses the `lenis` package (updated from deprecated `@studio-freight/lenis`)
- Drives `requestAnimationFrame` loop for smooth scrolling

---

## Performance Notes

- All Three.js canvases use `dynamic()` with `ssr: false` to prevent SSO issues
- `Stars` component: `count={5000}` — acceptable for most GPUs, tune down if needed
- Framer Motion `whileInView` with `{ once: true }` — animations trigger once, no re-render on re-scroll
- `willChange: "transform"` on AppCard for GPU-accelerated tilt

---

## Development

```bash
npm run dev     # Start dev server on localhost:3000
npm run build   # Production build
npm run start   # Serve production build
```

---

## TODO / Next Steps

- [ ] Add real app screenshots to `public/apps/`
- [ ] Implement GSAP ScrollTrigger for more complex scroll-driven animations
- [ ] Add a navigation bar (sticky, blur backdrop)
- [ ] Implement `next-themes` dark/light toggle in nav
- [ ] Connect CTA buttons to actual app URLs or waitlist form
- [ ] Add OG image for social sharing
- [ ] Performance audit with Lighthouse
- [ ] Mobile responsiveness pass on EcosystemGraph (may need 2D fallback)
