import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, categoryLabel, petTypeLabel } from "@/lib/utils";
import { asStringArray } from "@/lib/product-images";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: { toString(): string } | number;
    category: string;
    petType: string;
    images: unknown;
    stock: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const image = asStringArray(product.images)[0] ?? "/placeholder-product.svg";

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-emerald-50">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
          <Badge variant="outline">{petTypeLabel(product.petType)}</Badge>
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mb-1 font-semibold text-stone-900 hover:text-emerald-700">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-bold text-emerald-700">
            {formatPrice(product.price.toString())}
          </span>
          <AddToCartButton
            productId={product.id}
            disabled={product.stock === 0}
            className="w-full sm:w-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
