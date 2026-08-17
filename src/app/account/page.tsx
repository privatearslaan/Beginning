import type { Metadata } from "next";
import Link from "next/link";
import { Package, Calendar, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const links = [
    {
      href: "/account/orders",
      icon: Package,
      title: "Order History",
      description: "View your past orders and track status",
    },
    {
      href: "/account/appointments",
      icon: Calendar,
      title: "Appointments",
      description: "Manage your service bookings",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <User className="h-6 w-6 text-emerald-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Hello, {session.user.name}
          </h1>
          <p className="text-stone-600">{session.user.email}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map(({ href, icon: Icon, title, description }) => (
          <Link key={href} href={href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-6">
                <Icon className="h-8 w-8 shrink-0 text-emerald-600" />
                <div>
                  <h2 className="font-semibold text-stone-900">{title}</h2>
                  <p className="text-sm text-stone-600">{description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
