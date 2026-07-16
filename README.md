# MT-15 — Make It Yours (Immersive Rebuild v2)

An unofficial, fan-made showcase for the Yamaha MT-15, built as a demo project.
Not affiliated with or endorsed by Yamaha Motor Co., Ltd.

**This is the in-progress immersive rebuild.** The original vanilla-JS version
is preserved at git tag [`v1-vanilla-showcase`](../../tree/v1-vanilla-showcase).

See `Trackerfile.txt` for the full spec, decisions, pitfalls, and step-by-step
build log — read it before making any changes on this branch.

## Stack

- Next.js + TypeScript + React (app lives in `/web`)
- Tailwind CSS v4 (CSS-first `@theme`, runtime-overridable CSS vars for theming)
- GSAP + ScrollTrigger (Dramatic-tier motion, discrete reveals + one scrub hero moment)
- Lenis (smooth scroll, synced to ScrollTrigger)
- React Three Fiber + drei (ambient WebGL particle/glow layer, lazy-mounted)

## Local development

```bash
cd web
npm install
npm run dev
```

## Notes

- Imagery is AI-generated (not official Yamaha photography) — see Trackerfile.txt Phase 5.
- Full site color theme dynamically re-tints based on the selected MT-15 colorway.
