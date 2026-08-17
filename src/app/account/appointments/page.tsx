import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  AppointmentsList,
  AppointmentsPageHeader,
} from "./AppointmentsList";

export const metadata: Metadata = {
  title: "My Appointments",
};

export default async function AppointmentsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const appointments = await db.appointment.findMany({
    where: { userId: session.user.id },
    include: { service: true },
    orderBy: { dateTime: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <AppointmentsPageHeader />
      <AppointmentsList appointments={appointments} />
    </div>
  );
}
