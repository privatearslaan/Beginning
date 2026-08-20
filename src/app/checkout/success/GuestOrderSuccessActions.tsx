"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GuestOrderSuccessActionsProps {
  whatsappUrl: string;
}

export function GuestOrderSuccessActions({
  whatsappUrl,
}: GuestOrderSuccessActionsProps) {
  useEffect(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-b from-[#ff6c0c] to-orange-brand px-6 text-base font-bold text-white btn-glow hover:from-orange-brand hover:to-orange-dark"
      >
        Send Order on WhatsApp
      </a>
      <Link href="/shop">
        <Button variant="outline">Continue Shopping</Button>
      </Link>
    </div>
  );
}
