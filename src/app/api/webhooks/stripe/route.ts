import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { clearCart } from "@/actions/cart";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? "",
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await db.order.findUnique({
        where: { id: orderId },
        include: { items: true, user: true },
      });

      if (order && order.status === "PENDING") {
        await db.order.update({
          where: { id: orderId },
          data: { status: "PAID" },
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
  }

  return NextResponse.json({ received: true });
}
