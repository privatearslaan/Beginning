import type { Metadata } from "next";
import Link from "next/link";
import { getCartItems } from "@/actions/cart";
import { CartItemRow } from "@/components/shop/CartItemRow";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { SITE, PAGE_COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const [items, session] = await Promise.all([getCartItems(), auth()]);
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );
  const qualifiesForFreeDelivery = total >= SITE.freeDeliveryMin;

  return (
    <>
      <PageHero
        eyebrow="Your bag"
        title={PAGE_COPY.cart.title}
        description={PAGE_COPY.cart.description}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-white p-12 text-center">
            <p className="mb-4 text-stone-600">{PAGE_COPY.cart.empty}</p>
            <Link href="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-orange-100 bg-white p-6">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
              <div className="flex items-center justify-between border-t border-orange-100 pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text-orange-700">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-4 rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-900">
                Pay when your order is delivered. Cash on Delivery only.
                {qualifiesForFreeDelivery
                  ? " Your order qualifies for free delivery."
                  : ` Add ₹${Math.ceil(SITE.freeDeliveryMin - total)} more for free delivery.`}
              </p>
              {!qualifiesForFreeDelivery && (
                <p className="mt-2 text-xs text-stone-500">
                  Free delivery above ₹{SITE.freeDeliveryMin} in supported service
                  areas. Use code {SITE.promoCode} on your first order.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/shop" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              {session?.user ? (
                <Link href="/checkout" className="w-full">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              ) : (
                <Link href="/login?callbackUrl=/cart" className="w-full">
                  <Button className="w-full">Sign In to Checkout</Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
