"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "@/actions/checkout";
import { formatPrice, paymentMethodLabel } from "@/lib/utils";
import { toast } from "sonner";

interface AdminOrdersProps {
  orders: Array<{
    id: string;
    status: string;
    paymentMethod: string;
    total: { toString(): string };
    createdAt: Date;
    user: { name: string; email: string };
    items: Array<{ quantity: number; product: { name: string } }>;
  }>;
}

export function AdminOrdersList({ orders }: AdminOrdersProps) {
  const [pending, startTransition] = useTransition();

  if (orders.length === 0) {
    return <p className="text-stone-500">No orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-xl border border-emerald-100 bg-white p-6"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium text-stone-900">{order.user.name}</p>
              <p className="text-sm text-stone-500">{order.user.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{order.status}</Badge>
              <Badge variant="secondary">{paymentMethodLabel(order.paymentMethod)}</Badge>
            </div>
          </div>
          <p className="mb-2 text-sm text-stone-500">
            {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
          </p>
          <p className="mb-2 font-semibold text-emerald-700">
            {formatPrice(order.total.toString())}
          </p>
          <ul className="mb-3 text-sm text-stone-600">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity}x {item.product.name}
              </li>
            ))}
          </ul>
          <Select
            defaultValue={order.status}
            disabled={pending}
            onChange={(e) => {
              startTransition(async () => {
                const result = await updateOrderStatus(
                  order.id,
                  e.target.value as never,
                );
                if (result.error) toast.error(result.error);
                else toast.success("Order updated");
              });
            }}
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
      ))}
    </div>
  );
}
