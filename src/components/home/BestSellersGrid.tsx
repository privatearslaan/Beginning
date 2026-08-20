import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

type BestSellerProduct = {
  id: string;
  name: string;
  slug: string;
  price: { toString(): string } | number;
  category: string;
  petType: string;
  images: unknown;
  stock: number;
};

interface BestSellersGridProps {
  products: BestSellerProduct[];
}

export function BestSellersGrid({ products }: BestSellersGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Trending"
        title="Best Sellers"
        description="Top picks loved by pet parents across Anantnag"
        href="/shop"
        linkLabel="View All Products →"
        delay={120}
      />
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
