import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById, getDoctorAvailability } from "@/services/mockDoctors";
import { SPECIALTY_LABELS } from "@/lib/specialties";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { Tabs } from "@/components/common/Tabs";
import { formatCOP } from "@/utils/cn";
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
  if (!doctor) return { title: "Médico no encontrado" };
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

  return (
    <div className="bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ── Back link ─────────────────────────────────────────────── */}
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary-500 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a resultados
        </Link>

        {/* ── Header card ───────────────────────────────────────────── */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar name={doctor.name} size="2xl" />

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                    {doctor.name}
                  </h1>
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white"
                    title="Médico verificado"
                    aria-label="Médico verificado"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <p className="mt-1 text-base text-neutral-500">{specialtyLabel}</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-neutral-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {doctor.hospital}, {doctor.city}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} size="md" />
                <span className="inline-flex items-center gap-2 text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                  {doctor.yearsExperience} años de experiencia
                </span>
                {doctor.recommendationRate != null && (
                  <span className="inline-flex items-center gap-2 text-neutral-700">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {doctor.recommendationRate}% recomendado
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-primary-500">
                  {formatCOP(doctor.consultationFee)}
                </span>
                <span className="text-sm text-neutral-500">por consulta</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/appointment/${doctor.id}`}>
                  <Button variant="primary" size="md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Agendar cita
                  </Button>
                </Link>
                <Button variant="outline" size="md">
                  Compartir perfil
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <Tabs
          defaultTab="info"
          items={[
            {
              id: "info",
              label: "Información",
              content: <InfoTab doctor={doctor} specialtyLabel={specialtyLabel} />,
            },
            {
              id: "horarios",
              label: "Horarios",
              content: <ScheduleTab availability={availability} doctorId={doctor.id} />,
            },
            {
              id: "opiniones",
              label: "Opiniones",
              content: <ReviewsTab />,
            },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Info Tab ─────────────────────────────────────────────────────────

function InfoTab({ doctor, specialtyLabel }: { doctor: Doctor; specialtyLabel: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card icon={<IconUser />} title="Sobre mí">
        <p className="text-sm leading-relaxed text-neutral-600">{doctor.bio}</p>
      </Card>

      <Card icon={<IconBriefcase />} title="Experiencia">
        <ul className="space-y-4">
          {(doctor.experience ?? defaultExperience(specialtyLabel, doctor.hospital)).map((item, idx) => (
            <li key={idx}>
              <p className="text-base font-medium text-neutral-900">{item.role}</p>
              <p className="text-sm text-neutral-500">{item.organization}</p>
              <p className="text-sm text-neutral-500">{item.period}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card icon={<IconGraduationCap />} title="Educación">
        <ul className="space-y-4">
          {(doctor.education ?? defaultEducation(specialtyLabel)).map((item, idx) => (
            <li key={idx}>
              <p className="text-base font-medium text-neutral-900">{item.title}</p>
              <p className="text-sm text-neutral-500">{item.institution}</p>
              <p className="text-sm text-neutral-500">{item.period}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card icon={<IconCheck />} title="Servicios">
        <ul className="space-y-3">
          {(doctor.services ?? [`Consulta de ${specialtyLabel.toLowerCase()}`]).map((service, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
              <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-50 text-primary-500 flex-shrink-0" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {service}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function defaultExperience(specialtyLabel: string, hospital: string) {
  return [
    { role: `Jefe de ${specialtyLabel}`, organization: hospital, period: "2018 - Presente" },
    { role: "Práctica clínica", organization: "Hospital General", period: "2010 - 2018" },
  ];
}

function defaultEducation(specialtyLabel: string) {
  return [
    { title: `Especialización en ${specialtyLabel}`, institution: "Universidad Nacional", period: "2008 - 2011" },
    { title: "Médico Cirujano", institution: "Universidad CES", period: "2002 - 2008" },
  ];
}

// ─── Schedule Tab ─────────────────────────────────────────────────────

function ScheduleTab({ availability, doctorId }: { availability: AppointmentDay[]; doctorId: string }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">
        Selecciona el día y horario que prefieras para agendar tu consulta.
      </p>
      <div className="grid gap-4">
        {availability.slice(0, 4).map((day) => (
          <div key={day.date} className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-semibold text-neutral-900 capitalize">
                {new Date(day.date).toLocaleDateString("es-CO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <span className="text-sm text-neutral-500">
                {day.slots.filter((s) => s.available).length} horarios disponibles
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {day.slots.slice(0, 8).map((slot) => (
                <span
                  key={slot.id}
                  className={
                    slot.available
                      ? "rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm text-primary-700"
                      : "rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm text-neutral-400 line-through"
                  }
                >
                  {slot.time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-2">
        <Link href={`/appointment/${doctorId}`}>
          <Button variant="primary" size="md">Agendar ahora</Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────

function ReviewsTab() {
  const reviews = [
    { name: "Laura M.", rating: 5, comment: "Excelente atención. La consulta fue muy clara y el doctor explicó todo con paciencia." },
    { name: "Carlos R.", rating: 5, comment: "Muy profesional. Atendió mi caso con detalle y me dio un plan de seguimiento excelente." },
    { name: "Andrea P.", rating: 4, comment: "Buena consulta, hubo algo de espera pero la atención fue de calidad." },
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-neutral-900">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary-500" aria-hidden="true">{icon}</span>
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function IconGraduationCap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
