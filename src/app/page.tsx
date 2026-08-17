import Link from "next/link";
import { ArrowRight, Heart, Scissors, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductSearchBar } from "@/components/shop/ProductSearchBar";
import { FeaturedProductsCarousel } from "@/components/shop/FeaturedProductsCarousel";
import { ShopByPet } from "@/components/shop/ShopByPet";
import { ServiceCard } from "@/components/booking/ServiceCard";
import { db } from "@/lib/db";

export default async function HomePage() {
  const [topProducts, featuredProducts, services] = await Promise.all([
    db.product.findMany({
      where: { featured: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    db.product.findMany({ where: { featured: true }, take: 4 }),
    db.service.findMany({ where: { active: true }, take: 3 }),
  ]);

  const carouselProducts = topProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price.toString(),
    petType: product.petType,
    images: product.images,
  }));

  return (
    <>
      <FeaturedProductsCarousel products={carouselProducts} />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:px-8 lg:py-20">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Everything your pet needs, all in one place
            </h1>
            <p className="mb-6 text-base text-emerald-100 sm:text-lg">
              Premium food, toys, and accessories plus grooming and care
              services — because your furry friends deserve the best.
            </p>
            <ProductSearchBar
              variant="hero"
              className="mb-8 mx-auto w-full max-w-xl lg:mx-0"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  Book a Service
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-none lg:flex-1">
            {[
              { icon: ShoppingBag, label: "500+ Products" },
              { icon: Scissors, label: "Expert Grooming" },
              { icon: Heart, label: "Pet Care Tips" },
              { icon: ArrowRight, label: "Same-Day Pickup" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur sm:p-6"
              >
                <Icon className="mb-2 h-7 w-7 text-orange-300 sm:h-8 sm:w-8" />
                <p className="text-sm font-semibold sm:text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShopByPet />

      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-stone-600">
                Hand-picked favorites for happy pets
              </p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-emerald-700 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="bg-emerald-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-stone-900">
                Our Services
              </h2>
              <p className="mt-2 text-stone-600">
                Professional care for your beloved companions
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={{
                    ...service,
                    price: service.price.toString(),
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-stone-900">
          What Pet Parents Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "Best pet shop in town! My dog loves the treats here.",
              author: "Sarah M.",
            },
            {
              quote: "The grooming team is amazing. Max always looks fantastic.",
              author: "James L.",
            },
            {
              quote: "Great selection and friendly staff. Highly recommend!",
              author: "Emily R.",
            },
          ].map((review) => (
            <blockquote
              key={review.author}
              className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm"
            >
              <p className="mb-4 text-stone-700">&ldquo;{review.quote}&rdquo;</p>
              <footer className="text-sm font-medium text-emerald-700">
                — {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
