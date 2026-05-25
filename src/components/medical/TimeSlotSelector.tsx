"use client";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSelect: (slotId: string) => void;
  isLoading?: boolean;
}

export function TimeSlotSelector({
  slots,
  selectedSlot,
  onSelect,
  isLoading = false,
}: TimeSlotSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelect(slot.id)}
            disabled={!slot.available || isLoading}
            className={cn(
              "p-3 rounded-lg border-2 transition-all",
              "text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              selectedSlot === slot.id
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : slot.available
                  ? "border-neutral-200 hover:border-primary-300 text-neutral-900"
                  : "border-neutral-100 bg-neutral-50 text-neutral-400 cursor-not-allowed"
            )}
            aria-pressed={selectedSlot === slot.id}
            aria-disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {slots.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-500">No hay horarios disponibles</p>
        </div>
      )}
    </div>
  );
}
