import type { Doctor, Specialty, SearchDoctorsParams, PaginatedResponse } from "@/types";

// ─── Mock Data ────────────────────────────────────────────────────────────

const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-001",
    name: "Dra. Ivanna Valentina Acosta",
    specialty: "medicina-general",
    rating: 4.9,
    reviewCount: 312,
    yearsExperience: 12,
    consultationFee: 80000,
    avatarUrl: "/avatars/doctor-1.jpg",
    hospital: "Clínica del Occidente",
    city: "Medellín",
    availableToday: true,
    bio: "Médica general con enfoque en medicina preventiva y atención primaria integral. Comprometida con el bienestar del paciente.",
  },
  {
    id: "doc-002",
    name: "Dr. Andrés Mejía",
    specialty: "odontologia",
    rating: 4.8,
    reviewCount: 198,
    yearsExperience: 8,
    consultationFee: 90000,
    avatarUrl: "/avatars/doctor-2.jpg",
    hospital: "Centro Odontológico Premium",
    city: "Medellín",
    availableToday: true,
    bio: "Odontólogo especializado en ortodoncia y estética dental. Más de 8 años transformando sonrisas.",
  },
  {
    id: "doc-003",
    name: "Dra. Sofía Castillo",
    specialty: "psicologia",
    rating: 4.9,
    reviewCount: 245,
    yearsExperience: 10,
    consultationFee: 95000,
    avatarUrl: "/avatars/doctor-3.jpg",
    hospital: "Centro de Salud Mental Serena",
    city: "Medellín",
    availableToday: false,
    bio: "Psicóloga clínica con especialización en terapia cognitivo-conductual. Atención de ansiedad, depresión y manejo del estrés.",
  },
  {
    id: "doc-004",
    name: "Dr. Felipe Morales",
    specialty: "dermatologia",
    rating: 4.7,
    reviewCount: 167,
    yearsExperience: 15,
    consultationFee: 120000,
    avatarUrl: "/avatars/doctor-4.jpg",
    hospital: "Instituto Dermatológico Nacional",
    city: "Bogotá",
    availableToday: true,
    bio: "Dermatólogo con amplia experiencia en dermatología clínica y estética. Especialista en tratamiento de acné y enfermedades cutáneas.",
  },
  {
    id: "doc-005",
    name: "Dra. Carolina López",
    specialty: "cardiologia",
    rating: 5.0,
    reviewCount: 89,
    yearsExperience: 18,
    consultationFee: 150000,
    avatarUrl: "/avatars/doctor-5.jpg",
    hospital: "Clínica Cardiovascular",
    city: "Medellín",
    availableToday: false,
    bio: "Cardióloga con subespecialidad en ecocardiografía. Referente en cardiología preventiva e intervencionista.",
  },
];

// ─── Service Functions ─────────────────────────────────────────────────────

/**
 * Simulates GET /api/doctors
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function searchDoctors(
  params: SearchDoctorsParams = {}
): Promise<PaginatedResponse<Doctor>> {
  // Simulate network latency
  await delay(400);

  let results = [...MOCK_DOCTORS];

  if (params.specialty) {
    results = results.filter((d) => d.specialty === params.specialty);
  }

  if (params.city) {
    results = results.filter((d) =>
      d.city.toLowerCase().includes(params.city!.toLowerCase())
    );
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.hospital.toLowerCase().includes(q)
    );
  }

  if (params.availableToday) {
    results = results.filter((d) => d.availableToday);
  }

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const start = (page - 1) * pageSize;

  return {
    data: results.slice(start, start + pageSize),
    total: results.length,
    page,
    pageSize,
    error: null,
    success: true,
  };
}

/**
 * Simulates GET /api/doctors/:id
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function getDoctorById(
  id: string
): Promise<Doctor | null> {
  await delay(200);
  return MOCK_DOCTORS.find((d) => d.id === id) ?? null;
}

/**
 * Simulates GET /api/doctors/:id/availability
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function getDoctorAvailability(doctorId: string) {
  await delay(300);

  // Generate mock slots for the next 7 days
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    const slots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
      (time, idx) => ({
        id: `${doctorId}-${dateStr}-${time}`,
        time,
        available: Math.random() > 0.3, // 70% availability
      })
    );

    days.push({ date: dateStr, slots });
  }

  return { data: days, error: null, success: true };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { MOCK_DOCTORS };
