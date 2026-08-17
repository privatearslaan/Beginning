import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminBookingsList } from "./AdminBookingsList";

export const metadata: Metadata = {
  title: "Manage Bookings",
};

export default async function AdminBookingsPage() {
  const appointments = await db.appointment.findMany({
    include: { user: true, service: true },
    orderBy: { dateTime: "desc" },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Bookings</h1>
      <AdminBookingsList appointments={appointments} />
    </div>
  );
}
