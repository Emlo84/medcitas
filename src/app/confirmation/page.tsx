import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { code?: string; date?: string; time?: string; doctor?: string };
}) {
  const code = searchParams.code ?? "MED-XXXXXX";
  const doctor = searchParams.doctor ?? "Tu médico";
  const date = searchParams.date ?? "";
  const time = searchParams.time ?? "";

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl border border-black/10 p-10 shadow-card">
          {/* Success icon */}
          <div
            className="w-20 h-20 rounded-full bg-secondary-500/10 flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="#00A896"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-neutral-900">
            ¡Cita confirmada!
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Tu cita ha sido agendada exitosamente.
          </p>

          {/* Confirmation details */}
          <div className="mt-6 bg-neutral-50 rounded-xl p-5 text-left flex flex-col gap-3">
            <DetailRow label="Código de confirmación">
              <span className="font-mono font-bold text-primary-500">{code}</span>
            </DetailRow>
            <DetailRow label="Médico">
              <span className="font-medium text-neutral-900">{doctor}</span>
            </DetailRow>
            {date && (
              <DetailRow label="Fecha">
                <span className="text-neutral-900">
                  {new Date(date).toLocaleDateString("es-CO", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </DetailRow>
            )}
            {time && (
              <DetailRow label="Hora">
                <span className="text-neutral-900">{time}</span>
              </DetailRow>
            )}
          </div>

          <p className="mt-5 text-xs text-neutral-500">
            Recibirás un recordatorio por correo 24 horas antes de tu cita.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/search">
              <Button variant="primary" size="md" fullWidth>
                Agendar otra cita
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="md" fullWidth>
                Ir al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-xs text-neutral-500 flex-shrink-0">{label}</dt>
      <dd className="text-sm text-right">{children}</dd>
    </div>
  );
}
