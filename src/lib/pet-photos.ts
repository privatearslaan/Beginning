export type PetPhoto = {
  id: string;
  src: string;
  alt: string;
  label: string;
  href?: string;
};

export const PET_GALLERY_PHOTOS: PetPhoto[] = [
  {
    id: "golden-puppy",
    src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a548?auto=format&fit=crop&w=900&q=80",
    alt: "Golden retriever puppy",
    label: "Puppy Care",
    href: "/shop?petType=DOG",
  },
  {
    id: "tabby-cat",
    src: "https://images.unsplash.com/photo-1514888286974-6ca0282a6089?auto=format&fit=crop&w=900&q=80",
    alt: "Tabby cat portrait",
    label: "Cat Food",
    href: "/shop?petType=CAT",
  },
  {
    id: "happy-dog",
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    alt: "Happy dog outdoors",
    label: "Dog Essentials",
    href: "/shop?petType=DOG",
  },
  {
    id: "grooming",
    src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80",
    alt: "Pet grooming session",
    label: "Grooming",
    href: "/services",
  },
  {
    id: "cat-play",
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",
    alt: "Playful cat",
    label: "Toys & Treats",
    href: "/shop?category=TOYS",
  },
  {
    id: "pet-family",
    src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80",
    alt: "Pet parent with dog",
    label: "Happy Tails",
    href: "/about",
  },
  {
    id: "bird",
    src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80",
    alt: "Colorful bird",
    label: "Small Pets",
    href: "/shop",
  },
  {
    id: "fish",
    src: "https://images.unsplash.com/photo-1544551763-46ef22843bdd?auto=format&fit=crop&w=900&q=80",
    alt: "Aquarium fish",
    label: "Aquatic",
    href: "/shop",
  },
];

export const GROOMING_GALLERY = PET_GALLERY_PHOTOS.filter((photo) =>
  ["grooming", "happy-dog", "golden-puppy"].includes(photo.id),
);

export const HERO_PET_STACK = PET_GALLERY_PHOTOS.slice(0, 4);

export const PAGE_HERO_PHOTOS = {
  shop: PET_GALLERY_PHOTOS.filter((p) =>
    ["happy-dog", "tabby-cat", "golden-puppy"].includes(p.id),
  ),
  services: PET_GALLERY_PHOTOS.filter((p) =>
    ["grooming", "happy-dog", "cat-play"].includes(p.id),
  ),
  blog: PET_GALLERY_PHOTOS.filter((p) =>
    ["cat-play", "tabby-cat", "pet-family"].includes(p.id),
  ),
} as const;
