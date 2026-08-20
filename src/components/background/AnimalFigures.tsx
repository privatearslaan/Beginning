"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF, useAnimations, Billboard, useTexture } from "@react-three/drei";
import { AnimationUtils, Mesh } from "three";
import type { Group } from "three";
import { useAnimalInteraction } from "@/components/background/AnimalInteractionContext";
import type { PageAnimalTheme } from "@/components/background/usePageAnimalTheme";
import {
  ANIMAL_GLB_MODELS,
  ANIMAL_PLACEMENTS,
  type AnimalKind,
  type AnimalModelConfig,
} from "@/lib/animal-models";
import { PET_GALLERY_PHOTOS } from "@/lib/pet-photos";

type GltfAnimalProps = {
  id: string;
  model: AnimalModelConfig;
  position: [number, number, number];
  scale: number;
  reducedMotion?: boolean;
};

function findRootUuid(object: Group) {
  return object.uuid;
}

function GltfAnimal({
  id,
  model,
  position,
  scale,
  reducedMotion = false,
}: GltfAnimalProps) {
  const groupRef = useRef<Group>(null);
  const targetScale = useRef(scale);
  const { scene, animations } = useGLTF(model.url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { hoveredId, selectedId, registerAnimal, unregisterAnimal } =
    useAnimalInteraction();

  const isHovered = hoveredId === id;
  const isSelected = selectedId === id;

  const clips = useMemo(() => {
    if (isSelected && model.clipRange && animations[0]) {
      const [from, to, fps] = model.clipRange;
      return [
        AnimationUtils.subclip(animations[0], "attack", 30, 59, fps),
      ];
    }
    if (model.clipRange && animations[0]) {
      const [from, to, fps] = model.clipRange;
      return [
        AnimationUtils.subclip(animations[0], model.animation ?? "walk", from, to, fps),
      ];
    }
    if (model.animation) {
      const named = animations.find((clip) => clip.name === model.animation);
      if (named) return [named];
    }
    return animations.slice(0, 1);
  }, [animations, isSelected, model.animation, model.clipRange]);

  const { actions } = useAnimations(clips, groupRef);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    if (!groupRef.current) return;
    registerAnimal(id, groupRef.current);
    return () => unregisterAnimal(id);
  }, [id, registerAnimal, unregisterAnimal]);

  useEffect(() => {
    const action = actions[clips[0]?.name ?? ""];
    if (!action) return;

    if (reducedMotion) {
      action.stop();
      return;
    }

    action.reset().fadeIn(0.25).play();
    return () => {
      action.fadeOut(0.15);
    };
  }, [actions, clips, reducedMotion]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const boost = isSelected ? 1.14 : isHovered ? 1.08 : 1;
    targetScale.current = scale * boost;
    const next = groupRef.current.scale.x + (targetScale.current - groupRef.current.scale.x) * delta * 6;
    groupRef.current.scale.setScalar(next);

    if (!reducedMotion) {
      groupRef.current.rotation.y +=
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.004;
    }
  });

  return (
    <Float speed={isHovered ? 1.6 : 1.1} rotationIntensity={0.12} floatIntensity={0.35}>
      <group
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={model.rotation ?? [0, 0, 0]}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

function PhotoBillboard({
  src,
  position,
  scale = 1,
}: {
  src: string;
  position: [number, number, number];
  scale?: number;
}) {
  const texture = useTexture(src);

  return (
    <Billboard position={position} follow lockX lockY lockZ>
      <mesh scale={[0.9 * scale, 0.65 * scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.45}
          metalness={0.05}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]} scale={[0.94 * scale, 0.7 * scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
    </Billboard>
  );
}

function PetPhotoBillboards() {
  const photos = PET_GALLERY_PHOTOS.slice(0, 5);
  const positions: Array<[number, number, number]> = [
    [-4.2, 1.4, -2.4],
    [4.5, 0.6, -2.8],
    [-3.8, -1.8, -1.6],
    [3.6, -1.2, -2],
    [0.2, 2.2, -3.2],
  ];

  return (
    <group>
      {photos.map((photo, index) => (
        <PhotoBillboard
          key={photo.id}
          src={photo.src}
          position={positions[index] ?? [0, 0, -2]}
          scale={0.85 + (index % 2) * 0.1}
        />
      ))}
    </group>
  );
}

type AnimalFiguresProps = {
  theme: PageAnimalTheme;
  reducedMotion?: boolean;
};

export function AnimalFigures({ theme, reducedMotion = false }: AnimalFiguresProps) {
  return (
    <group>
      <PetPhotoBillboards />
      {theme.animals.flatMap((kind: AnimalKind) =>
        ANIMAL_PLACEMENTS[kind].map((placement, index) => {
          const model = ANIMAL_GLB_MODELS[kind];
          const scale = model.scale * placement.scaleMultiplier * theme.intensity;
          const id = `${kind}-${index}`;

          return (
            <GltfAnimal
              key={id}
              id={id}
              model={model}
              position={placement.position}
              scale={scale}
              reducedMotion={reducedMotion}
            />
          );
        }),
      )}
    </group>
  );
}

for (const model of Object.values(ANIMAL_GLB_MODELS)) {
  useGLTF.preload(model.url);
}

for (const photo of PET_GALLERY_PHOTOS.slice(0, 5)) {
  useTexture.preload(photo.src);
}
