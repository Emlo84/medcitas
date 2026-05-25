import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById, getDoctorAvailability } from "@/services/mockDoctors";
import { AppointmentBookingClient } from "@/components/appointment/AppointmentBookingClient";
import type { Metadata } from "next";
import type { Doctor, AppointmentDay } from "@/types";

interface AppointmentPageProps {
  params: { doctorId: string };
}

async function fetchDoctorData(doctorId: string): Promise<{ doctor: Doctor; availability: AppointmentDay[] }> {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const availabilityResponse = await getDoctorAvailability(doctorId);
  return { doctor, availability: availabilityResponse.data };
}

export async function generateMetadata({ params }: AppointmentPageProps): Promise<Metadata> {
  const doctor = await getDoctorById(params.doctorId);

  if (!doctor) {
    return { title: "Agendar cita" };
  }

  return {
    title: `Agendar cita con ${doctor.name} | MedCitas`,
  };
}

export default async function AppointmentBookingPage({ params }: AppointmentPageProps) {
  let doctor: Doctor;
  let availability: AppointmentDay[];

  try {
    ({ doctor, availability } = await fetchDoctorData(params.doctorId));
  } catch {
    notFound();
  }

  return (
    <div className="bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Agendar cita</p>
            <h1 className="mt-2 text-3xl font-semibold text-neutral-900">{doctor.name}</h1>
          </div>
          <Link href={`/doctor/${doctor.id}`} className="text-sm font-medium text-primary-500 hover:underline">
            Volver al perfil
          </Link>
        </div>

        <AppointmentBookingClient doctor={doctor} availability={availability} />
      </div>
    </div>
  );
}
