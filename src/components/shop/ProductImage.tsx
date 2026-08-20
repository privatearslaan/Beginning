"use client";

import Image from "next/image";
import { useState } from "react";
import { normalizeProductImageUrl } from "@/lib/product-images";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProductImage({
  src,
  alt,
  fill = true,
  priority,
  className,
  sizes,
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(
    normalizeProductImageUrl(src) || "/placeholder-product.svg",
  );

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => {
        if (currentSrc !== "/placeholder-product.svg") {
          setCurrentSrc("/placeholder-product.svg");
        }
      }}
    />
  );
}
