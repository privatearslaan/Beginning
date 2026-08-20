import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { isDbAvailable } from "@/lib/db-available";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
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

  if (!(await isDbAvailable())) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <AppointmentsPageHeader />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          Appointments are temporarily unavailable online. If you recently sent a
          booking on WhatsApp, our team will confirm it directly.{" "}
          <Link href="/contact" className="font-semibold underline">
            Contact us
          </Link>{" "}
          if you need help.
        </div>
      </div>
    );
  }

  let appointments: Array<{
    id: string;
    dateTime: Date;
    status: string;
    notes: string | null;
    service: { name: string; price: { toString(): string } };
  }> = [];

  try {
    appointments = await db.appointment.findMany({
      where: { userId: session.user.id },
      include: { service: true },
      orderBy: { dateTime: "desc" },
    });
  } catch (error) {
    console.error("Failed to load appointments:", error);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <AppointmentsPageHeader />
      <AppointmentsList appointments={appointments} />
    </div>
  );
}
