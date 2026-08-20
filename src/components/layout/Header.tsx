"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductSearchBar } from "@/components/shop/ProductSearchBar";
import { useWishlist } from "@/hooks/useWishlist";
import { NAV_LINKS, SITE } from "@/lib/site";

interface HeaderProps {
  cartCount: number;
  user?: { name: string; role: "CUSTOMER" | "ADMIN" } | null;
}

export function Header({ cartCount, user }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 glass-panel supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={180}
              height={58}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <ProductSearchBar className="hidden max-w-md flex-1 lg:block" />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-brand px-1 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-brand px-1 text-[10px] font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                {user.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/account">
                  <Button variant="secondary" size="sm" className="max-w-[8rem] truncate">
                    {user.name}
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-1 overflow-x-auto border-t border-line/60 py-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide transition-all",
                isActive(link.href)
                  ? "bg-orange-brand text-white shadow-md shadow-orange-brand/25"
                  : "text-ink hover:bg-orange-50 hover:text-orange-brand",
              )}
            >
              {link.label}
              {"badge" in link && link.badge && (
                <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 right-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line glass-panel lg:hidden">
            <div className="border-b border-line/60 p-4">
              <ProductSearchBar />
            </div>
            <nav className="flex flex-col px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3.5 text-base font-bold transition-colors",
                    isActive(link.href)
                      ? "bg-orange-50 text-orange-brand"
                      : "text-ink active:bg-orange-50",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {[
                { href: "/track-order", label: "Track Order" },
                { href: "/help", label: "Help & Support" },
                { href: "/wishlist", label: `Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ""}` },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base font-bold text-ink active:bg-orange-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-line/60" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3.5 text-base font-bold text-ink active:bg-orange-50"
                  >
                    My Account
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-3.5 text-base font-bold text-ink active:bg-orange-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="mt-1 w-full" size="lg">
                    Sign In / Register
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
