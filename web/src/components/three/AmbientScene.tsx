"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

/**
 * Ambient WebGL background layer. Two pitfall guards baked in per
 * Trackerfile.txt:
 *
 * 1. Reduced motion → the <Canvas> is never mounted at all (not just
 *    paused) — a static gradient div is rendered instead.
 * 2. Performance → mounting is gated behind IntersectionObserver so the
 *    WebGL context only initializes once this section is actually about
 *    to enter the viewport, keeping first paint light.
 */
export function AmbientScene({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  // Lazy initializer reads external state once at mount — this is the
  // sanctioned pattern (unlike calling setState synchronously inside an
  // effect body, which React 19's react-hooks/set-state-in-effect rule
  // flags as causing an avoidable extra render).
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReduced || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <div
        ref={wrapperRef}
        className={`pointer-events-none absolute inset-0 opacity-20 ${className}`}
        style={{
          background:
            "radial-gradient(circle at 70% 50%, var(--color-glow) 0%, transparent 60%)",
        }}
      />
    );
  }

  return (
    <div ref={wrapperRef} className={`pointer-events-none absolute inset-0 ${className}`}>
      {shouldMount && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <ParticleField />
        </Canvas>
      )}
    </div>
  );
}
