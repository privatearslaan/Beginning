import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { BEST_SELLERS, formatRs } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function BestSellersGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Best Sellers
        </h2>
        <Link href="/shop" className="text-sm font-medium text-orange-600 hover:underline">
          View All Products →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {BEST_SELLERS.map((product) => (
          <article
            key={product.slug}
            className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
          >
            {"discount" in product && product.discount && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                {product.discount}% OFF
              </span>
            )}
            <Link href={`/shop/${product.slug}`} className="block">
              <div className="relative aspect-square bg-stone-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
            </Link>
            <div className="p-4">
              <h3 className="line-clamp-2 text-sm font-semibold text-stone-900">
                <Link href={`/shop/${product.slug}`} className="hover:text-orange-700">
                  {product.name}
                </Link>
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {product.rating}
                </span>
                <span>({product.reviews})</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <strong className="text-orange-700">{formatRs(product.price)}</strong>
                {product.mrp > product.price && (
                  <del className="text-sm text-stone-400">{formatRs(product.mrp)}</del>
                )}
              </div>
              <p className="mt-2 text-xs text-stone-500">Option: {product.variant}</p>
              <Link href={`/shop/${product.slug}`} className="mt-3 block">
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
