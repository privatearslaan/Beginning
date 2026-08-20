import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "@/components/shop/ProductImage";
import { Badge } from "@/components/ui/badge";
import { formatPrice, categoryLabel, petTypeLabel } from "@/lib/utils";
import { asStringArray } from "@/lib/product-images";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { WishlistButton } from "@/components/shop/WishlistButton";

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
  showWishlist?: boolean;
}

export function ProductCard({ product, showWishlist = true }: ProductCardProps) {
  const image = asStringArray(product.images)[0] ?? "/placeholder-product.svg";

  return (
    <Card className="group card-hover-glow overflow-hidden border-line/70">
      <div className="relative aspect-square bg-gradient-to-br from-cream to-peach/40">
        <Link href={`/shop/${product.slug}`} className="block h-full w-full">
          <ProductImage
            src={image}
            alt={product.name}
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </Link>
        {showWishlist && (
          <div className="absolute right-2 top-2 z-10">
            <WishlistButton
              productId={product.id}
              productName={product.name}
              className="rounded-full glass-panel hover:shadow-md"
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
          <Badge variant="outline">{petTypeLabel(product.petType)}</Badge>
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold text-ink transition group-hover:text-orange-brand">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xl font-black text-orange-brand">
            {formatPrice(Number(product.price))}
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
