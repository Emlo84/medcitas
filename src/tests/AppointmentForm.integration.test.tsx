import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

describe("AppointmentForm - integración", () => {
  it("envía el formulario cuando los campos son válidos", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AppointmentForm onSubmit={onSubmit} />);

    await act(async () => {
      await user.type(screen.getByLabelText(/nombre completo/i), "Laura Pérez");
      await user.type(screen.getByLabelText(/documento/i), "123456789");
      await user.type(screen.getByLabelText(/teléfono/i), "+57 300 000 0000");
      await user.type(screen.getByLabelText(/email/i), "laura@example.com");
      await user.type(screen.getByRole("textbox", { name: /motivo de consulta/i }), "Consulta general.");
      await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      patientName: "Laura Pérez",
      document: "123456789",
      phone: "+57 300 000 0000",
      email: "laura@example.com",
      reason: "Consulta general.",
    });
  });
});
