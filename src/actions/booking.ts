"use server";

import {
  addDays,
  setHours,
  setMinutes,
  format,
  isBefore,
  getDay,
} from "date-fns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const BUSINESS_HOURS: Record<number, { start: number; end: number } | null> = {
  0: { start: 10, end: 16 },
  1: { start: 9, end: 19 },
  2: { start: 9, end: 19 },
  3: { start: 9, end: 19 },
  4: { start: 9, end: 19 },
  5: { start: 9, end: 19 },
  6: { start: 9, end: 18 },
};

export async function getAvailableSlots(serviceId: string) {
  const service = await db.service.findUnique({ where: { id: serviceId } });
  if (!service) return [];

  const existing = await db.appointment.findMany({
    where: {
      serviceId,
      status: { in: ["PENDING", "CONFIRMED"] },
      dateTime: { gte: new Date() },
    },
  });

  const bookedTimes = new Set(
    existing.map((a) => a.dateTime.toISOString()),
  );

  const slots: string[] = [];
  const now = new Date();

  for (let day = 0; day < 14; day++) {
    const date = addDays(now, day);
    const hours = BUSINESS_HOURS[getDay(date)];
    if (!hours) continue;

    for (let hour = hours.start; hour < hours.end; hour++) {
      for (const minute of [0, 30]) {
        const slot = setMinutes(setHours(date, hour), minute);
        if (isBefore(slot, now)) continue;
        if (slot.getMinutes() + service.durationMin > 60 && minute === 30) continue;

        const iso = slot.toISOString();
        if (!bookedTimes.has(iso)) {
          slots.push(iso);
        }
      }
    }
  }

  return slots;
}

export async function bookAppointment(
  serviceId: string,
  dateTime: string,
  notes?: string,
) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please sign in to book an appointment" };
  }

  const service = await db.service.findUnique({ where: { id: serviceId } });
  if (!service || !service.active) {
    return { error: "Service not available" };
  }

  const slot = new Date(dateTime);
  if (isBefore(slot, new Date())) {
    return { error: "Cannot book a past time slot" };
  }

  const existing = await db.appointment.findUnique({
    where: { serviceId_dateTime: { serviceId, dateTime: slot } },
  });
  if (existing) {
    return { error: "This time slot is no longer available" };
  }

  await db.appointment.create({
    data: {
      userId: session.user.id,
      serviceId,
      dateTime: slot,
      notes,
      status: "CONFIRMED",
    },
  });

  revalidatePath("/account/appointments");
  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED",
) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId },
  });
  if (!appointment) return { error: "Not found" };

  if (
    session.user.role !== "ADMIN" &&
    appointment.userId !== session.user.id
  ) {
    return { error: "Unauthorized" };
  }

  await db.appointment.update({
    where: { id: appointmentId },
    data: { status },
  });

  revalidatePath("/account/appointments");
  revalidatePath("/admin/bookings");
  return { success: true };
}
