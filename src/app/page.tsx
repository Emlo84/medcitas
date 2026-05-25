import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SpecialtiesSection } from "@/components/medical/SpecialtyCard";

export const metadata: Metadata = {
  title: "MedCitas — Agenda tu cita médica en línea",
};

const STEPS = [
  {
    number: "01",
    title: "Busca tu médico",
    description: "Filtra por especialidad, ciudad o disponibilidad.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Elige tu horario",
    description: "Consulta disponibilidad en tiempo real y selecciona el horario que más te convenga.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Confirma tu cita",
    description: "Recibe confirmación inmediata con código único y recordatorio.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "+5.000", label: "Médicos activos" },
  { value: "+50.000", label: "Citas agendadas" },
  { value: "4.9★", label: "Calificación promedio" },
  { value: "30 seg", label: "Tiempo de agenda" },
];

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="bg-white py-20 sm:py-28"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Salud digital en Colombia
            </span>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight"
            >
              Tu salud,{" "}
              <span className="text-primary-500">cuando la necesitas</span>
            </h1>

            <p className="mt-6 text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
              Agenda citas con los mejores médicos de Colombia en segundos.
              Sin filas, sin llamadas, sin complicaciones.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/search">
                <Button variant="primary" size="lg">
                  Buscar médico ahora
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Crear cuenta gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section
        className="bg-primary-500 py-10"
        aria-label="Estadísticas de la plataforma"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-white/70 text-sm font-medium">{stat.label}</dt>
                <dd className="text-white text-2xl font-bold mt-1">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Specialties ──────────────────────────────────────────────────── */}
      <SpecialtiesSection id="especialidades" />

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section
        id="como-funciona"
        className="bg-neutral-50 py-16 sm:py-20"
        aria-labelledby="steps-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="steps-heading"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-12"
          >
            ¿Cómo funciona?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-card p-6 border border-black/10 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-primary-500 tracking-widest uppercase">
                  Paso {step.number}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/search">
              <Button variant="primary" size="lg">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
