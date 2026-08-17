"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCartItems, clearCart } from "@/actions/cart";

export async function createCheckoutSession() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please sign in to checkout" };
  }

  const cartItems = await getCartItems();
  if (cartItems.length === 0) {
    return { error: "Your cart is empty" };
  }

  for (const item of cartItems) {
    if (item.quantity > item.product.stock) {
      return { error: `${item.product.name} is out of stock` };
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      total,
      status: "PENDING",
      paymentMethod: "COD",
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
        })),
      },
    },
  });

  for (const item of cartItems) {
    await db.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  await clearCart();
  redirect(`/checkout/success?order_id=${order.id}`);
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED",
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await db.order.update({ where: { id: orderId }, data: { status } });
  return { success: true };
}
