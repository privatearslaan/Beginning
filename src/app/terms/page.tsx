import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and conditions for ${SITE.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms and Conditions"
        description={`Shopping, delivery and grooming terms for ${SITE.name}.`}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 text-stone-600 sm:px-6">
        <p>
          Orders, grooming bookings and delivery are subject to service availability in
          supported Anantnag areas. Free delivery applies above Rs. {SITE.freeDeliveryMin}
          where service is available. Use promo code {SITE.promoCode} on your first order.
        </p>
      </div>
    </>
  );
}
