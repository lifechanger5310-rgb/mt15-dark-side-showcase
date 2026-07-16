"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Discrete, fire-once-on-enter reveal for a single element.
 * Per Trackerfile.txt: Dramatic tier (0.6-1.2s, power/back easing),
 * discrete (no scrub) for anything below the hero, fully disabled
 * (not just shortened) under prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Light-stagger reveal (0.05-0.1s) for a grid/group of children —
 * spec cards, feature cards, color swatches.
 */
export function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = Array.from(el.children) as HTMLElement[];

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.2)",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
