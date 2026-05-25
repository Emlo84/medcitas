"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarCircle } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SPECIALTY_LABELS } from "@/lib/specialties";
import { cn } from "@/utils/cn";
import type { AppointmentStatus } from "@/types";
import type { AppointmentWithDoctor } from "@/services/mockAppointments";
import { cancelAppointment } from "@/services/mockAppointments";

interface MyAppointmentsClientProps {
  user: { name: string; email: string };
  upcoming: AppointmentWithDoctor[];
  past: AppointmentWithDoctor[];
}

export function MyAppointmentsClient({ user, upcoming: initialUpcoming, past }: MyAppointmentsClientProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function handleCancel(appointmentId: string) {
    const confirmed = window.confirm(
      "¿Seguro que quieres cancelar esta cita? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;
    setCancelingId(appointmentId);
    const res = await cancelAppointment(appointmentId);
    if (res.success) {
      setUpcoming((prev) => prev.filter((a) => a.id !== appointmentId));
    }
    setCancelingId(null);
  }

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div className="bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              {/* User */}
              <div className="flex items-center gap-3 pb-5 border-b border-black/10">
                <AvatarCircle name={user.name} size="md" />
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">{user.name}</p>
                  <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="mt-4 flex flex-col gap-1" aria-label="Menú de usuario">
                <SidebarLink href="/mis-citas" active label="Mis citas" icon={<IconCalendar />} />
                <SidebarLink href="/profile" label="Mi perfil" icon={<IconUser />} />
                <SidebarLink href="/settings" label="Configuración" icon={<IconSettings />} />
              </nav>

              {/* Stats */}
              <div className="mt-5 pt-5 border-t border-black/10 space-y-2">
                <SidebarStat label="Citas próximas" value={upcoming.length} highlight />
                <SidebarStat
                  label="Citas completadas"
                  value={past.filter((a) => a.status === "completed").length}
                />
              </div>
            </div>
          </aside>

          {/* ── Main ───────────────────────────────────────────── */}
          <main className="space-y-6">
            <header>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Mis citas médicas</h1>
              <p className="mt-1 text-base text-neutral-500">
                Gestiona tus citas próximas y consulta tu historial
              </p>
            </header>

            {/* Tabs */}
            <div className="border-b border-black/10">
              <div className="flex gap-2 sm:gap-6">
                <TabButton
                  active={tab === "upcoming"}
                  onClick={() => setTab("upcoming")}
                >
                  Próximas ({upcoming.length})
                </TabButton>
                <TabButton
                  active={tab === "past"}
                  onClick={() => setTab("past")}
                >
                  Pasadas ({past.length})
                </TabButton>
              </div>
            </div>

            {/* Appointments list */}
            {list.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              <ul className="space-y-4">
                {list.map((apt) => (
                  <li key={apt.id}>
                    <AppointmentCard
                      appointment={apt}
                      onCancel={() => handleCancel(apt.id)}
                      isCanceling={cancelingId === apt.id}
                      isPast={tab === "past"}
                    />
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── AppointmentCard ──────────────────────────────────────────────────

function AppointmentCard({
  appointment,
  onCancel,
  isCanceling,
  isPast,
}: {
  appointment: AppointmentWithDoctor;
  onCancel: () => void;
  isCanceling: boolean;
  isPast: boolean;
}) {
  const { doctor } = appointment;
  if (!doctor) return null;

  const specialtyLabel = SPECIALTY_LABELS[doctor.specialty] ?? doctor.specialty;
  const formattedDate = new Date(appointment.date).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isVirtual = appointment.consultationType === "virtual";
  const canCancel = !isPast && appointment.status === "confirmed";

  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Avatar name={doctor.name} size="lg" />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{doctor.name}</h3>
              <p className="text-sm text-neutral-500">{specialtyLabel}</p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-neutral-700">
            <span className="inline-flex items-center gap-1.5 capitalize">
              <IconCalendarSmall />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock />
              {appointment.time}
            </span>
            <span className="inline-flex items-center gap-1.5">
              {isVirtual ? <IconVideo /> : <IconMapPin />}
              {isVirtual ? "Videollamada" : doctor.hospital}
            </span>
          </div>

          {/* Confirmation */}
          <p className="mt-2 text-sm text-neutral-500">
            Confirmación:{" "}
            <span className="font-medium text-neutral-900 font-mono">
              #{appointment.confirmationCode}
            </span>
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/doctor/${doctor.id}`}>
              <Button variant="primary" size="sm">
                <IconEye />
                Ver detalles
              </Button>
            </Link>
            {!isPast && (
              <Link href={`/appointment/${doctor.id}`}>
                <Button variant="outline" size="sm">
                  <IconRefresh />
                  Reprogramar
                </Button>
              </Link>
            )}
            {canCancel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                isLoading={isCanceling}
                className="text-danger-500 hover:bg-danger-500/10 border border-danger-500/30"
              >
                <IconX />
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config: Record<AppointmentStatus, { label: string; className: string; icon: React.ReactNode }> = {
    confirmed: {
      label: "Confirmada",
      className: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
      icon: <IconCheckSmall />,
    },
    pending: {
      label: "Pendiente",
      className: "bg-amber-400/10 border-amber-400/30 text-amber-600",
      icon: <IconClockSmall />,
    },
    cancelled: {
      label: "Cancelada",
      className: "bg-danger-500/10 border-danger-500/30 text-danger-500",
      icon: <IconX />,
    },
    completed: {
      label: "Completada",
      className: "bg-primary-50 border-primary-200 text-primary-600",
      icon: <IconCheckSmall />,
    },
  };
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium",
        c.className
      )}
    >
      {c.icon}
      {c.label}
    </span>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: "upcoming" | "past" }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center">
        <IconCalendar />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">
        {tab === "upcoming" ? "No tienes citas próximas" : "No tienes citas pasadas"}
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        {tab === "upcoming"
          ? "Agenda una cita con uno de nuestros médicos."
          : "Aquí aparecerán tus citas completadas o canceladas."}
      </p>
      {tab === "upcoming" && (
        <Link href="/search" className="inline-block mt-5">
          <Button variant="primary" size="md">Buscar médico</Button>
        </Link>
      )}
    </div>
  );
}

// ─── Sidebar bits ─────────────────────────────────────────────────────

function SidebarLink({
  href,
  label,
  icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-primary-500 text-white"
          : "text-neutral-700 hover:bg-neutral-100"
      )}
      aria-current={active ? "page" : undefined}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </Link>
  );
}

function SidebarStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className={cn("font-semibold", highlight ? "text-primary-500" : "text-neutral-900")}>
        {value}
      </span>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-1 sm:px-2 py-3 text-sm sm:text-base font-medium border-b-2 -mb-px transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-t",
        active
          ? "border-primary-500 text-primary-500"
          : "border-transparent text-neutral-500 hover:text-neutral-900"
      )}
    >
      {children}
    </button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconCalendarSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconClockSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500" aria-hidden="true">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
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

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function IconCheckSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}
