"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

const PARTICLE_COUNT = 1200;

// Deterministic pseudo-random hash — pure function of the seed, so it's
// safe to call during render (unlike Math.random, which React 19's
// react-hooks/purity rule flags as impure). Produces the same scattered
// look every render/mount without actually being random.
function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { current } = useTheme();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (hash(i * 3.1) - 0.5) * 18; // x
      arr[i * 3 + 1] = (hash(i * 7.7 + 1) - 0.5) * 10; // y
      arr[i * 3 + 2] = (hash(i * 5.3 + 2) - 0.5) * 8; // z
    }
    return arr;
  }, []);

  // Smoothly retint particles when the colorway changes, rather than
  // snapping — keeps the WebGL layer in sync with the DOM's GSAP tween.
  useFrame(() => {
    if (!materialRef.current) return;
    const target = new THREE.Color(current.vars.glow);
    materialRef.current.color.lerp(target, 0.04);

    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0006;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        color={current.vars.glow}
        depthWrite={false}
      />
    </points>
  );
}
