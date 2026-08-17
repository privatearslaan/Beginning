import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ServiceForm } from "./ServiceForm";
import { ServiceList } from "./ServiceList";

export const metadata: Metadata = {
  title: "Manage Services",
};

export default async function AdminServicesPage() {
  const services = await db.service.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Services</h1>
      <ServiceForm />
      <ServiceList services={services} />
    </div>
  );
}
