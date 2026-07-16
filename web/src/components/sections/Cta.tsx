"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Cta() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cta" className="relative py-32 border-t border-white/5 grid-lines">
      <div ref={ref} className="mx-auto max-w-3xl px-6 lg:px-10 text-center opacity-0">
        <p className="eyebrow text-sm mb-6">Ready When You Are</p>
        <h2 className="heading text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Your next ride is <span className="text-accent">one colorway away.</span>
        </h2>
        <p className="mt-6 text-muted text-lg max-w-xl mx-auto">
          Find a Yamaha dealer near you and book a test ride on the MT-15
          today.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#" className="btn-primary">Find a Dealer</a>
          <a href="#specs" className="btn-outline">Review Specs Again</a>
        </div>
      </div>
    </section>
  );
}
