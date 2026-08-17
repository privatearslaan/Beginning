import Link from "next/link";
import Image from "next/image";
import { SHOP_CATEGORIES, TOP_BRANDS } from "@/lib/site";

export function ShopCategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-stone-600">
            Food, treats, toys, grooming and wellness for dogs and cats
          </p>
        </div>
        <Link href="/shop" className="text-sm font-medium text-orange-600 hover:underline">
          View All Categories →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {SHOP_CATEGORIES.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 200px"
              />
            </div>
            <p className="px-3 py-3 text-center text-sm font-semibold text-stone-900">
              {category.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BrandMarquee() {
  return (
    <section className="overflow-hidden border-y border-orange-100 bg-orange-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-stone-900">Top Brands</h2>
          <Link href="/shop" className="text-sm font-medium text-orange-600 hover:underline">
            View All Brands →
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TOP_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/shop?brand=${brand.slug}`}
              className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-orange-400 hover:text-orange-700"
            >
              {brand.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
