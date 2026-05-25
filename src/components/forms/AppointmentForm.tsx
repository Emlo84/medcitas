"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ConsultationType } from "@/types";

export interface AppointmentFormPayload {
  patientName: string;
  document: string;
  phone: string;
  email: string;
  reason: string;
}

interface AppointmentFormProps {
  onSubmit: (payload: AppointmentFormPayload) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  extraTop?: React.ReactNode;
  errorMessage?: string | null;
  consultationType?: ConsultationType;
}

type FormErrors = Partial<Record<keyof AppointmentFormPayload, string>>;

export function AppointmentForm({
  onSubmit,
  isSubmitting = false,
  submitLabel = "Confirmar cita",
  extraTop,
  errorMessage,
}: AppointmentFormProps) {
  const [form, setForm] = useState<AppointmentFormPayload>({
    patientName: "",
    document: "",
    phone: "",
    email: "",
    reason: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function update(field: keyof AppointmentFormPayload) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.patientName.trim()) e.patientName = "El nombre completo es requerido.";
    if (!form.document.trim()) e.document = "El documento es requerido.";
    else if (!/^[0-9-]{5,}$/.test(form.document.trim()))
      e.document = "Documento inválido (solo números).";
    if (!form.phone.trim()) e.phone = "El teléfono es requerido.";
    else if (!/^[+]?[\d\s-]{7,}$/.test(form.phone.trim()))
      e.phone = "Teléfono inválido.";
    if (!form.email.trim()) e.email = "El correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Correo inválido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {extraTop}

      {errorMessage && (
        <div
          className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-500"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nombre completo"
          value={form.patientName}
          onChange={update("patientName")}
          required
          placeholder="Juan Pérez"
          error={errors.patientName}
        />
        <Input
          label="Documento de identidad"
          value={form.document}
          onChange={update("document")}
          required
          placeholder="123456789"
          error={errors.document}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Teléfono"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          required
          placeholder="+57 300 000 0000"
          error={errors.phone}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={update("email")}
          required
          placeholder="correo@ejemplo.com"
          error={errors.email}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reason" className="text-sm font-medium text-neutral-700">
          Motivo de consulta <span className="text-neutral-500 font-normal">(opcional)</span>
        </label>
        <textarea
          id="reason"
          value={form.reason}
          onChange={update("reason")}
          placeholder="Describe brevemente el motivo de tu consulta..."
          className="min-h-[120px] rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
        {submitLabel}
      </Button>

      <p className="text-center text-xs text-neutral-500">
        Al confirmar aceptas los{" "}
        <a href="/terms" className="text-primary-500 underline">términos y condiciones</a>.
      </p>
    </form>
  );
}
