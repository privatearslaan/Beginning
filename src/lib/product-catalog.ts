import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { normalizeProductImageUrl } from "@/lib/product-images";

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  petType: string;
  images: string[];
  featured: boolean;
};

type JsonProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  petType: string;
  images: string[];
  featured: boolean;
};

type ProductFilters = {
  q?: string;
  category?: string;
  petType?: string;
};

const FALLBACK_SERVICES = [
  {
    id: "fallback-grooming-full",
    name: "Full Grooming",
    description:
      "Complete bath, brush, nail trim, and ear cleaning for dogs and cats.",
    durationMin: 60,
    price: 1499,
    active: true,
    image: null,
  },
  {
    id: "fallback-grooming-nails",
    name: "Nail Trim",
    description:
      "Quick and gentle nail trimming for dogs, cats, and small pets.",
    durationMin: 15,
    price: 399,
    active: true,
    image: null,
  },
  {
    id: "fallback-grooming-wellness",
    name: "Wellness Checkup",
    description:
      "Basic health assessment including weight, coat, teeth, and general condition.",
    durationMin: 30,
    price: 899,
    active: true,
    image: null,
  },
] as const;

let cachedFallbackProducts: CatalogProduct[] | null = null;

function loadFallbackProducts(): CatalogProduct[] {
  if (cachedFallbackProducts) return cachedFallbackProducts;

  const jsonPath = resolve(process.cwd(), "prisma/happytails-products.json");
  if (!existsSync(jsonPath)) {
    cachedFallbackProducts = [];
    return cachedFallbackProducts;
  }

  const raw = JSON.parse(readFileSync(jsonPath, "utf8")) as JsonProduct[];
  cachedFallbackProducts = raw.map((product) => ({
    id: `fallback-${product.slug}`,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    petType: product.petType,
    images: product.images.map(normalizeProductImageUrl),
    featured: product.featured,
  }));

  return cachedFallbackProducts;
}

function mapDbProduct(product: {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Prisma.Decimal | number;
  stock: number;
  category: string;
  petType: string;
  images: unknown;
  featured: boolean;
}): CatalogProduct {
  const images = Array.isArray(product.images)
    ? product.images
        .filter((item): item is string => typeof item === "string")
        .map(normalizeProductImageUrl)
    : [];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    stock: product.stock,
    category: product.category,
    petType: product.petType,
    images,
    featured: product.featured,
  };
}

function filterFallbackProducts(
  products: CatalogProduct[],
  filters: ProductFilters,
): CatalogProduct[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.petType && product.petType !== filters.petType) return false;
    if (filters.q) {
      const query = filters.q.toLowerCase();
      const haystack = `${product.name} ${product.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export async function listProducts(filters: ProductFilters = {}): Promise<CatalogProduct[]> {
  try {
    const products = await db.product.findMany({
      where: {
        ...(filters.q && {
          OR: [
            { name: { contains: filters.q, mode: "insensitive" } },
            { description: { contains: filters.q, mode: "insensitive" } },
          ],
        }),
        ...(filters.category && { category: filters.category as never }),
        ...(filters.petType && { petType: filters.petType as never }),
      },
      orderBy: { name: "asc" },
    });
    return products.map(mapDbProduct);
  } catch (error) {
    console.error("Database unavailable, using fallback catalog:", error);
    return filterFallbackProducts(loadFallbackProducts(), filters).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }
}

export async function getFeaturedProducts(limit = 8): Promise<CatalogProduct[]> {
  try {
    const products = await db.product.findMany({
      where: { featured: true },
      orderBy: { name: "asc" },
      take: limit,
    });
    if (products.length > 0) {
      return products.map(mapDbProduct);
    }
  } catch (error) {
    console.error("Database unavailable, using fallback featured products:", error);
  }

  return loadFallbackProducts()
    .filter((product) => product.featured)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  try {
    const product = await db.product.findUnique({ where: { slug } });
    if (product) return mapDbProduct(product);
  } catch (error) {
    console.error("Database unavailable, using fallback product lookup:", error);
  }

  return loadFallbackProducts().find((product) => product.slug === slug) ?? null;
}

export async function listActiveServices() {
  try {
    return await db.service.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Database unavailable, using fallback services:", error);
    return [...FALLBACK_SERVICES];
  }
}

export async function getServiceById(id: string) {
  try {
    return await db.service.findUnique({ where: { id } });
  } catch (error) {
    console.error("Database unavailable, using fallback service lookup:", error);
    return FALLBACK_SERVICES.find((service) => service.id === id) ?? null;
  }
}

export function isFallbackProductId(id: string) {
  return id.startsWith("fallback-");
}
