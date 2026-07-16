"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientScene } from "@/components/three/AmbientScene";
import { useTheme } from "@/components/theme/ThemeProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);
  const bikeImgWrapRef = useRef<HTMLDivElement>(null);
  const isFirstColorway = useRef(true);
  const { current } = useTheme();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isFirstColorway.current || prefersReduced || !bikeImgWrapRef.current) {
      isFirstColorway.current = false;
      return;
    }

    gsap.fromTo(
      bikeImgWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [current.id]);

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
            Your Bike.
            <br />
            Your Vibe.
            <br />
            <span className="text-accent">All Yours.</span>
          </h1>
          <p className="hero-sub mt-8 max-w-md text-muted text-lg opacity-0">
            A compact, sharp-edged Hyper Naked underneath — bows, hearts,
            paw prints, or a tiny dragon riding shotgun on top. Pick a
            colorway below and watch the whole site change with it.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap gap-4 opacity-0">
            <a href="#specs" className="btn-primary">Explore Specs</a>
            <a href="#colors" className="btn-outline">See Colorways</a>
          </div>
        </div>

        <div ref={bikeRef} className="hero-bike relative opacity-0">
          <div
            ref={bikeImgWrapRef}
            className="relative aspect-[4/3] w-full max-w-xl mx-auto"
          >
            <Image
              src={current.image}
              alt={`Yamaha MT-15 — ${current.name} colorway`}
              fill
              sizes="(max-width: 1024px) 90vw, 640px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              priority
            />
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
