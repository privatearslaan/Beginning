"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: () => void) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutProps {
  orderId: string;
  amount: number;
  amountPaise: number;
  razorpayOrderId: string;
  keyId: string;
  customerName: string;
  customerEmail: string;
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayCheckout({
  orderId,
  amount,
  amountPaise,
  razorpayOrderId,
  keyId,
  customerName,
  customerEmail,
}: RazorpayCheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const openedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function openCheckout() {
      const loaded = await loadRazorpayScript();
      if (cancelled) return;

      if (!loaded || !window.Razorpay) {
        setLoading(false);
        toast.error("Could not load Razorpay checkout. Please try again.");
        return;
      }

      if (openedRef.current) return;
      openedRef.current = true;

      const rzp = new window.Razorpay({
        key: keyId,
        amount: amountPaise,
        currency: "INR",
        name: "Pawfect Pets",
        description: "Pet shop order payment",
        order_id: razorpayOrderId,
        prefill: {
          name: customerName,
          email: customerEmail,
        },
        theme: { color: "#059669" },
        handler: async (response) => {
          setPaying(true);
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const result = await verifyRes.json();
            if (!verifyRes.ok || result.error) {
              toast.error(result.error ?? "Payment verification failed");
              setPaying(false);
              return;
            }

            router.push(`/checkout/success?order_id=${orderId}`);
            router.refresh();
          } catch {
            toast.error("Payment verification failed. Please contact support.");
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.message("Payment cancelled. You can try again.");
          },
        },
      });

      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try another method.");
        setPaying(false);
      });

      setLoading(false);
      rzp.open();
    }

    openCheckout();

    return () => {
      cancelled = true;
    };
  }, [
    amountPaise,
    customerEmail,
    customerName,
    keyId,
    orderId,
    razorpayOrderId,
    router,
  ]);

  return (
    <div className="mx-auto max-w-md rounded-xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
      {loading || paying ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          <p className="text-stone-600">
            {paying
              ? "Confirming your payment..."
              : "Opening secure payment gateway..."}
          </p>
          <p className="text-sm text-stone-500">
            Pay with UPI, cards, netbanking, or wallets
          </p>
        </div>
      ) : (
        <>
          <p className="mb-2 text-lg font-semibold text-stone-900">
            Pay {formatPrice(amount)}
          </p>
          <p className="mb-6 text-sm text-stone-600">
            UPI · Cards · Netbanking · Wallets
          </p>
          <Button
            className="w-full"
            onClick={() => {
              openedRef.current = false;
              setLoading(true);
              window.location.reload();
            }}
          >
            Retry Payment
          </Button>
        </>
      )}
    </div>
  );
}
