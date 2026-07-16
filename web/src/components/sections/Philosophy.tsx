"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Philosophy() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="philosophy" className="relative py-32 border-t border-white/5">
      <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-10 text-center opacity-0">
        <p className="eyebrow text-sm mb-6">The Dark Side of Japan</p>
        <h2 className="heading text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Designed to look ready to attack —{" "}
          <span className="text-accent">even when it&apos;s parked.</span>
        </h2>
        <p className="mt-8 text-muted text-lg leading-relaxed max-w-2xl mx-auto">
          Every panel is pulled forward and low, like a predator settling into
          a crouch. Twin position lights and a compact LED headlight give the
          front end an intimidating stare, while the DeltaBox frame and
          forward-leaning tank keep the stance muscular from every angle.
          This isn&apos;t a bike that blends in — it&apos;s built for riders
          who&apos;d rather stand out.
        </p>
      </div>
    </section>
  );
}
