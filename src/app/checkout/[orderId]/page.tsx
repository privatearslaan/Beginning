import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRazorpayKeyId, isRazorpayConfigured, toPaise } from "@/lib/razorpay";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RazorpayCheckout } from "./RazorpayCheckout";

export const metadata: Metadata = {
  title: "Checkout",
};

interface CheckoutPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/cart");

  const { orderId } = await params;
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order || order.userId !== session.user.id) notFound();

  if (order.status === "PAID") {
    redirect(`/checkout/success?order_id=${order.id}`);
  }

  if (!isRazorpayConfigured() || !order.razorpayOrderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-stone-900">
          Payments Not Configured
        </h1>
        <p className="mb-6 text-stone-600">
          Razorpay API keys are required to accept UPI, cards, and netbanking.
        </p>
        <Link href="/cart">
          <Button>Back to Cart</Button>
        </Link>
      </div>
    );
  }

  const amount = Number(order.total);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-stone-900 sm:text-3xl">
        Complete Payment
      </h1>
      <p className="mb-8 text-stone-600">
        Secure checkout powered by Razorpay · All major Indian payment methods
      </p>

      <div className="mb-8 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
        <p className="mb-3 font-medium text-stone-900">Order summary</p>
        <ul className="mb-3 space-y-1 text-sm text-stone-600">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.quantity}x {item.product.name}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold text-emerald-700">
          Total: {formatPrice(amount)}
        </p>
      </div>

      <RazorpayCheckout
        orderId={order.id}
        amount={amount}
        amountPaise={toPaise(amount)}
        razorpayOrderId={order.razorpayOrderId}
        keyId={getRazorpayKeyId()}
        customerName={session.user.name ?? "Customer"}
        customerEmail={session.user.email ?? ""}
      />
    </div>
  );
}
