import Link from "next/link";
import { PET_TYPES, petShopHref } from "@/lib/pets";
import { petTypeLabel } from "@/lib/utils";

export function ShopByPet() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Shop by Pet
        </h2>
        <p className="mt-2 text-stone-600">
          Browse products separated by animal type
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {PET_TYPES.map((pet) => (
          <Link
            key={pet.value}
            href={petShopHref(pet.value)}
            className="group rounded-2xl border border-emerald-100 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <div className="mb-3 text-4xl" aria-hidden>
              {pet.emoji}
            </div>
            <h3 className="font-semibold text-stone-900 group-hover:text-emerald-700">
              {petTypeLabel(pet.value)}
            </h3>
            <p className="mt-1 text-xs text-stone-500 sm:text-sm">
              {pet.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
