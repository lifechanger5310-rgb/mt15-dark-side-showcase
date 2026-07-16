"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientScene } from "@/components/three/AmbientScene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = [
      ".hero-eyebrow",
      ".hero-heading",
      ".hero-sub",
      ".hero-cta",
      ".hero-bike",
      ".scroll-cue",
    ];

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.4)" } });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1)
        .fromTo(".hero-heading", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.25)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.7)
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.85)
        .fromTo(
          ".hero-bike",
          { opacity: 0, scale: 0.85, rotate: -4 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.1 },
          0.5
        )
        .to(".scroll-cue", { opacity: 1, duration: 0.6 }, 1.4);

      // Single scrub:true centerpiece moment — reserved for the hero only,
      // per the locked ScrollTrigger mode decision.
      if (bikeRef.current) {
        gsap.to(bikeRef.current, {
          yPercent: -12,
          scale: 1.05,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-lines"
    >
      <AmbientScene />

      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="hero-eyebrow eyebrow text-sm mb-6 opacity-0">
            Yamaha Hyper Naked · 155cc
          </p>
          <h1 className="hero-heading heading text-[15vw] leading-[0.85] sm:text-7xl lg:text-8xl opacity-0">
            Unleash
            <br />
            Your
            <br />
            <span className="text-accent">Dark Side.</span>
          </h1>
          <p className="hero-sub mt-8 max-w-md text-muted text-lg opacity-0">
            A compact, aggressive Hyper Naked built to attack every corner of
            the city. Sharp lines, an intimidating stare, and a chassis
            that&apos;s ready to pounce — even standing still.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap gap-4 opacity-0">
            <a href="#specs" className="btn-primary">Explore Specs</a>
            <a href="#colors" className="btn-outline">See Colorways</a>
          </div>
        </div>

        <div ref={bikeRef} className="hero-bike relative opacity-0">
          <div className="aspect-[4/3] w-full max-w-xl mx-auto rounded-lg border border-white/10 bg-panel/40 flex items-center justify-center">
            <p className="text-muted text-sm text-center px-8 heading tracking-widest">
              Hero image slot — AI-generated MT-15 photo goes here (Phase 5)
            </p>
          </div>
        </div>
      </div>

      <a
        href="#philosophy"
        className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 heading text-xs tracking-[0.3em] text-muted flex flex-col items-center gap-2 opacity-0"
      >
        Scroll
        <span className="block h-10 w-px bg-muted" />
      </a>
    </header>
  );
}
