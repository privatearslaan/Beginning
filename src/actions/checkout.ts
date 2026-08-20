"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isDbAvailable } from "@/lib/db-available";
import { db } from "@/lib/db";
import {
  clearCart,
  getCartItems,
  isGuestCheckoutMode,
} from "@/actions/cart";
import { parseCheckoutForm } from "@/lib/checkout-form";
import { formatPrice } from "@/lib/utils";
import { formatShippingAddress } from "@/lib/shipping";
import { SITE } from "@/lib/site";

function buildGuestOrderMessage(
  items: Awaited<ReturnType<typeof getCartItems>>,
  total: number,
  details: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    deliveryNotes?: string;
  },
) {
  const lines = items.map(
    (item) =>
      `${item.quantity}x ${item.product.name} - ${formatPrice(Number(item.product.price) * item.quantity)}`,
  );

  const address = formatShippingAddress({
    shippingName: details.fullName,
    shippingPhone: details.phone,
    addressLine1: details.addressLine1,
    addressLine2: details.addressLine2 ?? null,
    city: details.city,
    state: details.state,
    pincode: details.pincode,
  }).join("\n");

  return [
    "Hi Happy Tails, I would like to place a Cash on Delivery order:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Delivery details:",
    address,
    details.deliveryNotes ? `Notes: ${details.deliveryNotes}` : null,
    "",
    "Payment: Cash on Delivery",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function placeOrder(formData: FormData) {
  const session = await auth();
  const guestMode = await isGuestCheckoutMode();

  if (guestMode) {
    return placeGuestOrder(formData);
  }

  if (!session?.user) {
    return { error: "Please sign in to checkout" };
  }

  if (!(await isDbAvailable())) {
    return { error: "Checkout is temporarily unavailable. Please try again later." };
  }

  const parsed = parseCheckoutForm(formData);

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
          productId: item.product.id,
          quantity: item.quantity,
          priceAtPurchase: Number(item.product.price),
        })),
      },
    },
  });

  for (const item of cartItems) {
    await db.product.update({
      where: { id: item.product.id },
      data: { stock: { decrement: item.quantity } },
    });
  }

  await clearCart();
  redirect(`/checkout/success?order_id=${order.id}`);
}

export async function placeGuestOrder(formData: FormData) {
  const parsed = parseCheckoutForm(formData);

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

  const message = buildGuestOrderMessage(cartItems, total, parsed.data);
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  await clearCart();
  redirect(`/checkout/success?guest=1&whatsapp=${encodeURIComponent(whatsappUrl)}`);
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
