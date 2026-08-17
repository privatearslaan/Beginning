"use client";

import { useState } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  availableSlots: string[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}

export function TimeSlotPicker({
  availableSlots,
  selectedSlot,
  onSelect,
}: TimeSlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd"),
  );

  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const slotsForDate = availableSlots.filter((slot) =>
    slot.startsWith(selectedDate),
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium text-stone-900">Select a date</h3>
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const isPast = isBefore(date, startOfDay(new Date()));
            return (
              <Button
                key={dateStr}
                type="button"
                variant={selectedDate === dateStr ? "default" : "outline"}
                size="sm"
                disabled={isPast}
                onClick={() => setSelectedDate(dateStr)}
              >
                {format(date, "MMM d")}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium text-stone-900">Select a time</h3>
        {slotsForDate.length === 0 ? (
          <p className="text-sm text-stone-500">
            No available slots for this date.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slotsForDate.map((slot) => {
              const time = format(new Date(slot), "h:mm a");
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelect(slot)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-colors",
                    selectedSlot === slot
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-emerald-200 bg-white text-stone-700 hover:bg-emerald-50",
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
