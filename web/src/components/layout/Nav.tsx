"use client";

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] border-b border-white/5 transition-colors duration-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#hero" className="heading text-2xl tracking-widest text-text">
          MT<span className="text-accent">·</span>15
        </a>
        <div className="hidden md:flex items-center gap-10 heading text-sm tracking-widest text-muted">
          <a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#specs" className="hover:text-accent transition-colors">Specs</a>
          <a href="#colors" className="hover:text-accent transition-colors">Colorways</a>
          <a href="#features" className="hover:text-accent transition-colors">Tech</a>
        </div>
        <a href="#cta" className="btn-primary !px-6 !py-3 text-sm">
          Book a Test Ride
        </a>
      </div>
    </nav>
  );
}
