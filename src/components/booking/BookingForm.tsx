"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { bookAppointment } from "@/actions/booking";
import { formatPrice } from "@/lib/utils";

interface BookServicePageProps {
  service: {
    id: string;
    name: string;
    description: string;
    durationMin: number;
    price: { toString(): string };
  };
  availableSlots: string[];
}

export function BookingForm({
  service,
  availableSlots,
}: BookServicePageProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-stone-900">
        Book: {service.name}
      </h1>
      <p className="mb-2 text-stone-600">{service.description}</p>
      <p className="mb-8 text-lg font-semibold text-emerald-700">
        {formatPrice(service.price.toString())} · {service.durationMin} min
      </p>

      <TimeSlotPicker
        availableSlots={availableSlots}
        selectedSlot={selectedSlot}
        onSelect={setSelectedSlot}
      />

      <div className="mt-6">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests for your pet..."
          className="mt-2"
        />
      </div>

      <Button
        className="mt-8 w-full"
        size="lg"
        disabled={!selectedSlot || pending}
        onClick={() => {
          if (!selectedSlot) return;
          startTransition(async () => {
            const result = await bookAppointment(
              service.id,
              selectedSlot,
              notes || undefined,
            );
            if (result.error) {
              toast.error(result.error);
            } else {
              toast.success("Appointment booked!");
              router.push("/account/appointments");
            }
          });
        }}
      >
        {pending ? "Booking..." : "Confirm Booking"}
      </Button>
    </div>
  );
}
