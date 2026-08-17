import Link from "next/link";
import { Scissors, Truck } from "lucide-react";
import { SITE } from "@/lib/site";

export function TopStrip() {
  return (
    <div className="border-b border-orange-100 bg-stone-900 text-stone-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 sm:text-sm lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-orange-400" />
            Free delivery above Rs. {SITE.freeDeliveryMin}
          </span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 hover:text-orange-300"
          >
            <Scissors className="h-4 w-4" />
            Book Grooming
          </Link>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/track-order" className="hover:text-orange-300">
            Track Order
          </Link>
          <Link href="/help" className="hover:text-orange-300">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
