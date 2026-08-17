import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, SITE } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) return { title: "Article" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();

  const paragraphs = getArticleBody(post.slug);

  return (
    <article>
      <div className="relative h-56 sm:h-72 lg:h-96">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          {post.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-stone-600">{post.excerpt}</p>

        <div className="prose prose-stone mt-10 max-w-none">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mb-4 text-stone-700">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-orange-50 p-6">
          <p className="font-semibold text-stone-900">
            Need product or grooming help?
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Visit {SITE.name} in Anantnag or browse our shop for food, treats,
            toys, and grooming bookings.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="text-sm font-medium text-orange-700 hover:underline"
            >
              Shop products
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-orange-700 hover:underline"
            >
              Book grooming
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function getArticleBody(slug: string): string[] {
  const bodies: Record<string, string[]> = {
    "complete-cat-grooming-guide": [
      "Regular grooming keeps your cat comfortable, reduces shedding, and helps you spot skin issues early. Start with a calm environment and short sessions.",
      "Brush long-haired cats several times a week and short-haired cats weekly. Use cat-safe shampoo only when needed, and keep ears, nails, and coat checked during each session.",
      "If your cat becomes stressed or matted, book a professional groom at The Happy Tails instead of forcing the process at home.",
    ],
    "essential-puppy-care-guide": [
      "A new puppy needs consistent feeding, vaccination planning, safe toys, and gentle socialisation. Choose age-appropriate food and fresh water at all times.",
      "Create a routine for sleep, potty breaks, and play. Puppy-proof your home by removing small objects and securing wires.",
      "Visit us for starter kits, treats, and advice on food suited to your puppy's breed and size.",
    ],
    "when-does-your-pet-need-grooming": [
      "Signs it is time for grooming include matting, strong odour, excessive shedding, dirty paws, or overgrown nails.",
      "Dogs that spend time outdoors may need baths more often, while cats usually need brushing and occasional professional care.",
      "Book salon or home grooming when coat or hygiene changes affect comfort — do not wait until skin irritation appears.",
    ],
    "how-to-pick-the-right-food": [
      "Match food to your pet's age, size, activity level, and any vet recommendations. Puppies and kittens need growth formulas; adults need maintenance nutrition.",
      "Read ingredient labels, avoid sudden diet changes, and introduce new food gradually over several days.",
      "Our team can help you compare trusted brands like Drools, Farmina, and Friskies based on your pet's needs.",
    ],
    "why-anantnag-trusts-happy-tails": [
      "Pet parents in Anantnag value stores that stock genuine products, explain delivery areas clearly, and offer grooming without surprises.",
      "The Happy Tails focuses on local service, WhatsApp support, and categories that cover everyday pet care from food to wellness.",
      "That combination of product quality and reachable support is why customers return for repeat orders and grooming bookings.",
    ],
    "cat-nutrition-guide": [
      "Cats are obligate carnivores and need protein-rich diets with appropriate taurine levels. Wet and dry foods both work when balanced correctly.",
      "Avoid feeding dogs' food to cats, limit treats, and keep fresh water available — especially if your cat eats mostly dry kibble.",
      "Choose food based on life stage and consult your vet for weight or health concerns before making major diet changes.",
    ],
  };

  return bodies[slug] ?? [postFallback(slug)];
}

function postFallback(slug: string): string {
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  return post?.excerpt ?? "More content coming soon.";
}
