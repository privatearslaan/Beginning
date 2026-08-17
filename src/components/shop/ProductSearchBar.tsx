"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductSearchBarProps {
  variant?: "hero" | "default";
  className?: string;
}

export function ProductSearchBar({
  variant = "default",
  className,
}: ProductSearchBarProps) {
  const router = useRouter();
  const isHero = variant === "hero";

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = String(formData.get("q") ?? "").trim();
        router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
      }}
    >
      <div
        className={
          isHero
            ? "flex flex-col gap-2 rounded-xl bg-white/95 p-2 shadow-lg sm:flex-row sm:items-center"
            : "flex flex-col gap-2 sm:flex-row sm:items-center"
        }
      >
        <div className="relative flex-1">
          <Search
            className={
              isHero
                ? "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                : "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            }
          />
          <Input
            name="q"
            type="search"
            placeholder="Search food, toys, accessories..."
            className={
              isHero
                ? "h-12 border-0 bg-transparent pl-10 text-base text-stone-900 placeholder:text-stone-400 focus-visible:ring-emerald-500"
                : "pl-9"
            }
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          className={
            isHero
              ? "h-12 w-full bg-orange-500 hover:bg-orange-600 sm:w-auto sm:px-8"
              : "w-full sm:w-auto"
          }
        >
          Search Products
        </Button>
      </div>
    </form>
  );
}
