"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { MapPin, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { StateSearchSelect } from "@/components/checkout/StateSearchSelect";
import { placeOrder } from "@/actions/checkout";
import {
  buildCheckoutFormData,
  parseCheckoutForm,
  type CheckoutFormValues,
} from "@/lib/checkout-form";
import { formatShippingAddress } from "@/lib/shipping";
import { formatPrice, paymentMethodLabel } from "@/lib/utils";
import { toast } from "sonner";

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

function OrderSummaryPanel({
  items,
  total,
}: {
  items: CheckoutFormProps["items"];
  total: number;
}) {
  return (
    <>
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
        <span className="font-semibold text-stone-900">Total (INR)</span>
        <span className="text-xl font-bold text-emerald-700">
          {formatPrice(total)}
        </span>
      </div>
    </>
  );
}

export function CheckoutForm({
  defaultName,
  defaultEmail,
  items,
  total,
}: CheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [step, setStep] = useState<"details" | "preview">("details");
  const [preview, setPreview] = useState<CheckoutFormValues | null>(null);

  function handlePreview() {
    if (!formRef.current) return;

    const parsed = parseCheckoutForm(new FormData(formRef.current));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setPreview(parsed.data);
    setStep("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <form
          ref={formRef}
          hidden={step === "preview"}
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
            <PhoneInput id="phone" name="phone" required />
            <p className="mt-1 text-xs text-stone-500">
              10-digit Indian mobile number starting with 6–9
            </p>
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
              <Label htmlFor="state">State / UT</Label>
              <StateSearchSelect id="state" name="state" required />
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

          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={handlePreview}
          >
            Preview Delivery & Order
          </Button>
        </form>

        {step === "preview" && preview && (
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  Review Your Order
                </h2>
                <p className="text-sm text-stone-500">
                  Confirm your delivery address before placing the order
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep("details")}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-800">
                <MapPin className="h-4 w-4 shrink-0" />
                Delivery Address
              </div>
              <div className="space-y-1 text-sm text-stone-700">
                {formatShippingAddress({
                  shippingName: preview.fullName,
                  shippingPhone: preview.phone,
                  addressLine1: preview.addressLine1,
                  addressLine2: preview.addressLine2 ?? null,
                  city: preview.city,
                  state: preview.state,
                  pincode: preview.pincode,
                }).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {preview.deliveryNotes && (
                <p className="mt-3 border-t border-emerald-100 pt-3 text-sm text-stone-600">
                  <span className="font-medium text-stone-900">Notes:</span>{" "}
                  {preview.deliveryNotes}
                </p>
              )}
            </div>

            <div className="rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-700">
              Payment: <strong>{paymentMethodLabel("COD")}</strong> ·{" "}
              {formatPrice(total)} due on delivery
            </div>

            <p className="text-sm text-stone-500">
              Confirmation will be sent to {defaultEmail}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:flex-1"
                onClick={() => setStep("details")}
              >
                Back to Edit
              </Button>
              <Button
                type="button"
                className="w-full sm:flex-1"
                size="lg"
                disabled={pending}
                onClick={() => {
                  if (!preview) return;
                  startTransition(async () => {
                    const result = await placeOrder(buildCheckoutFormData(preview));
                    if (result?.error) toast.error(result.error);
                  });
                }}
              >
                {pending ? "Placing Order..." : "Confirm & Place Order"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-stone-900">
          Order Summary
        </h2>
        <OrderSummaryPanel items={items} total={total} />
        <Link
          href="/cart"
          className="mt-4 inline-block text-sm text-emerald-700 hover:underline"
        >
          ← Back to cart
        </Link>
      </div>
    </div>
  );
}
