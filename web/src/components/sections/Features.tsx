"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: "M3 6h18v12H3zM7 10h4M7 14h2",
    title: "Full-Color TFT",
    desc: "Clear, connected instrument cluster.",
  },
  {
    icon: "M12 2v20M7 6l5-4 5 4M7 18l5 4 5-4",
    title: "Y-Connect",
    desc: "Bluetooth notifications & ride data.",
  },
  {
    icon: "M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Zm-3 10 2 2 4-4",
    title: "Traction Control",
    desc: "Confident grip in slippery conditions.",
  },
  {
    icon: "M12 2a4 4 0 0 0-4 4 4 4 0 0 0 8 0 4 4 0 0 0-4-4ZM6 8a6 6 0 0 0 12 0M12 12v8M9 20h6",
    title: "LED Headlight",
    desc: "Intimidating stare, front & center.",
  },
];

export function Features() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="features" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="max-w-xl mb-16 opacity-0">
          <p className="eyebrow text-sm mb-4">Technology</p>
          <h2 className="heading text-4xl sm:text-5xl">Smart Enough to Keep Up.</h2>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="spec-card opacity-0">
              <svg
                className="w-7 h-7 text-accent mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="heading text-lg">{f.title}</p>
              <p className="text-muted text-sm mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
