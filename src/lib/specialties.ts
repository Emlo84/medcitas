import type { SpecialtyInfo } from "@/types";

/**
 * Single source of truth for all specialty metadata.
 * Colors are extracted directly from the Figma design.
 * Icons reference SVGs in /public/icons/
 */
export const SPECIALTIES: SpecialtyInfo[] = [
  {
    id: "medicina-general",
    label: "Medicina general",
    iconSrc: "/icons/icon-medicina.svg",
    accentColor: "rgba(0, 102, 204, 0.08)",
    iconColor: "#0066CC",
  },
  {
    id: "odontologia",
    label: "Odontología",
    iconSrc: "/icons/icon-odontologia.svg",
    accentColor: "rgba(0, 168, 150, 0.08)",
    iconColor: "#00A896",
  },
  {
    id: "psicologia",
    label: "Psicología",
    iconSrc: "/icons/icon-psicologia.svg",
    accentColor: "rgba(123, 44, 191, 0.08)",
    iconColor: "#7B2CBF",
  },
  {
    id: "dermatologia",
    label: "Dermatología",
    iconSrc: "/icons/icon-dermatologia.svg",
    accentColor: "rgba(255, 107, 107, 0.08)",
    iconColor: "#FF6B6B",
  },
  {
    id: "cardiologia",
    label: "Cardiología",
    iconSrc: "/icons/icon-cardiologia.svg",
    accentColor: "rgba(239, 68, 68, 0.08)",
    iconColor: "#EF4444",
  },
  {
    id: "pediatria",
    label: "Pediatría",
    iconSrc: "/icons/icon-pediatria.svg",
    accentColor: "rgba(245, 158, 11, 0.08)",
    iconColor: "#F59E0B",
  },
];

export const SPECIALTY_LABELS: Record<string, string> = Object.fromEntries(
  SPECIALTIES.map((s) => [s.id, s.label])
);
