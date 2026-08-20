"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  guestMode?: boolean;
  whatsappMode?: boolean;
  defaultContact?: {
    name: string;
    email?: string | null;
  };
}

export function BookServiceForm({
  service,
  availableSlots,
  guestMode = false,
  whatsappMode = false,
  defaultContact,
}: BookServicePageProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState(defaultContact?.name ?? "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(defaultContact?.email ?? "");
  const [pending, startTransition] = useTransition();

  const needsContactFields = whatsappMode || !defaultContact;
  const needsPhone = true;

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
      <p className="mb-4 text-lg font-semibold text-emerald-700">
        {formatPrice(service.price.toString())} · {service.durationMin} min
      </p>

      {whatsappMode && (
        <p className="mb-8 rounded-xl border border-orange-brand/20 bg-orange-brand/8 px-4 py-3 text-sm text-stone-700">
          {guestMode
            ? "Online booking will send your request to our team on WhatsApp for confirmation. No account needed."
            : "Select a slot and send your booking request on WhatsApp. Our team will confirm your appointment."}
        </p>
      )}

      {availableSlots.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          No open slots are available right now. Please check back later or{" "}
          <Link href="/contact" className="font-semibold underline">
            contact us
          </Link>
          .
        </div>
      ) : (
        <form
          action={() => {
            if (!selectedSlot) {
              toast.error("Please select a time slot");
              return;
            }
            startTransition(async () => {
              try {
                const notes = (
                  document.getElementById("notes") as HTMLTextAreaElement
                )?.value;
                const result = await bookAppointment(
                  service.id,
                  selectedSlot,
                  notes,
                  {
                    name: name || defaultContact?.name || "",
                    phone,
                    email: email || defaultContact?.email || undefined,
                  },
                );

                if (result?.error) {
                  toast.error(result.error);
                  return;
                }

                if (result?.redirectUrl) {
                  router.push(result.redirectUrl);
                  return;
                }

                if (result?.success) {
                  toast.success("Appointment booked!");
                  router.push("/account/appointments");
                }
              } catch {
                toast.error("Something went wrong. Please try again.");
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

          {needsContactFields && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="booking-name">Your name</Label>
                <Input
                  id="booking-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="booking-phone">Phone</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="10-digit mobile"
                  required
                />
              </div>
              <div>
                <Label htmlFor="booking-email">Email (optional)</Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {needsPhone && !needsContactFields && (
            <div>
              <Label htmlFor="booking-phone">Phone for confirmation</Label>
              <Input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="10-digit mobile"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Any special requests..." rows={3} />
          </div>
          <Button type="submit" disabled={pending || !selectedSlot} className="w-full">
            {pending
              ? "Booking..."
              : whatsappMode
                ? "Send Booking on WhatsApp"
                : "Confirm Booking"}
          </Button>
        </form>
      )}
    </div>
  );
}
