"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { LoginCredentials } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  function validate(): boolean {
    const newErrors: Partial<LoginCredentials> = {};
    if (!credentials.email) newErrors.email = "El correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(credentials.email))
      newErrors.email = "Ingresa un correo válido.";
    if (!credentials.password) newErrors.password = "La contraseña es requerida.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      // TODO: Replace with real auth service call
      await new Promise((r) => setTimeout(r, 800));

      // Mock: any valid email/password works
      if (credentials.password.length >= 6) {
        router.push("/search");
      } else {
        setAuthError("Correo o contraseña incorrectos.");
      }
    } catch {
      setAuthError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-black/10 p-8 shadow-card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Bienvenido de nuevo</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Ingresa a tu cuenta para gestionar tus citas
            </p>
          </div>

          {authError && (
            <div
              className="mb-4 p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-500"
              role="alert"
            >
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
              error={errors.email}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
              error={errors.password}
            />

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary-500 hover:underline focus-visible:outline-none focus-visible:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-primary-500 font-medium hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
