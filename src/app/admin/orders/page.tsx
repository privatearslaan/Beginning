import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminOrdersList } from "./AdminOrdersList";

export const metadata: Metadata = {
  title: "Manage Orders",
};

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Orders</h1>
      <AdminOrdersList orders={orders} />
    </div>
  );
}
