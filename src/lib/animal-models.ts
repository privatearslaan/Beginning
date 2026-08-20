export type AnimalKind = "dog" | "cat" | "bird" | "fish";

export type AnimalModelConfig = {
  url: string;
  scale: number;
  rotation?: [number, number, number];
  animation?: string;
  clipRange?: [number, number, number];
};

export const ANIMAL_GLB_MODELS: Record<AnimalKind, AnimalModelConfig> = {
  dog: {
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb",
    scale: 0.022,
    rotation: [0, Math.PI * 0.15, 0],
    animation: "Run",
  },
  cat: {
    url: "https://gobkit.com/freebies/animal/Red.glb",
    scale: 1.15,
    rotation: [0, -Math.PI / 3, 0],
    animation: "walk",
    clipRange: [90, 119, 24],
  },
  bird: {
    url: "https://gobkit.com/freebies/animalB/Owl.glb",
    scale: 1.1,
    rotation: [0, Math.PI / 4, 0],
    animation: "walk",
    clipRange: [90, 119, 24],
  },
  fish: {
    url: "https://gobkit.com/freebies/animal/Shark.glb",
    scale: 1.05,
    rotation: [0, Math.PI / 2, 0],
    animation: "walk",
    clipRange: [90, 119, 24],
  },
};

export const ANIMAL_PLACEMENTS: Record<
  AnimalKind,
  Array<{ position: [number, number, number]; scaleMultiplier: number }>
> = {
  dog: [
    { position: [-2.6, -0.85, -1.1], scaleMultiplier: 1.1 },
    { position: [3.1, 0.15, -2.1], scaleMultiplier: 0.85 },
  ],
  cat: [
    { position: [2.2, -1.15, -0.7], scaleMultiplier: 1 },
    { position: [-3.2, 0.55, -1.6], scaleMultiplier: 0.8 },
  ],
  bird: [
    { position: [-1.1, 1.55, -1.3], scaleMultiplier: 0.95 },
    { position: [3.6, 1.2, -2], scaleMultiplier: 0.7 },
  ],
  fish: [
    { position: [1.4, -1.45, -0.9], scaleMultiplier: 0.9 },
    { position: [-2.8, -1.2, -1.9], scaleMultiplier: 0.65 },
  ],
};

export function preloadAnimalModels(preload: (url: string) => void) {
  for (const model of Object.values(ANIMAL_GLB_MODELS)) {
    preload(model.url);
  }
}
