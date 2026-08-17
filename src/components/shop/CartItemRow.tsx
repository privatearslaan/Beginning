"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { asStringArray } from "@/lib/product-images";
import { updateCartItem, removeFromCart } from "@/actions/cart";
import { toast } from "sonner";

interface CartItemRowProps {
  item: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      slug: string;
      price: { toString(): string };
      images: unknown;
      stock: number;
    };
  };
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex gap-3 border-b border-emerald-100 py-4 sm:gap-4">
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-emerald-50 sm:h-24 sm:w-24"
      >
        <Image
          src={asStringArray(item.product.images)[0] ?? "/placeholder-product.svg"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/shop/${item.product.slug}`}
            className="line-clamp-2 font-medium text-stone-900 hover:text-emerald-700"
          >
            {item.product.name}
          </Link>
          <p className="mt-1 text-sm text-stone-500">
            {formatPrice(item.product.price.toString())}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={pending || item.quantity <= 1}
            onClick={() => {
              startTransition(async () => {
                await updateCartItem(item.id, item.quantity - 1);
              });
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            disabled={pending || item.quantity >= item.product.stock}
            onClick={() => {
              startTransition(async () => {
                const result = await updateCartItem(item.id, item.quantity + 1);
                if (result.error) toast.error(result.error);
              });
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                await removeFromCart(item.id);
                toast.success("Removed from cart");
              });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
