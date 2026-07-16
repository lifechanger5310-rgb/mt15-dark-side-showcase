"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Colorways() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const swatchesRef = useStaggerReveal<HTMLDivElement>();
  const { current, setColorway, colorways } = useTheme();

  return (
    <section id="colors" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="max-w-xl mb-16 opacity-0">
          <p className="eyebrow text-sm mb-4">Colorways</p>
          <h2 className="heading text-4xl sm:text-5xl">Pick Your Side.</h2>
          <p className="mt-4 text-muted">
            Selecting a colorway re-tints the entire site — try it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div ref={swatchesRef} className="flex lg:flex-col gap-4">
            {colorways.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorway(c.id)}
                className={`spec-card !p-5 text-left flex items-center gap-4 w-full opacity-0 transition-[border-color] duration-300 ${
                  current.id === c.id ? "border-accent" : ""
                }`}
                style={current.id === c.id ? { borderColor: "var(--color-accent)" } : undefined}
              >
                <span
                  className="h-10 w-10 rounded-full border border-white/10 shrink-0"
                  style={{ background: c.swatchHex }}
                />
                <span>
                  <span className="block heading tracking-wide">{c.name}</span>
                  <span className="block text-muted text-sm">{c.tagline}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center rounded-lg border border-white/5 bg-panel/50 py-16 grid-lines min-h-[320px]">
            <div className="text-center px-8">
              <p className="heading text-2xl mb-2" style={{ color: "var(--color-accent)" }}>
                {current.name}
              </p>
              <p className="text-muted text-sm max-w-xs mx-auto">
                Bike photo for this colorway goes here once AI-generated
                images are ready (Phase 5) — image swaps with a cross-fade
                matched to the theme transition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
