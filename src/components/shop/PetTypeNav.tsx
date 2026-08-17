"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PET_TYPES } from "@/lib/pets";
import { petTypeLabel, cn } from "@/lib/utils";

export function PetTypeNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activePetType = searchParams.get("petType") ?? "";
  const query = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  if (pathname !== "/shop") return null;

  function hrefFor(petType: string) {
    const params = new URLSearchParams();
    if (petType) params.set("petType", petType);
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  return (
    <div className="mb-8 overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2">
        <Link
          href={hrefFor("")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            !activePetType
              ? "bg-emerald-700 text-white"
              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
          )}
        >
          All Pets
        </Link>
        {PET_TYPES.map((pet) => (
          <Link
            key={pet.value}
            href={hrefFor(pet.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activePetType === pet.value
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
            )}
          >
            <span aria-hidden>{pet.emoji}</span>
            {petTypeLabel(pet.value)}
          </Link>
        ))}
      </div>
    </div>
  );
}
