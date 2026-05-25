import type { Appointment, ApiResponse } from "@/types";

// ─── Mock store (in-memory for now) ──────────────────────────────────────

let MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    doctorId: "doc-001",
    patientId: "user-001",
    date: "2026-06-01",
    time: "10:00",
    status: "confirmed",
    reason: "Control general",
    confirmationCode: "MED-2026-001",
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
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "MED-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
