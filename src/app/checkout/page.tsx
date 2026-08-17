import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCartItems } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout");

  const items = await getCartItems();
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-stone-900">Cart is empty</h1>
        <Link href="/shop">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold text-stone-900 sm:text-3xl">
        Checkout
      </h1>
      <p className="mb-8 text-stone-600">
        Enter your delivery details to complete your order
      </p>

      <CheckoutForm
        defaultName={session.user.name ?? ""}
        defaultEmail={session.user.email ?? ""}
        items={items}
        total={total}
      />
    </div>
  );
}
