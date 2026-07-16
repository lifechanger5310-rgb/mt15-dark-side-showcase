"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { ParticleField } from "./ParticleField";
import { LightBeams } from "./LightBeams";
import { CameraRig } from "./CameraRig";

/**
 * Ambient WebGL environment layer. Pitfall guards baked in per
 * Trackerfile.txt:
 *
 * 1. Reduced motion → the <Canvas> is never mounted at all (not just
 *    paused) — a static gradient div is rendered instead.
 * 2. Performance → mounting is gated behind IntersectionObserver so the
 *    WebGL context only initializes once this section is actually about
 *    to enter the viewport, keeping first paint light. Bloom is a real
 *    perf cost, so this gating matters more here than it did with the
 *    plain particle field.
 */
export function AmbientScene({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
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
          camera={{ position: [0, 0, 6], fov: 50, far: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <fog attach="fog" args={["#0b0b0e", 8, 26]} />
            <CameraRig />
            <ParticleField />
            <LightBeams />
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.8}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.15} darkness={0.6} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
