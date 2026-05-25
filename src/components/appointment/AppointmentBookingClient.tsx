"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ConsultationTypePicker } from "@/components/medical/ConsultationTypePicker";
import { PaymentSummary } from "@/components/medical/PaymentSummary";
import { TimeSlotSelector } from "@/components/medical/TimeSlotSelector";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn, formatCOP } from "@/utils/cn";
import { createAppointment } from "@/services/mockAppointments";
import { SPECIALTY_LABELS } from "@/lib/specialties";
import type { AppointmentDay, ConsultationType, Doctor } from "@/types";

interface AppointmentBookingClientProps {
  doctor: Doctor;
  availability: AppointmentDay[];
}

export function AppointmentBookingClient({ doctor, availability }: AppointmentBookingClientProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(availability[0]?.date ?? "");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [consultationType, setConsultationType] = useState<ConsultationType>("presencial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedDay = useMemo(
    () => availability.find((day) => day.date === selectedDate) ?? availability[0],
    [availability, selectedDate]
  );

  const selectedSlot = useMemo(
    () => selectedDay?.slots.find((slot) => slot.id === selectedSlotId),
    [selectedDay, selectedSlotId]
  );

  const specialtyLabel = SPECIALTY_LABELS[doctor.specialty] ?? doctor.specialty;

  async function handleSubmit(payload: {
    patientName: string;
    document: string;
    phone: string;
    email: string;
    reason: string;
  }) {
    setSubmitError(null);

    if (!selectedDate || !selectedSlot?.time) {
      setSubmitError("Selecciona una fecha y un horario antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAppointment({
        doctorId: doctor.id,
        patientId: payload.document || "guest",
        date: selectedDate,
        time: selectedSlot.time,
        reason: payload.reason,
        consultationType,
      });

      if (!res.success) {
        setSubmitError(res.error ?? "No fue posible agendar la cita.");
        return;
      }

      router.push(
        `/confirmation?code=${res.data.confirmationCode}` +
          `&doctor=${encodeURIComponent(doctor.name)}` +
          `&specialty=${encodeURIComponent(specialtyLabel)}` +
          `&hospital=${encodeURIComponent(doctor.hospital)}` +
          `&address=${encodeURIComponent(doctor.hospitalAddress ?? "")}` +
          `&date=${selectedDate}` +
          `&time=${selectedSlot.time}` +
          `&type=${consultationType}`
      );
    } catch {
      setSubmitError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Sin fecha";

  return (
    <div className="space-y-6">
      {/* ── Doctor banner ─────────────────────────────────────────── */}
      <section className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-500/10 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar name={doctor.name} size="lg" />

          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-neutral-900">{doctor.name}</p>
            <p className="text-sm text-neutral-500">{specialtyLabel}</p>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-neutral-700">
              <span className="inline-flex items-center gap-2 capitalize">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {formattedSelectedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {selectedSlot?.time ?? "Selecciona horario"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold text-primary-500">
              {formatCOP(doctor.consultationFee)}
            </p>
            <p className="text-sm text-neutral-500">por consulta</p>
          </div>
        </div>
      </section>

      {/* ── Day picker ────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <SectionHeader
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          }
          title="Selecciona el día"
        />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {availability.map((day) => {
            const dateObj = new Date(day.date);
            const isSelected = selectedDate === day.date;
            const availableCount = day.slots.filter((s) => s.available).length;
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  setSelectedDate(day.date);
                  setSelectedSlotId("");
                }}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  isSelected
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-primary-300"
                )}
                aria-pressed={isSelected}
              >
                <p className="text-xs font-medium text-neutral-500 capitalize">
                  {dateObj.toLocaleDateString("es-CO", { weekday: "short" })}
                </p>
                <p className={cn("mt-1 text-lg font-semibold", isSelected ? "text-primary-700" : "text-neutral-900")}>
                  {dateObj.getDate()}
                </p>
                <p className="text-xs text-neutral-500">{availableCount} libres</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Time slots ────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <SectionHeader
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          }
          title="Selecciona el horario"
        />
        <p className="mt-1 text-sm text-neutral-500 capitalize">{formattedSelectedDate}</p>
        <div className="mt-4">
          <TimeSlotSelector
            slots={selectedDay?.slots ?? []}
            selectedSlot={selectedSlotId}
            onSelect={setSelectedSlotId}
          />
        </div>
      </section>

      {/* ── Patient data ──────────────────────────────────────────── */}
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <SectionHeader
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
          title="Datos del paciente"
        />
        <div className="mt-4">
          <AppointmentForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            consultationType={consultationType}
            submitLabel={`Confirmar cita — ${formatCOP(doctor.consultationFee)}`}
            extraTop={
              <ConsultationTypePicker
                value={consultationType}
                onChange={setConsultationType}
                hospital={doctor.hospital}
              />
            }
            errorMessage={submitError}
          />
        </div>
      </section>

      {/* ── Cancellation policy ───────────────────────────────────── */}
      <section
        className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 flex items-start gap-3"
        role="note"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Política de cancelación</p>
          <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
            Puedes cancelar o reagendar tu cita sin costo hasta 24 horas antes de la consulta.
          </p>
        </div>
      </section>

      {/* ── Payment summary ───────────────────────────────────────── */}
      <PaymentSummary consultationFee={doctor.consultationFee} />
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary-500" aria-hidden="true">{icon}</span>
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
    </div>
  );
}
