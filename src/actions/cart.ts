"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import type { CartLineItem } from "@/lib/cart-types";
import { priceAsDecimal } from "@/lib/cart-types";
import { isDbAvailable } from "@/lib/db-available";
import { db } from "@/lib/db";
import { slugFromFallbackProductId } from "@/lib/guest-cart";
import {
  addGuestCartItem,
  clearGuestCart,
  getGuestCartCount,
  getGuestCartItems,
  isGuestCartItemId,
  removeGuestCartItem,
  updateGuestCartItem,
} from "@/lib/guest-cart";
import { readCartSessionId } from "@/lib/cart-session";

const CART_SESSION_COOKIE = "cart_session_id";

async function ensureCartSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(CART_SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }
  return sessionId;
}

async function getCartFilter() {
  const session = await auth();
  if (session?.user) {
    return { userId: session.user.id };
  }
  const sessionId = await ensureCartSessionId();
  return { sessionId };
}

async function getCartFilterReadOnly() {
  const session = await auth();
  if (session?.user) {
    return { userId: session.user.id };
  }
  const sessionId = await readCartSessionId();
  if (!sessionId) return null;
  return { sessionId };
}

function mapDbCartItem(item: {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: { toString(): string };
    images: unknown;
    stock: number;
  };
}): CartLineItem {
  return {
    id: item.id,
    quantity: item.quantity,
    product: {
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: priceAsDecimal(Number(item.product.price)),
      images: item.product.images,
      stock: item.product.stock,
    },
  };
}

async function getDbCartItems(): Promise<CartLineItem[]> {
  const filter = await getCartFilterReadOnly();
  if (!filter) return [];

  const items = await db.cartItem.findMany({
    where: filter,
    include: { product: true },
    orderBy: { id: "asc" },
  });

  return items.map(mapDbCartItem);
}

export async function getCartItems(): Promise<CartLineItem[]> {
  if (await isDbAvailable()) {
    try {
      const items = await getDbCartItems();
      if (items.length > 0) return items;
    } catch {
      // Fall through to guest cart.
    }
  }

  return getGuestCartItems();
}

export async function getCartCount() {
  if (await isDbAvailable()) {
    try {
      const filter = await getCartFilterReadOnly();
      if (filter) {
        const items = await db.cartItem.findMany({ where: filter });
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        if (count > 0) return count;
      }
    } catch {
      // Fall through to guest cart.
    }
  }

  return getGuestCartCount();
}

export async function addToCart(productId: string, quantity = 1) {
  const fallbackSlug = slugFromFallbackProductId(productId);
  if (fallbackSlug) {
    const result = await addGuestCartItem(fallbackSlug, quantity);
    if (result.error) return result;

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
    return { success: true };
  }

  if (!(await isDbAvailable())) {
    return {
      error:
        "This product is not available for cart right now. Please refresh and try again.",
    };
  }

  try {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) return { error: "Product not found" };
    if (product.stock < quantity) return { error: "Not enough stock" };

    const session = await auth();
    const sessionId = session?.user ? undefined : await ensureCartSessionId();

    const existing = await db.cartItem.findFirst({
      where: {
        productId,
        ...(session?.user ? { userId: session.user.id } : { sessionId }),
      },
    });

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) return { error: "Not enough stock" };
      await db.cartItem.update({
        where: { id: existing.id },
        data: { quantity: newQty },
      });
    } else {
      await db.cartItem.create({
        data: {
          productId,
          quantity,
          ...(session?.user ? { userId: session.user.id } : { sessionId }),
        },
      });
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Cart is temporarily unavailable. Please try again later." };
  }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  if (quantity < 1) return { error: "Invalid quantity" };

  if (isGuestCartItemId(cartItemId)) {
    const result = await updateGuestCartItem(cartItemId, quantity);
    if (result.error) return result;

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
    return { success: true };
  }

  if (!(await isDbAvailable())) {
    return { error: "Cart is temporarily unavailable." };
  }

  const item = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { product: true },
  });
  if (!item) return { error: "Item not found" };
  if (quantity > item.product.stock) return { error: "Not enough stock" };

  await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function removeFromCart(cartItemId: string) {
  if (isGuestCartItemId(cartItemId)) {
    await removeGuestCartItem(cartItemId);
  } else if (await isDbAvailable()) {
    await db.cartItem.delete({ where: { id: cartItemId } });
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function mergeGuestCart(userId: string) {
  if (!(await isDbAvailable())) return;

  const sessionId = await readCartSessionId();
  if (!sessionId) return;

  const guestItems = await db.cartItem.findMany({ where: { sessionId } });
  for (const guestItem of guestItems) {
    const existing = await db.cartItem.findFirst({
      where: { userId, productId: guestItem.productId },
    });
    if (existing) {
      await db.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + guestItem.quantity },
      });
      await db.cartItem.delete({ where: { id: guestItem.id } });
    } else {
      await db.cartItem.update({
        where: { id: guestItem.id },
        data: { userId, sessionId: null },
      });
    }
  }
}

export async function clearCart() {
  if (await isDbAvailable()) {
    try {
      const filter = await getCartFilter();
      await db.cartItem.deleteMany({ where: filter });
    } catch {
      // Continue clearing guest cart below.
    }
  }

  await clearGuestCart();
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
}

export async function isGuestCheckoutMode() {
  if (await isDbAvailable()) {
    try {
      const dbItems = await getDbCartItems();
      if (dbItems.length > 0) return false;
    } catch {
      // Fall through.
    }
  }

  const guestItems = await getGuestCartItems();
  return guestItems.length > 0;
}
