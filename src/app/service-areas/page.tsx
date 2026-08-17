import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Truck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `Delivery and grooming service areas for ${SITE.name} in Anantnag, Jammu & Kashmir.`,
};

const AREA_DETAILS = [
  {
    name: "Anantnag",
    text: "Primary service hub with shop pickup, product delivery, and grooming bookings.",
  },
  {
    name: "Bijbehara",
    text: "Product delivery and home grooming available on supported routes.",
  },
  {
    name: "Khanabal",
    text: "Doorstep delivery for orders above minimum value where routes are active.",
  },
  {
    name: "Achabal",
    text: "Selected delivery and grooming slots — confirm availability at checkout or on WhatsApp.",
  },
] as const;

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we serve"
        title="Service Areas"
        description="Product delivery and grooming across selected areas in and around Anantnag, Jammu & Kashmir."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-orange-100 bg-orange-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 font-semibold text-stone-900">
                <Truck className="h-5 w-5 text-orange-600" />
                Free delivery above ₹{SITE.freeDeliveryMin}
              </p>
              <p className="mt-2 text-stone-600">
                Enter your pincode at checkout to confirm delivery availability.
                Unsupported areas can still reach us for pickup or grooming advice.
              </p>
            </div>
            <Link href="/shop">
              <Button>Shop Now</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {AREA_DETAILS.map((area) => (
            <div
              key={area.name}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-bold text-stone-900">{area.name}</h2>
              </div>
              <p className="text-stone-600">{area.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900">Store location</h2>
          <p className="mt-2 text-stone-600">{SITE.address.line}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
            <Link href="/services">
              <Button>Book Grooming</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
