"use client";

import { cn } from "@/utils/cn";

interface ConsultationTypePickerProps {
  value: "presencial" | "virtual";
  onChange: (value: "presencial" | "virtual") => void;
}

export function ConsultationTypePicker({ value, onChange }: ConsultationTypePickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        { id: "presencial", label: "Presencial", description: "Consulta en el consultorio" },
        { id: "virtual", label: "Virtual", description: "Videollamada en línea" },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id as "presencial" | "virtual")}
          className={cn(
            "rounded-xl border p-4 text-left transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            value === option.id
              ? "border-primary-500 bg-primary-50"
              : "border-neutral-200 bg-white hover:border-neutral-300"
          )}
        >
          <span className="block text-sm font-semibold text-neutral-900">{option.label}</span>
          <span className="mt-2 block text-sm text-neutral-500">{option.description}</span>
        </button>
      ))}
    </div>
  );
}
