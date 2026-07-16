"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion: skip Lenis entirely, use native scroll.
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      // Dramatic-tier but still readable — smooth-scroll duration is
      // deliberately shorter than the Dramatic 0.6-1.2s animation tier
      // itself, otherwise scroll input starts to feel laggy/disconnected.
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    // Keep ScrollTrigger's internal scroll position in sync with Lenis
    // rather than the native scroll event — this is the documented
    // pairing pattern and avoids the drift issue that breaks pinning.
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Sanity check flagged in Trackerfile.txt: verify `position: sticky`
    // still works with Lenis active (Locomotive Scroll is known to break
    // it). Lenis uses native scroll (transform-free by default) so sticky
    // should hold — confirmed by testing the nav bar during Phase 4.

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
