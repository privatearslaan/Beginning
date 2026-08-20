"use server";

import {
  addDays,
  addMinutes,
  setHours,
  setMinutes,
  format,
  isBefore,
  getDay,
  isValid,
} from "date-fns";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isDbAvailable } from "@/lib/db-available";
import { db } from "@/lib/db";
import {
  getServiceById,
  isFallbackServiceId,
} from "@/lib/product-catalog";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";
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

type BookedInterval = {
  start: Date;
  end: Date;
};

type BookingContact = {
  name: string;
  phone: string;
  email?: string;
};

function slotEnd(start: Date, durationMin: number) {
  return addMinutes(start, durationMin);
}

function intervalsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

function buildBookedIntervals(
  appointments: Array<{ dateTime: Date }>,
  durationMin: number,
): BookedInterval[] {
  return appointments.map((appointment) => ({
    start: appointment.dateTime,
    end: slotEnd(appointment.dateTime, durationMin),
  }));
}

function isSlotAvailable(
  slot: Date,
  durationMin: number,
  bookedIntervals: BookedInterval[],
) {
  const end = slotEnd(slot, durationMin);
  return !bookedIntervals.some((booked) =>
    intervalsOverlap(slot, end, booked.start, booked.end),
  );
}

function generateAvailableSlots(
  durationMin: number,
  bookedIntervals: BookedInterval[],
) {
  const slots: string[] = [];
  const now = new Date();

  for (let day = 0; day < 14; day++) {
    const date = addDays(now, day);
    const hours = BUSINESS_HOURS[getDay(date)];
    if (!hours) continue;

    const dayEndMinutes = hours.end * 60;

    for (let hour = hours.start; hour < hours.end; hour++) {
      for (const minute of [0, 30]) {
        const slot = setMinutes(setHours(date, hour), minute);
        if (isBefore(slot, now)) continue;

        const slotStartMinutes = hour * 60 + minute;
        if (slotStartMinutes + durationMin > dayEndMinutes) continue;

        if (isSlotAvailable(slot, durationMin, bookedIntervals)) {
          slots.push(slot.toISOString());
        }
      }
    }
  }

  return slots;
}

function buildGuestBookingMessage(
  service: {
    name: string;
    durationMin: number;
    price: number | { toString(): string };
  },
  dateTime: Date,
  contact: BookingContact,
  notes?: string,
) {
  return [
    "Hi Happy Tails, I would like to book a grooming appointment:",
    "",
    `Service: ${service.name}`,
    `Duration: ${service.durationMin} min`,
    `Price: ${formatPrice(service.price.toString())}`,
    `Preferred time: ${format(dateTime, "EEEE, MMM d 'at' h:mm a")}`,
    "",
    "Contact details:",
    `Name: ${contact.name}`,
    `Phone: ${contact.phone}`,
    contact.email ? `Email: ${contact.email}` : null,
    notes ? `Notes: ${notes}` : null,
    "",
    "Please confirm this slot. Thank you!",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function isGuestBookingMode() {
  return !(await isDbAvailable());
}

export async function getAvailableSlots(serviceId: string) {
  const service = await getServiceById(serviceId);
  if (!service || !service.active) return [];

  const durationMin = service.durationMin;
  let bookedIntervals: BookedInterval[] = [];

  if ((await isDbAvailable()) && !isFallbackServiceId(serviceId)) {
    try {
      const existing = await db.appointment.findMany({
        where: {
          serviceId,
          status: { in: ["PENDING", "CONFIRMED"] },
          dateTime: { gte: new Date() },
        },
      });
      bookedIntervals = buildBookedIntervals(existing, durationMin);
    } catch (error) {
      console.error("Unable to load booked slots, showing all open times:", error);
    }
  }

  return generateAvailableSlots(durationMin, bookedIntervals);
}

export async function bookAppointment(
  serviceId: string,
  dateTime: string,
  notes?: string,
  contact?: BookingContact,
) {
  const session = await auth();
  const guestMode = await isGuestBookingMode();
  const service = await getServiceById(serviceId);

  if (!service || !service.active) {
    return { error: "Service not available" };
  }

  const slot = new Date(dateTime);
  if (!isValid(slot) || isBefore(slot, new Date())) {
    return { error: "Please choose a valid future time slot" };
  }

  const availableSlots = await getAvailableSlots(serviceId);
  if (!availableSlots.includes(slot.toISOString())) {
    return { error: "This time slot is no longer available" };
  }

  const useWhatsAppBooking =
    guestMode || isFallbackServiceId(serviceId) || !session?.user;

  if (useWhatsAppBooking) {
    const bookingContact: BookingContact = {
      name: contact?.name?.trim() || session?.user?.name || "",
      phone: contact?.phone?.trim() || "",
      email: contact?.email?.trim() || session?.user?.email || undefined,
    };

    if (!bookingContact.name) {
      return { error: "Please enter your name" };
    }
    if (!bookingContact.phone) {
      return { error: "Please enter your phone number" };
    }

    const message = buildGuestBookingMessage(
      {
        name: service.name,
        durationMin: service.durationMin,
        price: service.price,
      },
      slot,
      {
        name: bookingContact.name,
        phone: bookingContact.phone,
        email: bookingContact.email,
      },
      notes?.trim() || undefined,
    );
    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    redirect(
      `/services/booking/success?whatsapp=${encodeURIComponent(whatsappUrl)}`,
    );
  }

  if (!(await isDbAvailable())) {
    return {
      error: "Booking is temporarily unavailable. Please try again later.",
    };
  }

  try {
    const existing = await db.appointment.findMany({
      where: {
        serviceId,
        status: { in: ["PENDING", "CONFIRMED"] },
        dateTime: { gte: new Date() },
      },
    });
    const bookedIntervals = buildBookedIntervals(existing, service.durationMin);
    if (!isSlotAvailable(slot, service.durationMin, bookedIntervals)) {
      return { error: "This time slot is no longer available" };
    }

    await db.appointment.create({
      data: {
        userId: session!.user!.id,
        serviceId,
        dateTime: slot,
        notes: notes?.trim() || null,
        status: "CONFIRMED",
      },
    });
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return { error: "Unable to book this appointment. Please try again." };
  }

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

  if (!(await isDbAvailable())) {
    return {
      error: "Appointments are temporarily unavailable. Please contact us on WhatsApp.",
    };
  }

  try {
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
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return { error: "Unable to update appointment. Please try again." };
  }

  revalidatePath("/account/appointments");
  revalidatePath("/admin/bookings");
  return { success: true };
}
