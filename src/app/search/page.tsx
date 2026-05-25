"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DoctorCard } from "@/components/medical/DoctorCard";
import { searchDoctors } from "@/services/mockDoctors";
import { SPECIALTIES } from "@/lib/specialties";
import type { Doctor, Specialty } from "@/types";
import { cn } from "@/utils/cn";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | "">(
    (searchParams.get("specialty") as Specialty) ?? ""
  );
  const [availableToday, setAvailableToday] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    const res = await searchDoctors({
      query: query || undefined,
      specialty: selectedSpecialty || undefined,
      availableToday: availableToday || undefined,
    });
    setDoctors(res.data);
    setTotal(res.total);
    setIsLoading(false);
  }, [query, selectedSpecialty, availableToday]);

  useEffect(() => {
    const t = setTimeout(fetchDoctors, 300);
    return () => clearTimeout(t);
  }, [fetchDoctors]);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">
          Buscar médicos
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Filters sidebar ─────────────────────────────────────── */}
          <aside
            className="lg:w-64 flex-shrink-0"
            aria-label="Filtros de búsqueda"
          >
            <div className="bg-white rounded-card border border-black/10 p-5 flex flex-col gap-5">
              <Input
                label="Buscar"
                type="search"
                placeholder="Nombre del médico…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                leftIcon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                }
              />

              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">
                  Especialidad
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    className={cn(
                      "text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                      selectedSpecialty === ""
                        ? "bg-primary-50 text-primary-500 font-medium"
                        : "text-neutral-600 hover:bg-neutral-50"
                    )}
                    onClick={() => setSelectedSpecialty("")}
                    aria-pressed={selectedSpecialty === ""}
                  >
                    Todas
                  </button>
                  {SPECIALTIES.map((s) => (
                    <button
                      key={s.id}
                      className={cn(
                        "text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                        selectedSpecialty === s.id
                          ? "bg-primary-50 text-primary-500 font-medium"
                          : "text-neutral-600 hover:bg-neutral-50"
                      )}
                      onClick={() => setSelectedSpecialty(s.id)}
                      aria-pressed={selectedSpecialty === s.id}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableToday}
                  onChange={(e) => setAvailableToday(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-sm text-neutral-700">Disponible hoy</span>
              </label>
            </div>
          </aside>

          {/* ── Results ────────────────────────────────────────────── */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-neutral-500" aria-live="polite">
                {isLoading ? "Buscando…" : `${total} médico${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-card border border-black/10 p-5 h-32 animate-pulse"
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : doctors.length === 0 ? (
              <div className="bg-white rounded-card border border-black/10 p-10 text-center">
                <p className="text-neutral-500">
                  No encontramos médicos con esos filtros.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    setQuery("");
                    setSelectedSpecialty("");
                    setAvailableToday(false);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
