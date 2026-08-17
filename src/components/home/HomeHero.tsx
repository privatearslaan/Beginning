"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSearchBar } from "@/components/shop/ProductSearchBar";
import { HERO_SLIDES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      <div className="relative min-h-[520px] lg:min-h-[620px]">
        {HERO_SLIDES.map((item, slideIndex) => (
          <div
            key={item.title}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={slideIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/75 to-stone-900/30" />
          </div>
        ))}

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-orange-300">
            <PawPrint className="h-4 w-4" />
            {slide.eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {slide.title}{" "}
            <span className="text-orange-400">{slide.accent}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-stone-200 sm:text-lg">
            {slide.text}
          </p>

          <ProductSearchBar
            variant="hero"
            className="mt-8 w-full max-w-xl"
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={slide.primaryHref}>
              <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto">
                {slide.primaryLabel}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={slide.secondaryHref}>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/40 text-white hover:bg-white/10 sm:w-auto"
              >
                {slide.secondaryLabel}
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-24 right-6 hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-white backdrop-blur sm:block lg:right-12">
          <span className="block text-xs uppercase tracking-wide text-orange-200">Trusted by</span>
          <strong className="text-3xl font-bold">50K+</strong>
          <small className="block text-sm text-stone-200">Pet Parents</small>
          <Heart className="mx-auto mt-2 h-5 w-5 text-rose-300" />
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            onClick={() =>
              setIndex((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((item, dotIndex) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Go to slide ${dotIndex + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  dotIndex === index ? "bg-orange-400" : "bg-white/40",
                )}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            onClick={() => setIndex((current) => (current + 1) % HERO_SLIDES.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
