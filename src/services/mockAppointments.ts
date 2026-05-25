import type { Appointment, ApiResponse, ConsultationType, Doctor } from "@/types";
import { getDoctorById } from "@/services/mockDoctors";

// ─── Mock store (in-memory for now) ──────────────────────────────────────

const FUTURE_DATE_1 = futureDate(5);
const FUTURE_DATE_2 = futureDate(11);
const FUTURE_DATE_3 = futureDate(20);
const PAST_DATE_1 = pastDate(7);
const PAST_DATE_2 = pastDate(28);
const PAST_DATE_3 = pastDate(60);

let MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    doctorId: "doc-005",
    patientId: "user-001",
    date: FUTURE_DATE_1,
    time: "09:00",
    status: "confirmed",
    consultationType: "presencial",
    reason: "Control general",
    confirmationCode: "MC-2026-0520-001",
  },
  {
    id: "apt-002",
    doctorId: "doc-004",
    patientId: "user-001",
    date: FUTURE_DATE_2,
    time: "14:30",
    status: "confirmed",
    consultationType: "virtual",
    reason: "Revisión de manchas",
    confirmationCode: "MC-2026-0525-002",
  },
  {
    id: "apt-003",
    doctorId: "doc-001",
    patientId: "user-001",
    date: FUTURE_DATE_3,
    time: "10:00",
    status: "pending",
    consultationType: "presencial",
    reason: "Chequeo preventivo",
    confirmationCode: "MC-2026-0602-003",
  },
  {
    id: "apt-101",
    doctorId: "doc-002",
    patientId: "user-001",
    date: PAST_DATE_1,
    time: "11:00",
    status: "completed",
    consultationType: "presencial",
    confirmationCode: "MC-2026-0517-099",
  },
  {
    id: "apt-102",
    doctorId: "doc-003",
    patientId: "user-001",
    date: PAST_DATE_2,
    time: "16:30",
    status: "completed",
    consultationType: "virtual",
    confirmationCode: "MC-2026-0426-088",
  },
  {
    id: "apt-103",
    doctorId: "doc-005",
    patientId: "user-001",
    date: PAST_DATE_3,
    time: "09:30",
    status: "cancelled",
    consultationType: "presencial",
    confirmationCode: "MC-2026-0325-077",
  },
];

// ─── Service Functions ─────────────────────────────────────────────────────

/**
 * Simulates POST /api/appointments
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function createAppointment(payload: {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  reason?: string;
  consultationType?: ConsultationType;
}): Promise<ApiResponse<Appointment>> {
  await delay(600);

  const appointment: Appointment = {
    id: `apt-${Date.now()}`,
    ...payload,
    status: "confirmed",
    confirmationCode: generateConfirmationCode(),
  };

  MOCK_APPOINTMENTS.push(appointment);

  return { data: appointment, error: null, success: true };
}

/**
 * Simulates GET /api/appointments?patientId=...
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function getPatientAppointments(
  patientId: string
): Promise<ApiResponse<Appointment[]>> {
  await delay(300);

  const appointments = MOCK_APPOINTMENTS.filter(
    (a) => a.patientId === patientId
  );

  return { data: appointments, error: null, success: true };
}

/**
 * Simulates DELETE /api/appointments/:id
 * TODO: Replace with real HTTP call when backend is ready.
 */
export async function cancelAppointment(
  appointmentId: string
): Promise<ApiResponse<Appointment>> {
  await delay(400);

  const idx = MOCK_APPOINTMENTS.findIndex((a) => a.id === appointmentId);
  if (idx === -1) {
    return { data: {} as Appointment, error: "Cita no encontrada", success: false };
  }

  MOCK_APPOINTMENTS[idx] = { ...MOCK_APPOINTMENTS[idx], status: "cancelled" };
  return { data: MOCK_APPOINTMENTS[idx], error: null, success: true };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateConfirmationCode(): string {
  const year = new Date().getFullYear();
  const datePart = new Date()
    .toISOString()
    .slice(5, 10)
    .replace("-", "");
  const seq = String(Math.floor(100 + Math.random() * 900));
  return `MC-${year}-${datePart}-${seq}`;
}

function futureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

function pastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

// ─── Enriched query ───────────────────────────────────────────────────────

export interface AppointmentWithDoctor extends Appointment {
  doctor: Doctor | null;
}

/**
 * Returns the patient appointments split into upcoming/past, each item enriched
 * with its doctor data. Used by the "Mis citas" screen.
 */
export async function getMyAppointments(
  patientId: string = "user-001"
): Promise<{
  upcoming: AppointmentWithDoctor[];
  past: AppointmentWithDoctor[];
}> {
  await delay(300);
  const today = new Date().toISOString().slice(0, 10);

  const mine = MOCK_APPOINTMENTS.filter((a) => a.patientId === patientId);

  const enrich = async (apt: Appointment): Promise<AppointmentWithDoctor> => ({
    ...apt,
    doctor: await getDoctorById(apt.doctorId),
  });

  const enriched = await Promise.all(mine.map(enrich));

  const upcoming = enriched
    .filter((a) => a.date >= today && a.status !== "cancelled" && a.status !== "completed")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const past = enriched
    .filter((a) => a.date < today || a.status === "cancelled" || a.status === "completed")
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  return { upcoming, past };
}
