import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { formatPrice, paymentMethodLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/account" className="mb-4 inline-block text-sm text-emerald-700 hover:underline">
        ← Back to Account
      </Link>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-stone-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-emerald-100 bg-white p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm text-stone-500">
                  {format(order.createdAt, "MMM d, yyyy")}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge>{order.status}</Badge>
                  <Badge variant="outline">{paymentMethodLabel(order.paymentMethod)}</Badge>
                </div>
              </div>
              <p className="mb-2 font-semibold text-emerald-700">
                {formatPrice(order.total.toString())}
              </p>
              <ul className="text-sm text-stone-600">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.product.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
