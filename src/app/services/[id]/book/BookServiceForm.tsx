"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { bookAppointment } from "@/actions/booking";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface BookServicePageProps {
  service: {
    id: string;
    name: string;
    description: string;
    durationMin: number;
    price: { toString(): string } | number | string;
  };
  availableSlots: string[];
}

export function BookServiceForm({
  service,
  availableSlots,
}: BookServicePageProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/services"
        className="mb-4 inline-block text-sm text-emerald-700 hover:underline"
      >
        ← Back to Services
      </Link>
      <h1 className="mb-2 text-2xl font-bold text-stone-900">
        Book: {service.name}
      </h1>
      <p className="mb-1 text-stone-600">{service.description}</p>
      <p className="mb-8 text-lg font-semibold text-emerald-700">
        {formatPrice(service.price.toString())} · {service.durationMin} min
      </p>

      <form
        action={() => {
          if (!selectedSlot) {
            toast.error("Please select a time slot");
            return;
          }
          startTransition(async () => {
            const notes = (
              document.getElementById("notes") as HTMLTextAreaElement
            )?.value;
            const result = await bookAppointment(
              service.id,
              selectedSlot,
              notes,
            );
            if (result.error) {
              toast.error(result.error);
            } else {
              toast.success("Appointment booked!");
              router.push("/account/appointments");
            }
          });
        }}
        className="space-y-6 rounded-xl border border-emerald-100 bg-white p-6"
      >
        <TimeSlotPicker
          availableSlots={availableSlots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />
        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea id="notes" placeholder="Any special requests..." rows={3} />
        </div>
        <Button type="submit" disabled={pending || !selectedSlot} className="w-full">
          {pending ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
}
