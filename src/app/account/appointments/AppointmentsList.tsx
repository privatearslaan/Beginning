"use client";

import Link from "next/link";
import { useTransition } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateAppointmentStatus } from "@/actions/booking";
import { toast } from "sonner";

interface AppointmentsPageProps {
  appointments: Array<{
    id: string;
    dateTime: Date;
    status: string;
    notes: string | null;
    service: { name: string; price: { toString(): string } };
  }>;
}

export function AppointmentsList({ appointments }: AppointmentsPageProps) {
  const [pending, startTransition] = useTransition();

  if (appointments.length === 0) {
    return <p className="text-stone-500">No appointments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div
          key={appt.id}
          className="rounded-xl border border-emerald-100 bg-white p-6"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-stone-900">{appt.service.name}</h2>
            <Badge>{appt.status}</Badge>
          </div>
          <p className="text-sm text-stone-600">
            {format(new Date(appt.dateTime), "EEEE, MMM d 'at' h:mm a")}
          </p>
          {appt.notes && (
            <p className="mt-2 text-sm text-stone-500">Notes: {appt.notes}</p>
          )}
          {appt.status !== "CANCELLED" && (
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  const result = await updateAppointmentStatus(appt.id, "CANCELLED");
                  if (result.error) toast.error(result.error);
                  else toast.success("Appointment cancelled");
                });
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export function AppointmentsPageHeader() {
  return (
    <>
      <Link href="/account" className="mb-4 inline-block text-sm text-emerald-700 hover:underline">
        ← Back to Account
      </Link>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">My Appointments</h1>
    </>
  );
}
