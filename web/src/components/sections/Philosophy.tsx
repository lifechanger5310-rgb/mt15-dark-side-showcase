"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Philosophy() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="philosophy" className="relative py-32 border-t border-white/5">
      <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-10 text-center opacity-0">
        <p className="eyebrow text-sm mb-6">Make It Personal</p>
        <h2 className="heading text-4xl sm:text-5xl lg:text-6xl leading-tight">
          It&apos;s still a real streetfighter underneath —{" "}
          <span className="text-accent">the personality on top is up to you.</span>
        </h2>
        <p className="mt-8 text-muted text-lg leading-relaxed max-w-2xl mx-auto">
          Sharp panel lines, a compact LED headlight, and a muscular
          DeltaBox-framed tank — the same bones every MT-15 shares. What
          rides on top of that is entirely yours to choose: soft pastels,
          bows and hearts, or a tiny dragon perched on the headlight. This
          isn&apos;t a bike that has to look like everyone else&apos;s.
        </p>
      </div>
    </section>
  );
}
