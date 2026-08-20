"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Sparkles, ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import { AnimalFigures } from "@/components/background/AnimalFigures";
import { AnimalInteractionProvider } from "@/components/background/AnimalInteractionContext";
import { AnimalInteractionManager } from "@/components/background/AnimalInteractionManager";
import {
  usePageAnimalTheme,
  type PageAnimalTheme,
} from "@/components/background/usePageAnimalTheme";

type SceneContentProps = {
  theme: PageAnimalTheme;
  reducedMotion: boolean;
  scrollY: number;
};

function SceneRig({ theme, reducedMotion, scrollY }: SceneContentProps) {
  const rigRef = useRef<Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!rigRef.current) return;

    const pointerX = reducedMotion ? 0 : mouseRef.current.x;
    const pointerY = reducedMotion ? 0 : mouseRef.current.y;
    const scrollOffset = reducedMotion ? 0 : scrollY * 0.0004;

    rigRef.current.rotation.y = pointerX * 0.28 + scrollOffset;
    rigRef.current.rotation.x = pointerY * 0.1 - 0.05;
    rigRef.current.position.y = -scrollOffset * 0.5;
  });

  return (
    <group ref={rigRef}>
      <AnimalFigures theme={theme} reducedMotion={reducedMotion} />
      {!reducedMotion && (
        <Sparkles
          count={Math.round(32 * theme.intensity)}
          scale={[12, 8, 6]}
          size={1.8}
          speed={0.25}
          color={theme.glow}
          opacity={0.35}
        />
      )}
    </group>
  );
}

function SceneContent(props: SceneContentProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={48} />
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 4, 6]} intensity={1.1} color={props.theme.accent} />
      <pointLight position={[-5, -2, 4]} intensity={0.7} color={props.theme.glow} />
      <AnimalInteractionManager reducedMotion={props.reducedMotion} />
      <SceneRig {...props} />
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.28}
        scale={14}
        blur={2.4}
        far={5}
      />
      <Environment preset="city" />
    </>
  );
}

export function AnimalScene3D() {
  const theme = usePageAnimalTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      className="animal-bg-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.5], fov: 48 }}
    >
      <Suspense fallback={null}>
        <AnimalInteractionProvider>
          <SceneContent
            theme={theme}
            reducedMotion={reducedMotion}
            scrollY={scrollY}
          />
        </AnimalInteractionProvider>
      </Suspense>
    </Canvas>
  );
}
