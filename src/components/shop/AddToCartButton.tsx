"use client";

import { useTransition } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
  quantity?: number;
  label?: string;
}

export function AddToCartButton({
  productId,
  disabled,
  quantity = 1,
  label,
}: AddToCartButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      disabled={disabled || pending}
      onClick={() => {
        startTransition(async () => {
          const result = await addToCart(productId, quantity);
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success("Added to cart");
          }
        });
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      {label ?? (disabled ? "Out of Stock" : pending ? "Adding..." : "Add")}
    </Button>
  );
}
