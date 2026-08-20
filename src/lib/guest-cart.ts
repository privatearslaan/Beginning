import { cookies } from "next/headers";
import type { CartLineItem } from "@/lib/cart-types";
import { priceAsDecimal } from "@/lib/cart-types";
import { getProductBySlug, type CatalogProduct } from "@/lib/product-catalog";

const GUEST_CART_COOKIE = "guest_cart";

type GuestCartEntry = {
  slug: string;
  quantity: number;
};

function guestItemId(slug: string) {
  return `guest-${slug}`;
}

function parseGuestCart(raw: string | undefined): GuestCartEntry[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry) => {
      if (
        typeof entry === "object" &&
        entry !== null &&
        "slug" in entry &&
        "quantity" in entry &&
        typeof entry.slug === "string" &&
        typeof entry.quantity === "number" &&
        entry.quantity > 0
      ) {
        return [{ slug: entry.slug, quantity: entry.quantity }];
      }
      return [];
    });
  } catch {
    return [];
  }
}

function toCartLineItem(product: CatalogProduct, quantity: number): CartLineItem {
  return {
    id: guestItemId(product.slug),
    quantity,
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: priceAsDecimal(product.price),
      images: product.images,
      stock: product.stock,
    },
  };
}

async function readGuestCartEntries(): Promise<GuestCartEntry[]> {
  const cookieStore = await cookies();
  return parseGuestCart(cookieStore.get(GUEST_CART_COOKIE)?.value);
}

async function writeGuestCartEntries(entries: GuestCartEntry[]) {
  const cookieStore = await cookies();
  if (entries.length === 0) {
    cookieStore.delete(GUEST_CART_COOKIE);
    return;
  }

  cookieStore.set(GUEST_CART_COOKIE, JSON.stringify(entries), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getGuestCartItems(): Promise<CartLineItem[]> {
  const entries = await readGuestCartEntries();
  const items: CartLineItem[] = [];

  for (const entry of entries) {
    const product = await getProductBySlug(entry.slug);
    if (!product || product.stock <= 0) continue;
    items.push(
      toCartLineItem(product, Math.min(entry.quantity, product.stock)),
    );
  }

  return items;
}

export async function getGuestCartCount(): Promise<number> {
  const items = await getGuestCartItems();
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export async function addGuestCartItem(slug: string, quantity = 1) {
  const product = await getProductBySlug(slug);
  if (!product) return { error: "Product not found" as const };
  if (product.stock <= 0) return { error: "Out of stock" as const };

  const entries = await readGuestCartEntries();
  const existing = entries.find((entry) => entry.slug === slug);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;

  if (nextQuantity > product.stock) {
    return { error: "Not enough stock" as const };
  }

  const nextEntries = existing
    ? entries.map((entry) =>
        entry.slug === slug ? { ...entry, quantity: nextQuantity } : entry,
      )
    : [...entries, { slug, quantity }];

  await writeGuestCartEntries(nextEntries);
  return { success: true as const };
}

export async function updateGuestCartItem(cartItemId: string, quantity: number) {
  if (!cartItemId.startsWith("guest-")) {
    return { error: "Item not found" as const };
  }

  const slug = cartItemId.slice("guest-".length);
  const product = await getProductBySlug(slug);
  if (!product) return { error: "Item not found" as const };
  if (quantity > product.stock) return { error: "Not enough stock" as const };

  const entries = await readGuestCartEntries();
  const exists = entries.some((entry) => entry.slug === slug);
  if (!exists) return { error: "Item not found" as const };

  await writeGuestCartEntries(
    entries.map((entry) =>
      entry.slug === slug ? { ...entry, quantity } : entry,
    ),
  );
  return { success: true as const };
}

export async function removeGuestCartItem(cartItemId: string) {
  if (!cartItemId.startsWith("guest-")) return;

  const slug = cartItemId.slice("guest-".length);
  const entries = await readGuestCartEntries();
  await writeGuestCartEntries(entries.filter((entry) => entry.slug !== slug));
}

export async function clearGuestCart() {
  await writeGuestCartEntries([]);
}

export function isGuestCartItemId(id: string) {
  return id.startsWith("guest-");
}

export function slugFromFallbackProductId(productId: string) {
  if (!productId.startsWith("fallback-")) return null;
  return productId.slice("fallback-".length);
}
