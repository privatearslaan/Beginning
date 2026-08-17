"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/checkout";
import { toast } from "sonner";

export function CheckoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      disabled={pending}
      className="w-full"
      onClick={() => {
        startTransition(async () => {
          const result = await createCheckoutSession();
          if (result?.error) toast.error(result.error);
        });
      }}
    >
      {pending ? "Placing order..." : "Place Order · Cash on Delivery"}
    </Button>
  );
}
