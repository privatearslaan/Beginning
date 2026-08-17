import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { clearCart } from "@/actions/cart";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    orderId,
    razorpay_payment_id: paymentId,
    razorpay_order_id: razorpayOrderId,
    razorpay_signature: signature,
  } = body;

  if (!orderId || !paymentId || !razorpayOrderId || !signature) {
    return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
  }

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order || order.userId !== session.user.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status === "PAID") {
    return NextResponse.json({ success: true });
  }

  if (order.razorpayOrderId !== razorpayOrderId) {
    return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
  }

  const valid = verifyRazorpaySignature(razorpayOrderId, paymentId, signature);
  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  await db.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
      razorpayPaymentId: paymentId,
    },
  });

  for (const item of order.items) {
    await db.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  await clearCart();

  return NextResponse.json({ success: true });
}
