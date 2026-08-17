import type { Metadata } from "next";
import Link from "next/link";
import { getCartItems } from "@/actions/cart";
import { CartItemRow } from "@/components/shop/CartItemRow";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CheckoutButton } from "./CheckoutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const [items, session] = await Promise.all([getCartItems(), auth()]);
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-stone-900">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-emerald-100 bg-white p-12 text-center">
          <p className="mb-4 text-stone-600">Your cart is empty.</p>
          <Link href="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-emerald-100 bg-white p-6">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
            <div className="flex items-center justify-between border-t border-emerald-100 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-emerald-700">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            {session?.user ? (
              <CheckoutButton />
            ) : (
              <Link href="/login?callbackUrl=/cart">
                <Button>Sign In to Checkout</Button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
