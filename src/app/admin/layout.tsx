import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Scissors,
  ShoppingCart,
  Calendar,
  Mail,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/services", icon: Scissors, label: "Services" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { href: "/admin/messages", icon: Mail, label: "Messages" },
];

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <h2 className="mb-4 text-lg font-bold text-emerald-800">Admin</h2>
        <nav className="space-y-1">
          {adminLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-emerald-50 hover:text-emerald-800",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
