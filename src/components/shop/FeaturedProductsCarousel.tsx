"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, petTypeLabel, cn } from "@/lib/utils";
import { asStringArray } from "@/lib/product-images";

interface CarouselProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  petType: string;
  images: unknown;
}

interface FeaturedProductsCarouselProps {
  products: CarouselProduct[];
}

export function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % products.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  const product = products[index];

  function goTo(nextIndex: number) {
    setIndex((nextIndex + products.length) % products.length);
  }

  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
        {products.map((item, slideIndex) => {
          const slideImage =
            asStringArray(item.images)[0] ?? "/placeholder-product.svg";

          return (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                slideIndex === index ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slideImage}
                alt=""
                fill
                priority={slideIndex === 0}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
            </div>
          );
        })}

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
          <div className="max-w-xl text-white">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-orange-300">
              Top Product
            </p>
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
              {product.name}
            </h2>
            <p className="mb-1 text-sm text-white/80">
              {petTypeLabel(product.petType)}
            </p>
            <p className="mb-6 text-2xl font-bold text-emerald-300 sm:text-3xl">
              {formatPrice(product.price)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/shop/${product.slug}`}>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  View Product
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  Browse Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {products.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Previous product"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 sm:left-6"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Next product"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 sm:right-6"
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {products.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show slide ${dotIndex + 1}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    dotIndex === index
                      ? "w-8 bg-orange-400"
                      : "w-2.5 bg-white/50 hover:bg-white/80",
                  )}
                  onClick={() => goTo(dotIndex)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
