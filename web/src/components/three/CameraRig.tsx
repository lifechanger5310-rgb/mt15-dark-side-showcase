"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Subtle mouse-driven camera parallax — the kind of "the whole scene
 * gently reacts to your cursor" touch that makes Wonderland/Active
 * Theory-style sites feel alive rather than static. Deliberately small
 * range so it reads as ambient depth, not a gimmick.
 */
export function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  /* eslint-disable react-hooks/immutability -- mutating camera/scene objects returned by useThree() every frame is the standard, documented React Three Fiber pattern (that's what useFrame is for); this rule doesn't distinguish Three.js's imperative object model from React state */
  useFrame(() => {
    target.current.x = pointer.x * 0.6;
    target.current.y = pointer.y * 0.35;

    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (target.current.y - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}
