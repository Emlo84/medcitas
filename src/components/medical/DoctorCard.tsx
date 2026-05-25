import Link from "next/link";
import type { Doctor } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { formatCOP } from "@/utils/cn";
import { SPECIALTY_LABELS } from "@/lib/specialties";
import { cn } from "@/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
  variant?: "default" | "compact";
}

// ─── Component ────────────────────────────────────────────────────────────

export function DoctorCard({
  doctor,
  className,
  variant = "default",
}: DoctorCardProps) {
  const specialtyLabel = SPECIALTY_LABELS[doctor.specialty] ?? doctor.specialty;

  return (
    <article
      className={cn(
        "bg-white rounded-card border border-black/10 p-5 flex gap-4",
        "hover:shadow-card-hover transition-shadow duration-200",
        className
      )}
      aria-label={`Dr. ${doctor.name}, ${specialtyLabel}`}
    >
      {/* Avatar */}
      <Avatar name={doctor.name} size="md" className="rounded-xl" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-neutral-900 text-base leading-tight">
              {doctor.name}
            </h3>
            <p className="text-sm text-primary-500 font-medium mt-0.5">
              {specialtyLabel}
            </p>
          </div>

          {doctor.availableToday && (
            <span
              className="flex-shrink-0 text-xs font-medium text-secondary-500 bg-secondary-500/10 px-2 py-0.5 rounded-full"
              aria-label="Disponible hoy"
            >
              Hoy
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-3 flex-wrap">
          <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} />
          <span className="text-xs text-neutral-500">
            {doctor.yearsExperience} años de exp.
          </span>
        </div>

        {variant === "default" && (
          <>
            <p className="mt-1.5 text-xs text-neutral-500 truncate">
              {doctor.hospital} · {doctor.city}
            </p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div>
                <span className="text-sm font-semibold text-neutral-900">
                  {formatCOP(doctor.consultationFee)}
                </span>
                <span className="text-xs text-neutral-500 ml-1">/ consulta</span>
              </div>

              <Link href={`/doctor/${doctor.id}`}>
                <Button variant="primary" size="sm">
                  Ver perfil
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
