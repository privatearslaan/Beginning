import Link from "next/link";
import Image from "next/image";
import { SHOP_CATEGORIES, TOP_BRANDS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ShopCategoriesGrid() {
  return (
    <section className="mesh-bg py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Categories"
          title="Shop by Category"
          description="Food, treats, toys, grooming and wellness for dogs and cats"
          href="/shop"
          linkLabel="View All Categories →"
          delay={100}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {SHOP_CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group gradient-border card-hover-glow overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-90" />
                <p className="absolute inset-x-0 bottom-0 px-3 py-4 text-center text-sm font-black text-white">
                  {category.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandMarquee() {
  const brands = [...TOP_BRANDS, ...TOP_BRANDS];

  return (
    <section className="overflow-hidden border-y border-line/70 bg-ink py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Brands"
          title="Top Brands"
          href="/shop"
          linkLabel="View All Brands →"
          dark
          delay={150}
        />
      </div>
      <div className="relative mt-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-marquee gap-4 px-4">
          {brands.map((brand, index) => (
            <Link
              key={`${brand.slug}-${index}`}
              href={`/shop?brand=${brand.slug}`}
              className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 backdrop-blur transition hover:border-lime-brand/50 hover:bg-white/10 hover:text-lime-brand"
            >
              {brand.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
