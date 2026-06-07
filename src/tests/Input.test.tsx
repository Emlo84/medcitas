import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders a label and hint text when provided", () => {
    render(<Input label="Nombre" hint="Escribe tu nombre" />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/escribe tu nombre/i)).toBeInTheDocument();
  });

  it("renders an error message and marks the field as invalid", () => {
    render(<Input label="Email" error="Correo inválido" />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(/correo inválido/i);
  });
});
