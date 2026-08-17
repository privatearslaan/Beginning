import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string; demo?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const session = await auth();
  if (!params.order_id) redirect("/");

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
      {params.demo === "true" && (
        <p className="mb-4 text-sm text-orange-600">
          Demo mode — Stripe is not configured. Order marked as paid.
        </p>
      )}
      <p className="mb-6 text-stone-600">
        Thank you for your order. Order total:{" "}
        <strong>{formatPrice(order.total.toString())}</strong>
      </p>
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
}
