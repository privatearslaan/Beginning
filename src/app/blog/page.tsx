import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { BlogImage } from "@/components/blog/BlogImage";
import { BLOG_POSTS, PAGE_COPY } from "@/lib/site";
import { PAGE_HERO_PHOTOS } from "@/lib/pet-photos";

export const metadata: Metadata = {
  title: "Blog",
  description: PAGE_COPY.blog.description,
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGE_COPY.blog.eyebrow}
        title={PAGE_COPY.blog.title}
        description={PAGE_COPY.blog.description}
        photos={PAGE_HERO_PHOTOS.blog}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </Link>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                  {post.category}
                </span>
                <h2 className="mt-2 text-lg font-bold text-stone-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-orange-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-stone-600">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
