"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCartItems, clearCart } from "@/actions/cart";
import {
  INDIAN_STATES_AND_UTS,
  isValidIndianMobile,
  normalizeIndianPhone,
} from "@/lib/india";

const placeOrderSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .transform(normalizeIndianPhone)
    .refine(isValidIndianMobile, "Enter a valid 10-digit Indian mobile number"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.enum(INDIAN_STATES_AND_UTS, {
    error: "Select a valid state or union territory",
  }),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  deliveryNotes: z.string().optional(),
});

export async function placeOrder(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please sign in to checkout" };
  }

  const parsed = placeOrderSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode"),
    deliveryNotes: formData.get("deliveryNotes") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
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
      shippingName: parsed.data.fullName,
      shippingPhone: parsed.data.phone,
      addressLine1: parsed.data.addressLine1,
      addressLine2: parsed.data.addressLine2,
      city: parsed.data.city,
      state: parsed.data.state,
      pincode: parsed.data.pincode,
      deliveryNotes: parsed.data.deliveryNotes,
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
