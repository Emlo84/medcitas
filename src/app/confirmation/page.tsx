import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { buildCalendarHref } from "@/utils/calendar";

interface ConfirmationPageProps {
  searchParams: {
    code?: string;
    doctor?: string;
    specialty?: string;
    hospital?: string;
    address?: string;
    date?: string;
    time?: string;
    type?: string;
  };
}

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const code = searchParams.code ?? "MC-XXXXXX";
  const doctor = searchParams.doctor ?? "Tu médico";
  const specialty = searchParams.specialty ?? "";
  const hospital = searchParams.hospital ?? "";
  const address = searchParams.address ?? "";
  const date = searchParams.date ?? "";
  const time = searchParams.time ?? "";
  const type = (searchParams.type as "presencial" | "virtual") ?? "presencial";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("es-CO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const calendarHref = buildCalendarHref({
    title: `Cita con ${doctor}`,
    description: `${specialty}${hospital ? ` — ${hospital}` : ""}\nCódigo: ${code}`,
    location: type === "virtual" ? "Videollamada" : address || hospital,
    date,
    time,
    durationMinutes: 30,
  });

  return (
    <div className="bg-neutral-50 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* ── Hero success ──────────────────────────────────────── */}
        <div className="text-center pt-4">
          <div
            className="mx-auto w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
            aria-hidden="true"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">¡Cita confirmada!</h1>
          <p className="mt-2 text-base text-neutral-500">
            Tu cita ha sido agendada exitosamente. Te hemos enviado un correo de confirmación.
          </p>
        </div>

        {/* ── Detail card ───────────────────────────────────────── */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Detalles de la cita</h2>

          {/* Doctor */}
          <div className="flex items-start gap-4 pb-6 border-b border-black/10">
            <Avatar name={doctor} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-neutral-500 inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Médico
              </p>
              <p className="mt-1 text-lg font-semibold text-neutral-900">{doctor}</p>
              {specialty && <p className="text-sm text-neutral-500">{specialty}</p>}
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-black/10">
            {formattedDate && (
              <DetailItem
                label="Fecha"
                value={<span className="capitalize">{formattedDate}</span>}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                }
              />
            )}
            {time && (
              <DetailItem
                label="Hora"
                value={time}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
              />
            )}
          </div>

          {/* Consultation type */}
          <div className="pb-6 border-b border-black/10">
            <p className="text-sm text-neutral-500 inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Tipo de consulta
            </p>
            <p className="mt-1 text-base font-medium text-neutral-900 capitalize">
              {type === "virtual" ? "Virtual" : "Presencial"}
            </p>
            {type === "presencial" ? (
              <>
                {hospital && <p className="text-sm text-neutral-500">{hospital}</p>}
                {address && <p className="text-sm text-neutral-500">{address}</p>}
              </>
            ) : (
              <p className="text-sm text-neutral-500">
                Recibirás el enlace de la videollamada por correo antes de la cita.
              </p>
            )}
          </div>

          {/* Confirmation code */}
          <div className="bg-neutral-100 rounded-xl p-4 text-center">
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Código de confirmación</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900 font-mono tracking-wider">
              #{code}
            </p>
          </div>
        </section>

        {/* ── Reminders banner ──────────────────────────────────── */}
        <section
          className="rounded-2xl border border-primary-500/20 bg-primary-50 p-5 flex items-start gap-3"
          role="note"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Recordatorios activados</p>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
              Recibirás recordatorios por email y SMS 24 horas y 1 hora antes de tu cita.
            </p>
          </div>
        </section>

        {/* ── Actions ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <a
            href={calendarHref}
            download={`cita-${code}.ics`}
            className="block"
          >
            <Button variant="primary" size="lg" fullWidth>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
              </svg>
              Añadir a calendario
            </Button>
          </a>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/mis-citas">
              <Button variant="outline" size="md" fullWidth>
                Ver mis citas
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="md" fullWidth>
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>

        {/* ── What's next ───────────────────────────────────────── */}
        <section className="pt-8 border-t border-black/10">
          <h2 className="text-lg font-semibold text-neutral-900">¿Qué sigue?</h2>
          <ol className="mt-4 space-y-4">
            <NextStep
              number={1}
              title="Prepara tu documentación"
              description="Lleva tu documento de identidad y estudios médicos previos si los tienes."
            />
            <NextStep
              number={2}
              title="Llega 10 minutos antes"
              description="Te recomendamos llegar con anticipación para completar el registro."
            />
            <NextStep
              number={3}
              title="¿Necesitas cancelar?"
              description='Puedes cancelar sin costo hasta 24 horas antes desde "Mis citas".'
            />
          </ol>
        </section>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500 inline-flex items-center gap-1.5">
        <span className="text-primary-500" aria-hidden="true">{icon}</span>
        {label}
      </p>
      <p className="mt-1 text-base font-medium text-neutral-900">{value}</p>
    </div>
  );
}

function NextStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-sm font-semibold"
        aria-hidden="true"
      >
        {number}
      </span>
      <div>
        <p className="text-base font-medium text-neutral-900">{title}</p>
        <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </li>
  );
}
