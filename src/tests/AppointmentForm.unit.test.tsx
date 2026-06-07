import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

describe("AppointmentForm - unidad", () => {
  it("muestra errores de validación cuando se envía el formulario vacío", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AppointmentForm onSubmit={onSubmit} />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /confirmar cita/i }));
    });

    expect(screen.getByText(/el nombre completo es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/el documento es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/el teléfono es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/el correo es requerido/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
