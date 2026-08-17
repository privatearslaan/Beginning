"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEARCH_CATEGORIES, SITE } from "@/lib/site";

interface ProductSearchBarProps {
  variant?: "hero" | "default";
  className?: string;
  showCategory?: boolean;
}

export function ProductSearchBar({
  variant = "default",
  className,
  showCategory = true,
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
        const category = String(formData.get("category") ?? "");
        const categoryEntry = SEARCH_CATEGORIES.find((item) => item.value === category);
        const base = categoryEntry && "href" in categoryEntry ? categoryEntry.href : "/shop";
        const url = query ? `${base}${base.includes("?") ? "&" : "?"}q=${encodeURIComponent(query)}` : base;
        router.push(url);
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
            placeholder={SITE.searchPlaceholder}
            className={
              isHero
                ? "h-12 border-0 bg-transparent pl-10 text-base text-stone-900 placeholder:text-stone-400 focus-visible:ring-orange-500"
                : "pl-9"
            }
            autoComplete="off"
          />
        </div>
        {showCategory && (
          <select
            name="category"
            aria-label="Category"
            className={
              isHero
                ? "h-12 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700"
                : "h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700"
            }
            defaultValue=""
          >
            {SEARCH_CATEGORIES.map((category) => (
              <option key={category.value || "all"} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        )}
        <Button
          type="submit"
          size="icon"
          aria-label="Search"
          className={
            isHero
              ? "h-12 w-full bg-orange-500 hover:bg-orange-600 sm:w-12"
              : "h-10 w-full sm:w-10"
          }
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
