"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
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

export async function getCartItems() {
  const filter = await getCartFilterReadOnly();
  if (!filter) return [];

  return db.cartItem.findMany({
    where: filter,
    include: { product: true },
    orderBy: { id: "asc" },
  });
}

export async function getCartCount() {
  const filter = await getCartFilterReadOnly();
  if (!filter) return 0;

  const items = await db.cartItem.findMany({ where: filter });
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export async function addToCart(productId: string, quantity = 1) {
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) return { error: "Product not found" };
  if (product.stock < quantity) return { error: "Not enough stock" };

  const session = await auth();
  const sessionId = session?.user ? undefined : await ensureCartSessionId();

  const existing = await db.cartItem.findFirst({
    where: {
      productId,
      ...(session?.user
        ? { userId: session.user.id }
        : { sessionId }),
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
        ...(session?.user
          ? { userId: session.user.id }
          : { sessionId }),
      },
    });
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  if (quantity < 1) return { error: "Invalid quantity" };

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
  await db.cartItem.delete({ where: { id: cartItemId } });
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function mergeGuestCart(userId: string) {
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
  const filter = await getCartFilter();
  await db.cartItem.deleteMany({ where: filter });
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
}
