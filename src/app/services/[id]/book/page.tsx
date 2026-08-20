import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getServiceById } from "@/lib/product-catalog";
import { getAvailableSlots } from "@/actions/booking";
import { BookServiceForm } from "./BookServiceForm";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);
  return { title: service ? `Book ${service.name}` : "Book Service" };
}

export default async function BookServicePage({ params }: BookPageProps) {
  const session = await auth();
  if (!session?.user) redirect(`/login?callbackUrl=/services/${(await params).id}/book`);

  const { id } = await params;
  const service = await getServiceById(id);
  if (!service || !service.active) notFound();

  const availableSlots = await getAvailableSlots(id);

  return (
    <BookServiceForm
      service={{
        ...service,
        price: service.price.toString(),
      }}
      availableSlots={availableSlots}
    />
  );
}
