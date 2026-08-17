import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string) {
  const value = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function petTypeLabel(petType: string) {
  const labels: Record<string, string> = {
    DOG: "Dogs",
    CAT: "Cats",
    BIRD: "Birds",
    FISH: "Fish",
    SMALL_PET: "Small Pets",
    ALL: "All Pets",
  };
  return labels[petType] ?? petType;
}

export function paymentMethodLabel(method: string) {
  const labels: Record<string, string> = {
    COD: "Cash on Delivery",
  };
  return labels[method] ?? method;
}

export function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    FOOD: "Food",
    TOYS: "Toys",
    ACCESSORIES: "Accessories",
    HEALTH: "Health",
    GROOMING: "Grooming",
  };
  return labels[category] ?? category;
}
