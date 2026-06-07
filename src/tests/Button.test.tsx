import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders the given children and applies variant classes", () => {
    render(<Button variant="outline">Click aquí</Button>);

    expect(screen.getByRole("button", { name: /click aquí/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("border-primary-500");
  });

  it("shows a loading state and disables the button when isLoading is true", () => {
    render(<Button isLoading>Enviar</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(screen.getByText(/cargando…/i)).toBeInTheDocument();
  });
});
