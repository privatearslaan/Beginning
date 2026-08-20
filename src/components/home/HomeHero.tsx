"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, PawPrint, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPetPhotoStack, HeroPetPhotoStrip } from "@/components/home/HeroPetPhotos";
import { ProductSearchBar } from "@/components/shop/ProductSearchBar";
import { HERO_SLIDES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { RevealBlock, RevealHeading } from "@/components/ui/RevealHeading";

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
    <section className="relative overflow-hidden mesh-bg-dark text-white">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-brand/20 blur-3xl animate-pulse-ring" />
      <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-lime-brand/15 blur-3xl animate-pulse-ring" />

      <div className="relative min-h-[560px] lg:min-h-[680px]">
        {HERO_SLIDES.map((item, slideIndex) => (
          <div
            key={item.title}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={slideIndex === 0}
              className="object-cover opacity-40 mix-blend-luminosity"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/95 via-[#252220]/85 to-[#252220]/40" />
          </div>
        ))}

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <RevealBlock>
              <p className="section-eyebrow mb-4 border-white/20 bg-white/10 text-orange-300">
                <PawPrint className="h-3.5 w-3.5" />
                {slide.eyebrow}
              </p>
            </RevealBlock>
            <RevealHeading
              as="h1"
              delay={120}
              className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {slide.title}{" "}
              <span className="gradient-text">{slide.accent}</span>
            </RevealHeading>
            <RevealBlock delay={220}>
              <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
                {slide.text}
              </p>
            </RevealBlock>

            <RevealBlock delay={320}>
              <ProductSearchBar variant="hero" className="mt-8 w-full max-w-xl" />
            </RevealBlock>

            <RevealBlock delay={420}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={slide.primaryHref}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {slide.primaryLabel}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href={slide.secondaryHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                  >
                    {slide.secondaryLabel}
                  </Button>
                </Link>
              </div>
            </RevealBlock>

            <RevealBlock delay={520}>
              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous slide"
                  className="rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20"
                  onClick={() =>
                    setIndex(
                      (current) =>
                        (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
                    )
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
                        "h-2 rounded-full transition-all",
                        dotIndex === index ? "w-8 bg-orange-brand" : "w-2.5 bg-white/35",
                      )}
                      onClick={() => setIndex(dotIndex)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next slide"
                  className="rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20"
                  onClick={() =>
                    setIndex((current) => (current + 1) % HERO_SLIDES.length)
                  }
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </RevealBlock>

            <HeroPetPhotoStrip />
          </div>

          <div className="relative hidden lg:block">
            <HeroPetPhotoStack />
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-brand/30 via-transparent to-lime-brand/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 glass-panel-dark p-6 animate-float">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-lime-brand">
                <Sparkles className="h-4 w-4" />
                Smart Pet Store · Anantnag
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Products", value: "244+" },
                  { label: "Brands", value: "20+" },
                  { label: "Rating", value: "4.8★" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-2 py-3"
                  >
                    <strong className="block text-lg text-white">{stat.value}</strong>
                    <span className="text-xs text-white/60">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-full border border-white/20 glass-panel-dark p-5 text-center animate-float">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-300">
                Trusted by
              </span>
              <strong className="text-3xl font-black text-white">50K+</strong>
              <small className="block text-xs text-white/70">Pet Parents</small>
              <Heart className="mx-auto mt-2 h-4 w-4 text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
