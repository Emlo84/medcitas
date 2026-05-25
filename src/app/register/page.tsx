"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { RegisterPayload } from "@/types";

type FormErrors = Partial<Record<keyof RegisterPayload | "confirmPassword", string>>;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterPayload & { confirmPassword: string }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "El nombre es requerido.";
    if (!form.lastName.trim()) e.lastName = "El apellido es requerido.";
    if (!form.email) e.email = "El correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido.";
    if (!form.phone) e.phone = "El teléfono es requerido.";
    if (!form.password || form.password.length < 8)
      e.password = "Mínimo 8 caracteres.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Las contraseñas no coinciden.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    // TODO: Call real registration service
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    router.push("/search");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-black/10 p-8 shadow-card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Crea tu cuenta</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Gratis. Sin tarjeta de crédito.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                placeholder="Ana"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={update("firstName")}
                error={errors.firstName}
              />
              <Input
                label="Apellido"
                type="text"
                placeholder="García"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={update("lastName")}
                error={errors.lastName}
              />
            </div>

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />

            <Input
              label="Teléfono"
              type="tel"
              placeholder="+57 300 000 0000"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={update("phone")}
              error={errors.phone}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              hint="Usa al menos 8 caracteres con letras y números."
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              error={errors.confirmPassword}
            />

            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
              Crear cuenta
            </Button>

            <p className="text-xs text-center text-neutral-500">
              Al registrarte aceptas nuestros{" "}
              <Link href="/terms" className="underline">Términos de uso</Link>{" "}
              y{" "}
              <Link href="/privacy" className="underline">Política de privacidad</Link>.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary-500 font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
