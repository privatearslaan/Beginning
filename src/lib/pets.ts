export const PET_TYPES = [
  {
    value: "DOG",
    label: "Dogs",
    description: "Food, toys, and care for dogs",
    emoji: "🐕",
  },
  {
    value: "CAT",
    label: "Cats",
    description: "Everything for curious cats",
    emoji: "🐈",
  },
  {
    value: "BIRD",
    label: "Birds",
    description: "Seed mixes, cages, and more",
    emoji: "🐦",
  },
  {
    value: "FISH",
    label: "Fish",
    description: "Aquarium essentials",
    emoji: "🐠",
  },
  {
    value: "SMALL_PET",
    label: "Small Pets",
    description: "Hamsters, rabbits, and more",
    emoji: "🐹",
  },
] as const;

export type PetTypeValue = (typeof PET_TYPES)[number]["value"];

export const PET_TYPE_ORDER: PetTypeValue[] = PET_TYPES.map((pet) => pet.value);

export function petShopHref(petType: string, query?: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  params.set("petType", petType);
  if (query?.q) params.set("q", query.q);
  if (query?.category) params.set("category", query.category);
  return `/shop?${params.toString()}`;
}
