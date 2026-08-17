import type { Metadata } from "next";
import Link from "next/link";
import { Package, Calendar, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
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
      description: "Manage your grooming bookings",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Your account"
        title={`Hello, ${session.user.name}`}
        description={session.user.email ?? "Manage orders and grooming appointments."}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <User className="h-6 w-6 text-orange-700" />
          </div>
          <div>
            <p className="font-semibold text-stone-900">{session.user.name}</p>
            <p className="text-sm text-stone-600">{session.user.email}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {links.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <Icon className="h-8 w-8 shrink-0 text-orange-600" />
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
    </>
  );
}
