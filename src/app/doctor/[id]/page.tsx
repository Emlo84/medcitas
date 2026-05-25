import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById, getDoctorAvailability } from "@/services/mockDoctors";
import { SPECIALTY_LABELS } from "@/lib/specialties";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Tabs } from "@/components/common/Tabs";
import type { Metadata } from "next";
import type { Doctor, AppointmentDay } from "@/types";

interface DoctorPageProps {
  params: { id: string };
}

async function getData(id: string): Promise<{ doctor: Doctor; availability: AppointmentDay[] }> {
  const doctor = await getDoctorById(id);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const availabilityResponse = await getDoctorAvailability(id);
  return { doctor, availability: availabilityResponse.data };
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    return { title: "Médico no encontrado" };
  }

  return {
    title: `${doctor.name} | MedCitas`,
    description: `Perfil de ${doctor.name}, ${SPECIALTY_LABELS[doctor.specialty]}.`,
  };
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  let doctor: Doctor;
  let availability: AppointmentDay[];

  try {
    ({ doctor, availability } = await getData(params.id));
  } catch {
    notFound();
  }

  const specialtyLabel = SPECIALTY_LABELS[doctor.specialty] ?? doctor.specialty;
  const todayAvailability = availability[0]?.slots ?? [];

  const tabs = [
    {
      id: "info",
      label: "Información",
      content: (
        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Sobre mí</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{doctor.bio}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-base font-semibold text-neutral-900">Experiencia</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Jefe de {specialtyLabel} - {doctor.hospital}</li>
                <li>{doctor.yearsExperience} años de práctica clínica.</li>
                <li>Atención integral enfocada en prevención y calidad.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-base font-semibold text-neutral-900">Educación</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Especialización en {specialtyLabel}, Universidad Nacional.</li>
                <li>Médico cirujano con énfasis en práctica clínica.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "horarios",
      label: "Horarios",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">Próximos horarios disponibles para agendar una cita.</p>
          <div className="grid gap-4">
            {availability.slice(0, 4).map((day) => (
              <div key={day.date} className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-neutral-900">{new Date(day.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</p>
                  <span className="text-sm text-neutral-500">{day.slots.filter((slot) => slot.available).length} disponibles</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {day.slots.map((slot) => (
                    <span
                      key={slot.id}
                      className={slot.available ? "rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm text-primary-700" : "rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm text-neutral-400"}
                    >
                      {slot.time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "opiniones",
      label: "Opiniones",
      content: (
        <div className="space-y-4">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-sm text-neutral-600">Opiniones recientes</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="font-semibold text-neutral-900">Excelente atención</p>
                <p className="mt-2 text-sm text-neutral-600">La consulta fue muy clara, el doctor explicó todo con paciencia.</p>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="font-semibold text-neutral-900">Muy profesional</p>
                <p className="mt-2 text-sm text-neutral-600">Atendió mi caso con detalle y me dio un plan de seguimiento excelente.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-start gap-5">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center text-2xl font-semibold text-neutral-900">
                  {doctor.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">{specialtyLabel}</p>
                  <h1 className="mt-2 text-3xl font-semibold text-neutral-900">{doctor.name}</h1>
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-600">
                <p>{doctor.hospital} · {doctor.city}</p>
                <p>{doctor.yearsExperience} años de experiencia</p>
                <p>{doctor.availableToday ? "Disponible hoy" : "No disponible hoy"}</p>
              </div>

              <div className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Por consulta</span>
                  <span className="text-lg font-semibold text-neutral-900">{doctor.consultationFee.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="grid gap-3 w-full">
                <Link href={`/appointment/${doctor.id}`}>
                  <Button variant="primary" size="lg" fullWidth>
                    Agendar cita
                  </Button>
                </Link>
                <Button variant="outline" size="lg" fullWidth>
                  Compartir perfil
                </Button>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <Tabs items={tabs} defaultTab="info" />
          </section>
        </div>
      </div>
    </div>
  );
}
