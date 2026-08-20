import type { Metadata } from "next";
import { listActiveServices } from "@/lib/product-catalog";
import { PAGE_HERO_PHOTOS } from "@/lib/pet-photos";
import { ServiceCard } from "@/components/booking/ServiceCard";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description: "Grooming, boarding, and pet care services.",
};

export default async function ServicesPage() {
  const services = await listActiveServices();

  return (
    <>
      <PageHero
        eyebrow="Grooming"
        title="Our Services"
        description="Professional care for your beloved companions"
        photos={PAGE_HERO_PHOTOS.services}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {services.length === 0 ? (
          <p className="text-muted">No services available at the moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={{
                  ...service,
                  price: service.price.toString(),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
