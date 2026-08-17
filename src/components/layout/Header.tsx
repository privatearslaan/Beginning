"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, PawPrint, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  cartCount: number;
  user?: { name: string; role: "CUSTOMER" | "ADMIN" } | null;
}

export function Header({ cartCount, user }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-cream/95 backdrop-blur supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-bold text-emerald-800"
        >
          <PawPrint className="h-6 w-6 shrink-0 text-orange-500 sm:h-7 sm:w-7" />
          <span className="truncate text-lg sm:text-xl">Pawfect Pets</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-700",
                pathname === link.href
                  ? "text-emerald-700"
                  : "text-stone-600",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
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
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-black/30 md:hidden sm:top-16"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 right-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-emerald-100 bg-white shadow-lg md:hidden sm:top-16 sm:max-h-[calc(100dvh-4rem)]">
            <nav className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3.5 text-base font-medium transition-colors active:bg-emerald-50",
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-stone-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-emerald-100" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3.5 text-base font-medium text-stone-700 active:bg-emerald-50"
                  >
                    My Account
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3.5 text-base font-medium text-stone-700 active:bg-emerald-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="mt-1 w-full" size="lg">
                    Sign In
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
