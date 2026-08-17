import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-razorpay-signature");

  if (!signature || !verifyRazorpayWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body) as {
    event: string;
    payload: {
      payment?: {
        entity: {
          id: string;
          order_id: string;
          status: string;
        };
      };
    };
  };

  if (event.event === "payment.captured") {
    const payment = event.payload.payment?.entity;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    const order = await db.order.findUnique({
      where: { razorpayOrderId: payment.order_id },
      include: { items: true },
    });

    if (order && order.status === "PENDING") {
      await db.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          razorpayPaymentId: payment.id,
        },
      });

      for (const item of order.items) {
        await db.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await db.cartItem.deleteMany({ where: { userId: order.userId } });
    }
  }

  return NextResponse.json({ received: true });
}
