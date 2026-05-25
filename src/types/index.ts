// ─── Medical Domain Types ──────────────────────────────────────────────────

export type Specialty =
  | "medicina-general"
  | "odontologia"
  | "psicologia"
  | "dermatologia"
  | "cardiologia"
  | "pediatria"
  | "ginecologia"
  | "neurologia";

export interface SpecialtyInfo {
  id: Specialty;
  label: string;
  iconSrc: string;
  accentColor: string;      // hex or rgba — used for icon container bg
  iconColor: string;        // hex — used for SVG strokes
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;           // 0-5
  reviewCount: number;
  yearsExperience: number;
  consultationFee: number;  // COP
  avatarUrl: string;
  hospital: string;
  city: string;
  availableToday: boolean;
  bio: string;
}

export interface TimeSlot {
  id: string;
  time: string;             // "HH:MM" 24h format
  available: boolean;
}

export interface AppointmentDay {
  date: string;             // ISO 8601 — "YYYY-MM-DD"
  slots: TimeSlot[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;             // ISO 8601
  time: string;             // "HH:MM"
  status: "pending" | "confirmed" | "cancelled" | "completed";
  reason?: string;
  confirmationCode: string;
}

// ─── User / Auth Types ────────────────────────────────────────────────────

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  dateOfBirth?: string;     // ISO 8601
  gender?: "male" | "female" | "other" | "prefer-not-to-say";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone: string;
}

// ─── API / Service Layer Types ────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

export interface SearchDoctorsParams {
  specialty?: Specialty;
  city?: string;
  query?: string;
  availableToday?: boolean;
  page?: number;
  pageSize?: number;
}
