"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const BEAM_COUNT = 7;

export function LightBeams() {
  const groupRef = useRef<THREE.Group>(null);
  const { current } = useTheme();

  const beams = useMemo(
    () =>
      Array.from({ length: BEAM_COUNT }, (_, i) => ({
        x: (hash(i * 4.1) - 0.5) * 14,
        z: (hash(i * 9.3 + 3) - 0.5) * -6 - 2,
        height: 3 + hash(i * 2.7) * 4,
        speed: 0.15 + hash(i * 6.5) * 0.25,
        offset: hash(i * 3.3) * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((beam, i) => {
      const b = beams[i];
      beam.position.y = Math.sin(t * b.speed + b.offset) * 0.6;
      const mat = (beam as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.color.lerp(new THREE.Color(current.vars.glow), 0.04);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {beams.map((b, i) => (
        <mesh key={i} position={[b.x, 0, b.z]}>
          <planeGeometry args={[0.03, b.height]} />
          <meshBasicMaterial
            color={current.vars.glow}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
