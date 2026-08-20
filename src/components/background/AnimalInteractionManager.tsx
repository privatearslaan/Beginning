"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";
import { useAnimalInteraction } from "@/components/background/AnimalInteractionContext";

type AnimalInteractionManagerProps = {
  reducedMotion: boolean;
};

function findAnimalId(
  object: { uuid: string; parent: typeof object | null },
  animalUuids: Map<string, string>,
) {
  let current: typeof object | null = object;
  while (current) {
    for (const [id, uuid] of animalUuids.entries()) {
      if (current.uuid === uuid) return id;
    }
    current = current.parent;
  }
  return null;
}

export function AnimalInteractionManager({
  reducedMotion,
}: AnimalInteractionManagerProps) {
  const { camera, scene } = useThree();
  const { setHoveredId, setSelectedId, animalUuids } = useAnimalInteraction();
  const mouse = useRef(new Vector2(0, 0));
  const raycaster = useRef(new Raycaster());
  const uuidMapRef = useRef(animalUuids);

  uuidMapRef.current = animalUuids;

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      raycaster.current.setFromCamera(mouse.current, camera);
      const hits = raycaster.current.intersectObjects(scene.children, true);
      const first = hits[0];
      if (!first) {
        setSelectedId(null);
        return;
      }
      const id = findAnimalId(first.object, uuidMapRef.current);
      setSelectedId(id);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.body.style.cursor = "";
    };
  }, [camera, reducedMotion, scene, setSelectedId]);

  useFrame(() => {
    if (reducedMotion || uuidMapRef.current.size === 0) {
      setHoveredId(null);
      return;
    }

    raycaster.current.setFromCamera(mouse.current, camera);
    const hits = raycaster.current.intersectObjects(scene.children, true);
    const first = hits[0];
    const nextHover = first ? findAnimalId(first.object, uuidMapRef.current) : null;

    setHoveredId(nextHover);
    document.body.style.cursor = nextHover ? "pointer" : "";
  });

  return null;
}
