import { HomeHero } from "@/components/home/HomeHero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { ShopCategoriesGrid, BrandMarquee } from "@/components/home/ShopCategoriesGrid";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellersGrid } from "@/components/home/BestSellersGrid";
import { GroomingHomeSection } from "@/components/home/GroomingHomeSection";
import { InteractivePetGallery } from "@/components/home/InteractivePetGallery";
import { BlogImage } from "@/components/blog/BlogImage";
import { PetImage } from "@/components/ui/PetImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { BLOG_POSTS, REVIEWS } from "@/lib/site";
import { getFeaturedProducts } from "@/lib/product-catalog";

export default async function HomePage() {
  const bestSellers = await getFeaturedProducts(8);
  return (
    <>
      <HomeHero />
      <FeatureStrip />
      <InteractivePetGallery />
      <ShopCategoriesGrid />
      <PromoBanner />
      <BestSellersGrid products={bestSellers} />
      <GroomingHomeSection />
      <BrandMarquee />

      <section className="mesh-bg py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Pet Parents Say"
            href="/contact"
            linkLabel="View All Reviews →"
            delay={100}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <blockquote
                key={review.author}
                className="flex gap-4 rounded-[1.5rem] border border-line/70 bg-white/90 p-5 shadow-lg shadow-orange-brand/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-brand/10"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-brand/20">
                  <PetImage src={review.image} alt="" className="object-cover" sizes="64px" />
                </div>
                <div>
                  <strong className="block font-black text-ink">{review.author}</strong>
                  <span className="text-sm text-amber-500">★★★★★</span>
                  <p className="mt-2 text-sm text-muted">&ldquo;{review.quote}&rdquo;</p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Blog"
            title="Pet Care Blog"
            href="/blog"
            linkLabel="View All Posts →"
            delay={120}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[1.5rem] border border-line/70 bg-white shadow-lg shadow-orange-brand/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-brand/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-60" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-orange-brand">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-black text-ink group-hover:text-orange-brand">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
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
