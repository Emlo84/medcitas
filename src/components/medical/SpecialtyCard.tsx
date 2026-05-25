import Image from "next/image";
import Link from "next/link";
import type { SpecialtyInfo } from "@/types";
import { cn } from "@/utils/cn";

// ─── SpecialtyCard ────────────────────────────────────────────────────────

interface SpecialtyCardProps {
  specialty: SpecialtyInfo;
  className?: string;
}

export function SpecialtyCard({ specialty, className }: SpecialtyCardProps) {
  return (
    <Link
      href={`/search?specialty=${specialty.id}`}
      className={cn(
        "group flex flex-col items-center gap-3 p-6 rounded-card",
        "bg-white border border-black/10",
        "hover:border-primary-500/30 hover:shadow-card-hover",
        "transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className
      )}
      aria-label={`Ver médicos de ${specialty.label}`}
    >
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: specialty.accentColor }}
        aria-hidden="true"
      >
        <Image
          src={specialty.iconSrc}
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <span className="text-base font-medium text-neutral-900 text-center leading-snug">
        {specialty.label}
      </span>
    </Link>
  );
}

// ─── SpecialtiesSection ───────────────────────────────────────────────────
// Composes multiple SpecialtyCards — replaces the original Section.jsx

import { SPECIALTIES } from "@/lib/specialties";

interface SpecialtiesSectionProps {
  title?: string;
  limit?: number;
  id?: string;
}

export function SpecialtiesSection({
  title = "Especialidades más buscadas",
  limit,
  id,
}: SpecialtiesSectionProps) {
  const specialties = limit ? SPECIALTIES.slice(0, limit) : SPECIALTIES;

  return (
    <section
      id={id}
      className="w-full py-16 bg-white"
      aria-labelledby="specialties-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="specialties-heading"
          className="text-xl font-medium text-neutral-900 text-center mb-10"
        >
          {title}
        </h2>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          role="list"
          aria-label="Especialidades médicas disponibles"
        >
          {specialties.map((specialty) => (
            <div key={specialty.id} role="listitem">
              <SpecialtyCard specialty={specialty} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
