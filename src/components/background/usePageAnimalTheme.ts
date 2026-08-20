"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export type PageAnimalTheme = {
  id: string;
  accent: string;
  glow: string;
  animals: Array<"dog" | "cat" | "bird" | "fish">;
  intensity: number;
};

const THEMES: Record<string, PageAnimalTheme> = {
  home: {
    id: "home",
    accent: "#ff5a00",
    glow: "#d6e51c",
    animals: ["dog", "cat", "bird", "fish"],
    intensity: 1,
  },
  shop: {
    id: "shop",
    accent: "#ff6c0c",
    glow: "#ffb347",
    animals: ["dog", "cat"],
    intensity: 0.95,
  },
  services: {
    id: "services",
    accent: "#d6e51c",
    glow: "#ff5a00",
    animals: ["dog", "cat"],
    intensity: 0.9,
  },
  blog: {
    id: "blog",
    accent: "#4e7c59",
    glow: "#d6e51c",
    animals: ["bird", "cat"],
    intensity: 0.75,
  },
  checkout: {
    id: "checkout",
    accent: "#ff5a00",
    glow: "#ffe4c7",
    animals: ["dog", "cat"],
    intensity: 0.55,
  },
  admin: {
    id: "admin",
    accent: "#746a63",
    glow: "#ff5a00",
    animals: ["cat"],
    intensity: 0.35,
  },
  default: {
    id: "default",
    accent: "#ff5a00",
    glow: "#d6e51c",
    animals: ["dog", "cat", "bird"],
    intensity: 0.8,
  },
};

function resolveThemeKey(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/shop")) return "shop";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/checkout") || pathname.startsWith("/cart")) return "checkout";
  if (pathname.startsWith("/admin")) return "admin";
  return "default";
}

export function usePageAnimalTheme() {
  const pathname = usePathname();

  return useMemo(() => {
    const key = resolveThemeKey(pathname);
    return THEMES[key] ?? THEMES.default;
  }, [pathname]);
}
