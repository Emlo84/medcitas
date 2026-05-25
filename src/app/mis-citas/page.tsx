import type { Metadata } from "next";
import { getMyAppointments } from "@/services/mockAppointments";
import { MyAppointmentsClient } from "@/components/appointment/MyAppointmentsClient";

export const metadata: Metadata = {
  title: "Mis citas",
  description: "Gestiona tus citas próximas y consulta tu historial médico.",
};

export default async function MyAppointmentsPage() {
  const { upcoming, past } = await getMyAppointments();

  // TODO: replace with real auth — for now we hard-code a demo user
  const user = {
    name: "Juan Pérez",
    email: "juan@email.com",
  };

  return (
    <MyAppointmentsClient
      user={user}
      upcoming={upcoming}
      past={past}
    />
  );
}
