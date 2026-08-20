import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatPrice, paymentMethodLabel } from "@/lib/utils";
import { formatShippingAddress } from "@/lib/shipping";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GuestOrderSuccessActions } from "./GuestOrderSuccessActions";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string; guest?: string; whatsapp?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;

  if (params.guest === "1" && params.whatsapp) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
        <h1 className="mb-2 text-3xl font-bold text-stone-900">
          Order Ready to Send
        </h1>
        <p className="mb-6 text-stone-600">
          Tap below to send your Cash on Delivery order to Happy Tails on WhatsApp.
          Our team will confirm delivery details with you.
        </p>
        <GuestOrderSuccessActions whatsappUrl={params.whatsapp} />
      </div>
    );
  }

  const session = await auth();
  if (!params.order_id) redirect("/");

  try {
    const order = await db.order.findUnique({
      where: { id: params.order_id },
      include: { items: { include: { product: true } } },
    });

    if (!order || (session?.user && order.userId !== session.user.id)) {
      redirect("/");
    }

    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
        <h1 className="mb-2 text-3xl font-bold text-stone-900">
          Order Confirmed!
        </h1>
        <p className="mb-2 text-stone-600">
          Thank you for your order. Order total:{" "}
          <strong>{formatPrice(order.total.toString())}</strong>
        </p>
        <p className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Payment method: <strong>{paymentMethodLabel(order.paymentMethod)}</strong>.
          Please keep the exact amount ready when your order arrives.
        </p>
        <div className="mb-8 rounded-xl border border-emerald-100 bg-white p-4 text-left text-sm text-stone-600">
          <p className="mb-2 font-medium text-stone-900">Deliver to</p>
          {formatShippingAddress(order).map((line) => (
            <p key={line}>{line}</p>
          ))}
          {order.deliveryNotes && (
            <p className="mt-2 text-stone-500">
              Notes: {order.deliveryNotes}
            </p>
          )}
        </div>
        <ul className="mb-8 space-y-2 text-left text-sm text-stone-600">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.quantity}x {item.product.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-4">
          <Link href="/account/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  } catch {
    redirect("/");
  }
}
