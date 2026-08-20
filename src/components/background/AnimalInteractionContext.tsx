"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AnimalInteractionContextValue = {
  hoveredId: string | null;
  selectedId: string | null;
  setHoveredId: (id: string | null) => void;
  setSelectedId: (id: string | null) => void;
  registerAnimal: (id: string, object: { uuid: string }) => void;
  unregisterAnimal: (id: string) => void;
  animalUuids: Map<string, string>;
};

const AnimalInteractionContext = createContext<AnimalInteractionContextValue | null>(
  null,
);

export function AnimalInteractionProvider({ children }: { children: ReactNode }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [animalUuids, setAnimalUuids] = useState<Map<string, string>>(
    () => new Map(),
  );

  const value = useMemo(
    () => ({
      hoveredId,
      selectedId,
      setHoveredId,
      setSelectedId,
      registerAnimal: (id: string, object: { uuid: string }) => {
        setAnimalUuids((current) => {
          const next = new Map(current);
          next.set(id, object.uuid);
          return next;
        });
      },
      unregisterAnimal: (id: string) => {
        setAnimalUuids((current) => {
          const next = new Map(current);
          next.delete(id);
          return next;
        });
      },
      animalUuids,
    }),
    [animalUuids, hoveredId, selectedId],
  );

  return (
    <AnimalInteractionContext.Provider value={value}>
      {children}
    </AnimalInteractionContext.Provider>
  );
}

export function useAnimalInteraction() {
  const context = useContext(AnimalInteractionContext);
  if (!context) {
    throw new Error("useAnimalInteraction must be used within AnimalInteractionProvider");
  }
  return context;
}
