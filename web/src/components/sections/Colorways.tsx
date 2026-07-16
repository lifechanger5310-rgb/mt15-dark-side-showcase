"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Colorways() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const swatchesRef = useStaggerReveal<HTMLDivElement>();
  const { current, setColorway, colorways } = useTheme();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isFirst.current || prefersReduced || !imgWrapRef.current) {
      isFirst.current = false;
      return;
    }

    gsap.fromTo(
      imgWrapRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [current.id]);

  return (
    <section id="colors" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="max-w-xl mb-16 opacity-0">
          <p className="eyebrow text-sm mb-4">Colorways</p>
          <h2 className="heading text-4xl sm:text-5xl">Pick Your Vibe.</h2>
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

          <div className="relative flex items-center justify-center rounded-lg border border-white/5 bg-panel/50 py-10 grid-lines min-h-[320px] overflow-hidden">
            <div ref={imgWrapRef} className="relative w-full max-w-md aspect-square">
              <Image
                src={current.image}
                alt={`Yamaha MT-15 — ${current.name} colorway`}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                priority
              />
            </div>
            <p
              className="absolute bottom-4 left-1/2 -translate-x-1/2 heading text-sm tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              {current.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
