import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" description={`How ${SITE.name} handles your data.`} />
      <div className="mx-auto max-w-3xl px-4 py-12 text-stone-600 sm:px-6">
        <p>
          {SITE.name} respects your privacy. Contact us at {SITE.emails.primary} for
          privacy-related questions about orders, grooming bookings and account data.
        </p>
      </div>
    </>
  );
}
