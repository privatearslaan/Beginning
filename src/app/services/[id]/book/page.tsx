import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getServiceById } from "@/lib/product-catalog";
import {
  getAvailableSlots,
  isGuestBookingMode,
  requiresWhatsAppBooking,
} from "@/actions/booking";
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
  const { id } = await params;
  const [session, guestMode, whatsappMode] = await Promise.all([
    auth(),
    isGuestBookingMode(),
    requiresWhatsAppBooking(id),
  ]);

  if (!session?.user && !whatsappMode) {
    redirect(`/login?callbackUrl=/services/${id}/book`);
  }

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
      guestMode={guestMode}
      whatsappMode={whatsappMode}
      defaultContact={
        session?.user
          ? {
              name: session.user.name,
              email: session.user.email,
            }
          : undefined
      }
    />
  );
}
