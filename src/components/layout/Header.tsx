"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, PawPrint, X } from "lucide-react";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-emerald-800">
          <PawPrint className="h-7 w-7 text-orange-500" />
          <span className="text-xl">Pawfect Pets</span>
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

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartCount}
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
                <Button variant="secondary" size="sm">
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
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-stone-700"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileOpen(false)}>
                  My Account
                </Link>
                {user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)}>
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
