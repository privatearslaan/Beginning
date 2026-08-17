"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  variant?: "icon" | "outline";
  className?: string;
}

export function WishlistButton({
  productId,
  productName,
  variant = "icon",
  className,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  return (
    <Button
      type="button"
      variant={variant === "icon" ? "ghost" : "outline"}
      size={variant === "icon" ? "icon" : "sm"}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      className={cn(saved && "text-rose-500 hover:text-rose-600", className)}
      onClick={() => {
        toggle(productId);
        toast.success(
          saved
            ? `${productName ?? "Product"} removed from wishlist`
            : `${productName ?? "Product"} added to wishlist`,
        );
      }}
    >
      <Heart className={cn("h-5 w-5", saved && "fill-current")} />
      {variant === "outline" && (
        <span className="ml-2">{saved ? "Saved" : "Wishlist"}</span>
      )}
    </Button>
  );
}
