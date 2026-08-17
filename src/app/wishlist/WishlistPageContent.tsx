"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistProducts } from "@/actions/wishlist";
import { ProductCard } from "@/components/shop/ProductCard";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { removeFromWishlist } from "@/lib/wishlist";
import { PAGE_COPY } from "@/lib/site";

type WishlistProduct = Awaited<ReturnType<typeof getWishlistProducts>>[number];

export function WishlistPageContent() {
  const { ids, count } = useWishlist();
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const items = await getWishlistProducts(ids);
      setProducts(items);
    });
  }, [ids]);

  return (
    <>
      <PageHero
        title={PAGE_COPY.wishlist.title}
        description={PAGE_COPY.wishlist.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {pending && products.length === 0 && count > 0 ? (
          <p className="text-stone-500">Loading your wishlist...</p>
        ) : count === 0 || products.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-white p-12 text-center">
            <Heart className="mx-auto mb-4 h-10 w-10 text-rose-400" />
            <p className="mb-4 text-stone-600">{PAGE_COPY.wishlist.empty}</p>
            <Link href="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} showWishlist />
                <button
                  type="button"
                  className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm hover:bg-white"
                  onClick={() => {
                    removeFromWishlist(product.id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
