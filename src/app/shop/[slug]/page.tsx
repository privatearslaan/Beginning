import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice, categoryLabel, petTypeLabel } from "@/lib/utils";
import { asStringArray } from "@/lib/product-images";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) notFound();
  const images = asStringArray(product.images);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-emerald-50">
          <Image
            src={images[0] ?? "/placeholder-product.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
            <Badge variant="outline">{petTypeLabel(product.petType)}</Badge>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-stone-900">
            {product.name}
          </h1>
          <p className="mb-6 text-2xl font-bold text-emerald-700">
            {formatPrice(product.price.toString())}
          </p>
          <p className="mb-6 text-stone-600">{product.description}</p>
          <p className="mb-6 text-sm text-stone-500">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>
          <AddToCartButton
            productId={product.id}
            disabled={product.stock === 0}
            label={product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          />
        </div>
      </div>
    </div>
  );
}
