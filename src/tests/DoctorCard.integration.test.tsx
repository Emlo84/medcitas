import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DoctorCard } from "@/components/medical/DoctorCard";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: any; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("DoctorCard - integración", () => {
  it("muestra la información del doctor y el botón de ver perfil", () => {
    render(
      <DoctorCard
        doctor={{
          id: "doc-1",
          name: "Dra. Ana Gómez",
          specialty: "cardiology",
          availableToday: true,
          rating: 4.8,
          reviewCount: 120,
          yearsExperience: 10,
          hospital: "Hospital Central",
          city: "Bogotá",
          consultationFee: 180000,
        }}
      />
    );

    expect(screen.getByRole("heading", { name: /dra\. ana gómez/i })).toBeInTheDocument();
    expect(screen.getByText(/cardiology/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver perfil/i })).toBeInTheDocument();
    expect(screen.getByText(/hoy/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/4.8 de 5 estrellas/i)).toBeInTheDocument();
  });
});
