import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ServiceCard } from "@/components/booking/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description: "Grooming, boarding, and pet care services.",
};

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Our Services</h1>
        <p className="mt-2 text-stone-600">
          Professional care for your beloved companions
        </p>
      </div>
      {services.length === 0 ? (
        <p className="text-stone-500">No services available at the moment.</p>
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
  );
}
