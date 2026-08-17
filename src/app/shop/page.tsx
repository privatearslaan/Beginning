import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { PetTypeNav } from "@/components/shop/PetTypeNav";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PET_TYPES } from "@/lib/pets";
import { petTypeLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full catalog of pet products.",
};

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    petType?: string;
  }>;
}

function groupProductsByPet<T extends { petType: string }>(products: T[]) {
  const sections: Array<{ key: string; title: string; products: T[] }> = [];

  for (const pet of PET_TYPES) {
    const sectionProducts = products.filter((product) => product.petType === pet.value);
    if (sectionProducts.length > 0) {
      sections.push({
        key: pet.value,
        title: petTypeLabel(pet.value),
        products: sectionProducts,
      });
    }
  }

  const allPetProducts = products.filter((product) => product.petType === "ALL");
  if (allPetProducts.length > 0) {
    sections.push({
      key: "ALL",
      title: petTypeLabel("ALL"),
      products: allPetProducts,
    });
  }

  return sections;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const products = await db.product.findMany({
    where: {
      ...(params.q && {
        OR: [
          { name: { contains: params.q, mode: "insensitive" } },
          { description: { contains: params.q, mode: "insensitive" } },
        ],
      }),
      ...(params.category && { category: params.category as never }),
      ...(params.petType && { petType: params.petType as never }),
    },
    orderBy: { name: "asc" },
  });

  const showGrouped =
    !params.petType && !params.q && !params.category && products.length > 0;
  const groupedProducts = showGrouped ? groupProductsByPet(products) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Shop</h1>
        <p className="mt-2 text-stone-600">
          Find the perfect products for your pet — browse by animal type below
        </p>
      </div>

      <Suspense fallback={null}>
        <PetTypeNav />
      </Suspense>

      <form className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-4">
        <Input
          name="q"
          placeholder="Search products..."
          defaultValue={params.q}
          className="w-full lg:max-w-xs"
        />
        <Select name="category" defaultValue={params.category ?? ""} className="w-full">
          <option value="">All Categories</option>
          <option value="FOOD">Food</option>
          <option value="TOYS">Toys</option>
          <option value="ACCESSORIES">Accessories</option>
          <option value="HEALTH">Health</option>
          <option value="GROOMING">Grooming</option>
        </Select>
        <Select name="petType" defaultValue={params.petType ?? ""} className="w-full">
          <option value="">All Pets</option>
          <option value="DOG">Dogs</option>
          <option value="CAT">Cats</option>
          <option value="BIRD">Birds</option>
          <option value="FISH">Fish</option>
          <option value="SMALL_PET">Small Pets</option>
        </Select>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button type="submit" className="w-full sm:w-auto">
            Filter
          </Button>
          {(params.q || params.category || params.petType) && (
            <Link href="/shop" className="w-full sm:w-auto">
              <Button type="button" variant="outline" className="w-full">
                Clear
              </Button>
            </Link>
          )}
        </div>
      </form>

      {products.length === 0 ? (
        <p className="text-center text-stone-500">No products found.</p>
      ) : showGrouped ? (
        <div className="space-y-12">
          {groupedProducts.map((section) => (
            <section key={section.key} id={section.key.toLowerCase()}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">
                    Products for {section.title.toLowerCase()}
                  </p>
                </div>
                <Link
                  href={`/shop?petType=${section.key}`}
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
