# MT-15 — Dark Side Showcase

An unofficial, fan-made one-page showcase for the Yamaha MT-15, built as a demo project.
Not affiliated with or endorsed by Yamaha Motor Co., Ltd.

## Stack

- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config) + plain HTML/JS — no framework, no bundler
- **Motion:** GSAP 3.15 + ScrollTrigger, `gsap.matchMedia()` for `prefers-reduced-motion`
- **Layout:** Marketing/landing pattern, Tailwind default breakpoints + container-query-ready, 44px touch targets

## Design identity

- **Archetype:** Rebel/Outlaw
- **Palette:** near-black `#0B0B0E` base, electric cyan `#00D9FF` accent (echoes the real MT-15's Ice Storm Cyan colorway)
- **Type:** Bebas Neue (headings) + Inter (body)

## Motion intensity

- **Tier:** Dramatic (0.6–1.2s, `back.out` / `elastic.out`)
- **ScrollTrigger:** `scrub: true` reserved for the hero centerpiece parallax; discrete reveals everywhere else
- **Reduced motion:** fully disabled via `gsap.matchMedia()` — content appears in its end state instantly
- **Stagger:** light (0.05–0.1s) on grouped elements (spec cards, feature cards, color swatches)

## Local development

```bash
npm install
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
```

Then open `index.html` directly, or serve the folder with any static server.

## Notes

- The motorcycle illustration is an original stylized line-art SVG, not a photograph — no real
  product imagery is used, to avoid any copyright/trademark issue with official Yamaha photography.
- Specs shown are illustrative and sourced from public reporting; verify with an authorized dealer
  before relying on them.
