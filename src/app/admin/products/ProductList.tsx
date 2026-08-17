"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/actions/admin";
import { formatPrice, categoryLabel } from "@/lib/utils";
import { toast } from "sonner";

interface ProductListProps {
  products: Array<{
    id: string;
    name: string;
    price: { toString(): string };
    stock: number;
    category: string;
    featured: boolean;
  }>;
}

export function ProductList({ products }: ProductListProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-900">{product.name}</span>
              {product.featured && <Badge>Featured</Badge>}
            </div>
            <p className="text-sm text-stone-500">
              {categoryLabel(product.category)} · {formatPrice(product.price.toString())} · Stock: {product.stock}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                await deleteProduct(product.id);
                toast.success("Product deleted");
              });
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ))}
    </div>
  );
}
