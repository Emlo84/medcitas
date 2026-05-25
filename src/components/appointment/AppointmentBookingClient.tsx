"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ConsultationTypePicker } from "@/components/medical/ConsultationTypePicker";
import { PaymentSummary } from "@/components/medical/PaymentSummary";
import { TimeSlotSelector } from "@/components/medical/TimeSlotSelector";
import { cn, formatCOP } from "@/utils/cn";
import type { AppointmentDay, Doctor } from "@/types";

interface AppointmentBookingClientProps {
  doctor: Doctor;
  availability: AppointmentDay[];
}

export function AppointmentBookingClient({ doctor, availability }: AppointmentBookingClientProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(availability[0]?.date ?? "");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [consultationType, setConsultationType] = useState<"presencial" | "virtual">("presencial");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDay = useMemo(
    () => availability.find((day) => day.date === selectedDate) ?? availability[0],
    [availability, selectedDate]
  );

  const selectedSlot = useMemo(
    () => selectedDay?.slots.find((slot) => slot.id === selectedSlotId),
    [selectedDay, selectedSlotId]
  );

  async function handleSubmit(payload: {
    patientName: string;
    document: string;
    phone: string;
    email: string;
    reason: string;
  }) {
    setIsSubmitting(true);

    const confirmationCode = `MED-${Math.floor(100000 + Math.random() * 900000)}`;
    await new Promise((resolve) => setTimeout(resolve, 700));

    router.push(
      `/confirmation?code=${confirmationCode}&doctor=${encodeURIComponent(
        doctor.name
      )}&date=${selectedDate}&time=${selectedSlot?.time ?? ""}`
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center text-lg font-semibold text-neutral-900">
              {doctor.name
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-neutral-900">{doctor.name}</h1>
              <p className="text-sm text-primary-500">{doctor.specialty}</p>
              <p className="text-sm text-neutral-500 mt-1">{doctor.hospital} · {doctor.city}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">Consulta</p>
              <p className="mt-1 text-lg font-semibold text-neutral-900">{formatCOP(doctor.consultationFee)}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">Modalidad</p>
              <p className="mt-1 text-base font-medium text-neutral-900">{consultationType === "presencial" ? "Presencial" : "Virtual"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">Seleccionado</p>
              <p className="mt-1 text-base font-medium text-neutral-900">{selectedDay?.date ?? "Sin fecha"}</p>
              <p className="text-sm text-neutral-500">{selectedSlot?.time ?? "Sin horario"}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Selecciona horario</h2>
            <p className="mt-2 text-sm text-neutral-500">Elige entre las horas disponibles más cercanas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availability.map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  setSelectedDate(day.date);
                  if (!day.slots.some((slot) => slot.id === selectedSlotId)) {
                    setSelectedSlotId("");
                  }
                }}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  selectedDate === day.date
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                )}
              >
                <p className="text-sm font-medium text-neutral-900">{new Date(day.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "short" })}</p>
                <p className="mt-2 text-sm text-neutral-500">{day.slots.filter((slot) => slot.available).length} horarios</p>
              </button>
            ))}
          </div>

          <TimeSlotSelector
            slots={selectedDay?.slots ?? []}
            selectedSlot={selectedSlotId}
            onSelect={setSelectedSlotId}
          />
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8">
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-600">Datos del paciente</p>
              <h2 className="mt-2 text-xl font-semibold text-neutral-900">Completa tu información</h2>
            </div>
            <div className="text-sm text-neutral-500">Tipo de consulta</div>
          </div>

          <div className="mt-6 space-y-6">
            <ConsultationTypePicker value={consultationType} onChange={setConsultationType} />
            <AppointmentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </section>

        <aside className="space-y-6">
          <PaymentSummary consultationFee={doctor.consultationFee} />
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            <p className="font-semibold text-neutral-900">Política de cancelación</p>
            <p className="mt-3 leading-relaxed">
              Puedes cancelar o reagendar tu cita sin costo hasta 24 horas antes de la consulta.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
