"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const specs = [
  {
    icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
    value: "18.4",
    unit: "PS",
    label: "Max Power @ 10,000 rpm",
  },
  {
    icon: "M12 7v5l3 2",
    circle: true,
    value: "14.1",
    unit: "Nm",
    label: "Max Torque @ 7,500 rpm",
  },
  {
    icon: "M12 3a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6",
    value: "155",
    unit: "cc",
    label: "Liquid-Cooled, VVA Single",
  },
  {
    icon: "M4 7h16v10H4zM8 7V5h8v2",
    value: "141",
    unit: "kg",
    label: "Kerb Weight",
  },
  {
    icon: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
    value: "6",
    unit: "-Speed",
    label: "Gearbox with Slipper Clutch",
  },
  {
    icon: "M4 20 10 8h4l6 12M8 20h8",
    value: "DeltaBox",
    unit: "",
    label: "High-Rigidity Frame",
  },
  {
    icon: "M6 3v18M18 3v18M6 9h12M6 15h12",
    value: "USD",
    unit: "",
    label: "Upside-Down Front Forks",
  },
  {
    icon: "M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Zm-3 10 2 2 4-4",
    value: "Dual ABS",
    unit: "",
    label: "Dual-Channel Anti-Lock Brakes",
  },
  {
    icon: "M12 2C9 6 6 10 6 14a6 6 0 0 0 12 0c0-4-3-8-6-12Z",
    value: "10",
    unit: "L",
    label: "Fuel Tank Capacity",
  },
];

export function Specs() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="specs" className="relative py-32 border-t border-white/5 grid-lines">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="max-w-xl mb-16 opacity-0">
          <p className="eyebrow text-sm mb-4">Performance</p>
          <h2 className="heading text-4xl sm:text-5xl">Built to Attack.</h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.map((spec) => (
            <div key={spec.label} className="spec-card opacity-0">
              <svg
                className="w-8 h-8 text-accent mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d={spec.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="heading text-3xl">
                {spec.value} <span className="text-base text-muted">{spec.unit}</span>
              </p>
              <p className="text-muted text-sm mt-1">{spec.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
