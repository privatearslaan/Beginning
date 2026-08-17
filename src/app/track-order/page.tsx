import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Track Order",
  description: `Track your ${SITE.name} order status and delivery updates.`,
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Order updates"
        title="Track Order"
        description="Sign in to view order history and status, or check your order confirmation for delivery updates."
      />

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900">How to track</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-stone-600">
            <li>Sign in to your account and open My Orders.</li>
            <li>Find your order ID from the confirmation page or SMS/email.</li>
            <li>
              For cash-on-delivery orders, our team confirms dispatch and
              delivery timing for supported Anantnag areas.
            </li>
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/account/orders">
              <Button className="w-full sm:w-auto">View My Orders</Button>
            </Link>
            <Link href="/login?callbackUrl=/account/orders">
              <Button variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            Need help with a specific order? Contact us with your order ID at{" "}
            <a
              href={`mailto:${SITE.emails.support}`}
              className="text-orange-700 hover:underline"
            >
              {SITE.emails.support}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
