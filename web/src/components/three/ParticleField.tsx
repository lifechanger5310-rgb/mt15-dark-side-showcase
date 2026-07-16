"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

const PARTICLE_COUNT = 2600;

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

  // Wider, deeper volume than v1 — reads as an environment you're inside,
  // not a flat backdrop behind the content.
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (hash(i * 3.1) - 0.5) * 26; // x
      arr[i * 3 + 1] = (hash(i * 7.7 + 1) - 0.5) * 16; // y
      arr[i * 3 + 2] = (hash(i * 5.3 + 2) - 0.5) * 20 - 4; // z (biased back)
    }
    return arr;
  }, []);

  // Per-particle drift phase so motion doesn't look like uniform rotation.
  const phases = useMemo(
    () => Float32Array.from({ length: PARTICLE_COUNT }, (_, i) => hash(i * 1.9) * Math.PI * 2),
    []
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    const target = new THREE.Color(current.vars.glow);
    materialRef.current.color.lerp(target, 0.04);

    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0004;

      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const t = clock.getElapsedTime();
      for (let i = 0; i < PARTICLE_COUNT; i += 3) {
        // Sparse drift update (every 3rd particle/frame-ish) keeps this cheap
        // while still reading as gentle ambient motion across the field.
        const baseY = positions[i * 3 + 1];
        posAttr.array[i * 3 + 1] = baseY + Math.sin(t * 0.3 + phases[i]) * 0.4;
      }
      posAttr.needsUpdate = true;
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
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.6}
        color={current.vars.glow}
        depthWrite={false}
      />
    </points>
  );
}
