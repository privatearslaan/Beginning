import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/product-catalog";
import { formatPrice, categoryLabel, petTypeLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { ProductImage } from "@/components/shop/ProductImage";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { PageHero } from "@/components/layout/PageHero";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const images = product.images;

  return (
    <>
      <PageHero eyebrow="Product" title="Product Details" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] border border-line/70 bg-white/90 p-6 shadow-xl shadow-orange-brand/5 backdrop-blur lg:grid-cols-2 lg:p-10">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cream to-peach/50">
            <ProductImage
              src={images[0] ?? "/placeholder-product.svg"}
              alt={product.name}
              className="object-contain p-6"
              priority
            />
            <div className="absolute right-4 top-4">
              <WishlistButton
                productId={product.id}
                productName={product.name}
                variant="outline"
                className="glass-panel"
              />
            </div>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
              <Badge variant="outline">{petTypeLabel(product.petType)}</Badge>
            </div>
            <RevealHeading
              as="h1"
              delay={120}
              className="mb-4 text-2xl font-black text-ink sm:text-3xl"
            >
              {product.name}
            </RevealHeading>
            <p className="mb-6 text-3xl font-black text-orange-brand">
              {formatPrice(product.price)}
            </p>
            <p className="mb-6 leading-relaxed text-muted">{product.description}</p>
            <p className="mb-6 rounded-xl bg-cream px-4 py-3 text-sm font-semibold text-ink">
              {product.stock > 0
                ? `${product.stock} in stock · Ready to ship`
                : "Out of stock"}
            </p>
            <AddToCartButton
              productId={product.id}
              disabled={product.stock === 0}
              label={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
