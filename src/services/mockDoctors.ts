import type { Doctor, SearchDoctorsParams, PaginatedResponse } from "@/types";

// ─── Mock Data ────────────────────────────────────────────────────────────

const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-001",
    name: "Dra. Ivanna Valentina Acosta",
    specialty: "medicina-general",
    rating: 4.9,
    reviewCount: 312,
    yearsExperience: 12,
    recommendationRate: 97,
    consultationFee: 80000,
    avatarUrl: "/avatars/doctor-1.jpg",
    hospital: "Clínica del Occidente",
    hospitalAddress: "Cra. 50 #67-21, Medellín",
    city: "Medellín",
    availableToday: true,
    bio: "Médica general con enfoque en medicina preventiva y atención primaria integral. Comprometida con el bienestar del paciente.",
    experience: [
      { role: "Médica general senior", organization: "Clínica del Occidente", period: "2017 - Presente" },
      { role: "Médica de atención primaria", organization: "Centro de Salud Comunitario", period: "2012 - 2017" },
    ],
    education: [
      { title: "Especialización en Medicina Familiar", institution: "Universidad de Antioquia", period: "2010 - 2012" },
      { title: "Médico Cirujano", institution: "Universidad CES", period: "2004 - 2010" },
    ],
    services: [
      "Consulta médica general",
      "Chequeos preventivos",
      "Control de enfermedades crónicas",
      "Vacunación adultos",
      "Certificados médicos",
    ],
  },
  {
    id: "doc-002",
    name: "Dr. Andrés Mejía",
    specialty: "odontologia",
    rating: 4.8,
    reviewCount: 198,
    yearsExperience: 8,
    recommendationRate: 95,
    consultationFee: 90000,
    avatarUrl: "/avatars/doctor-2.jpg",
    hospital: "Centro Odontológico Premium",
    hospitalAddress: "Cl. 10 #43A-15, Medellín",
    city: "Medellín",
    availableToday: true,
    bio: "Odontólogo especializado en ortodoncia y estética dental. Más de 8 años transformando sonrisas.",
    experience: [
      { role: "Director clínico", organization: "Centro Odontológico Premium", period: "2019 - Presente" },
      { role: "Odontólogo asociado", organization: "Smile Dental", period: "2016 - 2019" },
    ],
    education: [
      { title: "Especialización en Ortodoncia", institution: "Universidad El Bosque", period: "2014 - 2016" },
      { title: "Odontólogo", institution: "Universidad CES", period: "2009 - 2014" },
    ],
    services: [
      "Consulta odontológica general",
      "Ortodoncia",
      "Blanqueamiento dental",
      "Limpieza profesional",
      "Endodoncia",
      "Diseño de sonrisa",
    ],
  },
  {
    id: "doc-003",
    name: "Dra. Sofía Castillo",
    specialty: "psicologia",
    rating: 4.9,
    reviewCount: 245,
    yearsExperience: 10,
    recommendationRate: 98,
    consultationFee: 95000,
    avatarUrl: "/avatars/doctor-3.jpg",
    hospital: "Centro de Salud Mental Serena",
    hospitalAddress: "Cra. 43A #1-50, Medellín",
    city: "Medellín",
    availableToday: false,
    bio: "Psicóloga clínica con especialización en terapia cognitivo-conductual. Atención de ansiedad, depresión y manejo del estrés.",
    experience: [
      { role: "Psicóloga clínica senior", organization: "Centro de Salud Mental Serena", period: "2018 - Presente" },
      { role: "Psicóloga clínica", organization: "Hospital Universitario", period: "2014 - 2018" },
    ],
    education: [
      { title: "Maestría en Psicología Clínica", institution: "Universidad Pontificia Bolivariana", period: "2012 - 2014" },
      { title: "Psicología", institution: "Universidad de Antioquia", period: "2007 - 2012" },
    ],
    services: [
      "Terapia individual para adultos",
      "Terapia cognitivo-conductual",
      "Manejo de ansiedad y depresión",
      "Acompañamiento en duelo",
      "Terapia de pareja",
    ],
  },
  {
    id: "doc-004",
    name: "Dr. Felipe Morales",
    specialty: "dermatologia",
    rating: 4.7,
    reviewCount: 167,
    yearsExperience: 15,
    recommendationRate: 96,
    consultationFee: 120000,
    avatarUrl: "/avatars/doctor-4.jpg",
    hospital: "Instituto Dermatológico Nacional",
    hospitalAddress: "Cl. 93 #11-20, Bogotá",
    city: "Bogotá",
    availableToday: true,
    bio: "Dermatólogo con amplia experiencia en dermatología clínica y estética. Especialista en tratamiento de acné y enfermedades cutáneas.",
    experience: [
      { role: "Jefe de Dermatología", organization: "Instituto Dermatológico Nacional", period: "2016 - Presente" },
      { role: "Dermatólogo", organization: "Hospital Militar Central", period: "2009 - 2016" },
    ],
    education: [
      { title: "Especialización en Dermatología", institution: "Universidad Nacional de Colombia", period: "2006 - 2009" },
      { title: "Médico Cirujano", institution: "Universidad El Bosque", period: "2000 - 2006" },
    ],
    services: [
      "Consulta dermatológica general",
      "Tratamiento de acné",
      "Dermatología estética",
      "Mapeo de lunares",
      "Biopsias cutáneas",
      "Tratamiento de manchas",
    ],
  },
  {
    id: "doc-005",
    name: "Dr. Carlos Mendoza",
    specialty: "cardiologia",
    rating: 4.9,
    reviewCount: 156,
    yearsExperience: 15,
    recommendationRate: 98,
    consultationFee: 150000,
    avatarUrl: "/avatars/doctor-5.jpg",
    hospital: "Centro Médico San José",
    hospitalAddress: "Av. Reforma 123, Medellín",
    city: "Medellín",
    availableToday: false,
    bio: "Cardiólogo especializado en el diagnóstico y tratamiento de enfermedades cardiovasculares. Me enfoco en brindar atención personalizada y de calidad, con énfasis en la prevención y el cuidado integral del paciente.",
    experience: [
      { role: "Jefe de Cardiología", organization: "Centro Médico San José", period: "2018 - Presente" },
      { role: "Cardiólogo Asociado", organization: "Hospital General", period: "2011 - 2018" },
    ],
    education: [
      { title: "Especialidad en Cardiología", institution: "Universidad Nacional Autónoma", period: "2008 - 2011" },
      { title: "Médico Cirujano", institution: "Universidad Autónoma de Guadalajara", period: "2002 - 2008" },
    ],
    services: [
      "Consulta cardiológica general",
      "Electrocardiograma",
      "Ecocardiograma",
      "Pruebas de esfuerzo",
      "Monitoreo Holter",
      "Control de hipertensión",
      "Prevención cardiovascular",
    ],
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

    const slots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
    ].map((time) => ({
      id: `${doctorId}-${dateStr}-${time}`,
      time,
      available: Math.random() > 0.3, // 70% availability
    }));

    days.push({ date: dateStr, slots });
  }

  return { data: days, error: null, success: true };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { MOCK_DOCTORS };
