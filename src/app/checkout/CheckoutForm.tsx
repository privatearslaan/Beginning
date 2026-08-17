"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/actions/checkout";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

interface CheckoutFormProps {
  defaultName: string;
  defaultEmail: string;
  items: Array<{
    id: string;
    quantity: number;
    product: { name: string; price: { toString(): string } };
  }>;
  total: number;
}

export function CheckoutForm({
  defaultName,
  defaultEmail,
  items,
  total,
}: CheckoutFormProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        action={(formData) => {
          startTransition(async () => {
            const result = await placeOrder(formData);
            if (result?.error) toast.error(result.error);
          });
        }}
        className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            Delivery Details
          </h2>
          <p className="text-sm text-stone-500">
            Cash on Delivery · Pay {formatPrice(total)} when your order arrives
          </p>
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={defaultName}
            required
            autoComplete="name"
          />
        </div>

        <div>
          <Label htmlFor="phone">Mobile Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            required
            autoComplete="tel"
          />
        </div>

        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            placeholder="House no., building, street"
            required
            autoComplete="address-line1"
          />
        </div>

        <div>
          <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            placeholder="Landmark, area"
            autoComplete="address-line2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required autoComplete="address-level2" />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              name="state"
              required
              defaultValue=""
              className="flex h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-base text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:text-sm"
            >
              <option value="" disabled>
                Select state
              </option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="pincode">PIN Code</Label>
          <Input
            id="pincode"
            name="pincode"
            inputMode="numeric"
            placeholder="400001"
            pattern="\d{6}"
            maxLength={6}
            required
            autoComplete="postal-code"
          />
        </div>

        <div>
          <Label htmlFor="deliveryNotes">Delivery Notes (optional)</Label>
          <Textarea
            id="deliveryNotes"
            name="deliveryNotes"
            placeholder="Any instructions for delivery..."
            rows={3}
          />
        </div>

        <p className="text-sm text-stone-500">
          Order updates will be sent to {defaultEmail}
        </p>

        <Button type="submit" disabled={pending} className="w-full" size="lg">
          {pending ? "Placing Order..." : "Place Order · Cash on Delivery"}
        </Button>
      </form>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-stone-900">
          Order Summary
        </h2>
        <ul className="mb-4 space-y-3 text-sm text-stone-700">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span className="shrink-0 font-medium">
                {formatPrice(Number(item.product.price) * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-emerald-200 pt-4">
          <span className="font-semibold text-stone-900">Total</span>
          <span className="text-xl font-bold text-emerald-700">
            {formatPrice(total)}
          </span>
        </div>
        <Link href="/cart" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
          ← Back to cart
        </Link>
      </div>
    </div>
  );
}
