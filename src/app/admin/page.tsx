import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [orderCount, bookingCount, productCount, lowStock, unreadMessages] =
    await Promise.all([
      db.order.count(),
      db.appointment.count({ where: { status: { in: ["PENDING", "CONFIRMED"] } } }),
      db.product.count(),
      db.product.count({ where: { stock: { lte: 5 } } }),
      db.contactMessage.count({ where: { read: false } }),
    ]);

  const stats = [
    { label: "Total Orders", value: orderCount },
    { label: "Active Bookings", value: bookingCount },
    { label: "Products", value: productCount },
    { label: "Low Stock Items", value: lowStock },
    { label: "Unread Messages", value: unreadMessages },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-stone-500">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
