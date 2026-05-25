"use client";

import { cn } from "@/utils/cn";
import type { ConsultationType } from "@/types";

interface ConsultationTypePickerProps {
  value: ConsultationType;
  onChange: (value: ConsultationType) => void;
  hospital?: string;
}

export function ConsultationTypePicker({
  value,
  onChange,
  hospital,
}: ConsultationTypePickerProps) {
  const options: {
    id: ConsultationType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "presencial",
      label: "Presencial",
      description: hospital ?? "Consulta en el consultorio",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: "virtual",
      label: "Virtual",
      description: "Videollamada en línea",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
      ),
    },
  ];

  return (
    <fieldset>
      <legend className="sr-only">Tipo de consulta</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "rounded-xl border-2 p-4 text-left transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                selected
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              )}
              aria-pressed={selected}
            >
              <div className="flex items-center gap-2">
                <span className={selected ? "text-primary-600" : "text-neutral-500"} aria-hidden="true">
                  {option.icon}
                </span>
                <span className="text-base font-semibold text-neutral-900">{option.label}</span>
                {selected && (
                  <span className="ml-auto text-primary-500" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-neutral-500">{option.description}</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
