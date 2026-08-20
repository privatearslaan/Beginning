import Link from "next/link";
import { Scissors, Truck } from "lucide-react";
import { SITE } from "@/lib/site";

export function TopStrip() {
  return (
    <div className="mx-2 mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-brand to-orange-dark text-white shadow-lg shadow-orange-brand/20 sm:mx-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs sm:px-6 sm:text-sm lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Truck className="h-4 w-4" />
            Free delivery above Rs. {SITE.freeDeliveryMin}
          </span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-semibold transition hover:text-lime-brand"
          >
            <Scissors className="h-4 w-4" />
            Book Grooming
          </Link>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/track-order" className="font-semibold hover:text-lime-brand">
            Track Order
          </Link>
          <Link href="/help" className="font-semibold hover:text-lime-brand">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
