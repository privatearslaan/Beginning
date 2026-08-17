import { formatIndianPhone } from "@/lib/india";

export function formatShippingAddress(order: {
  shippingName: string;
  shippingPhone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
}) {
  const lines = [
    order.shippingName,
    order.addressLine1,
    order.addressLine2,
    `${order.city}, ${order.state} ${order.pincode}`,
    `Phone: ${formatIndianPhone(order.shippingPhone)}`,
  ].filter(Boolean);

  return lines;
}

export function formatShippingAddressInline(order: {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
}) {
  return [
    order.addressLine1,
    order.addressLine2,
    `${order.city}, ${order.state} - ${order.pincode}`,
  ]
    .filter(Boolean)
    .join(", ");
}
