"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateAppointmentStatus } from "@/actions/booking";
import { toast } from "sonner";

interface AdminBookingsProps {
  appointments: Array<{
    id: string;
    dateTime: Date;
    status: string;
    notes: string | null;
    user: { name: string; email: string };
    service: { name: string };
  }>;
}

export function AdminBookingsList({ appointments }: AdminBookingsProps) {
  const [pending, startTransition] = useTransition();

  if (appointments.length === 0) {
    return <p className="text-stone-500">No bookings yet.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div
          key={appt.id}
          className="rounded-xl border border-emerald-100 bg-white p-6"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium text-stone-900">{appt.service.name}</p>
              <p className="text-sm text-stone-500">
                {appt.user.name} · {appt.user.email}
              </p>
            </div>
            <Badge>{appt.status}</Badge>
          </div>
          <p className="mb-3 text-sm text-stone-600">
            {format(new Date(appt.dateTime), "EEEE, MMM d 'at' h:mm a")}
          </p>
          {appt.notes && (
            <p className="mb-3 text-sm text-stone-500">Notes: {appt.notes}</p>
          )}
          <Select
            defaultValue={appt.status}
            disabled={pending}
            onChange={(e) => {
              startTransition(async () => {
                const result = await updateAppointmentStatus(
                  appt.id,
                  e.target.value as never,
                );
                if (result.error) toast.error(result.error);
                else toast.success("Booking updated");
              });
            }}
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
      ))}
    </div>
  );
}
