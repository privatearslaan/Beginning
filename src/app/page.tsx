import { HomeHero } from "@/components/home/HomeHero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { ShopCategoriesGrid, BrandMarquee } from "@/components/home/ShopCategoriesGrid";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellersGrid } from "@/components/home/BestSellersGrid";
import { GroomingHomeSection } from "@/components/home/GroomingHomeSection";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, REVIEWS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeatureStrip />
      <ShopCategoriesGrid />
      <PromoBanner />
      <BestSellersGrid />
      <GroomingHomeSection />
      <BrandMarquee />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            What Pet Parents Say
          </h2>
          <Link href="/contact" className="text-sm font-medium text-orange-600 hover:underline">
            View All Reviews →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.author}
              className="flex gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image src={review.image} alt="" fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <strong className="block text-stone-900">{review.author}</strong>
                <span className="text-sm text-amber-500">★★★★★</span>
                <p className="mt-2 text-sm text-stone-600">&ldquo;{review.quote}&rdquo;</p>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-orange-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              Pet Care Blog
            </h2>
            <Link href="/blog" className="text-sm font-medium text-orange-600 hover:underline">
              View All Posts →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-semibold text-stone-900 group-hover:text-orange-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
