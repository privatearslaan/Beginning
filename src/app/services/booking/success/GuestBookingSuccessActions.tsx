"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GuestBookingSuccessActionsProps {
  whatsappUrl: string;
}

export function GuestBookingSuccessActions({
  whatsappUrl,
}: GuestBookingSuccessActionsProps) {
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
        Send Booking on WhatsApp
      </a>
      <Link href="/services">
        <Button variant="outline">Browse Services</Button>
      </Link>
    </div>
  );
}
