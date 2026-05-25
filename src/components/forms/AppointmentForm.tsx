"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AppointmentFormProps {
  onSubmit: (payload: {
    patientName: string;
    document: string;
    phone: string;
    email: string;
    reason: string;
  }) => void;
  isSubmitting?: boolean;
}

export function AppointmentForm({ onSubmit, isSubmitting = false }: AppointmentFormProps) {
  const [form, setForm] = useState({
    patientName: "",
    document: "",
    phone: "",
    email: "",
    reason: "",
  });

  function update(field: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Nombre completo"
        value={form.patientName}
        onChange={update("patientName")}
        required
        placeholder="Juan Pérez" 
      />

      <Input
        label="Documento de identidad"
        value={form.document}
        onChange={update("document")}
        required
        placeholder="123456789"
      />

      <Input
        label="Teléfono"
        type="tel"
        value={form.phone}
        onChange={update("phone")}
        required
        placeholder="+57 300 000 0000"
      />

      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={update("email")}
        required
        placeholder="correo@ejemplo.com"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="reason" className="text-sm font-medium text-neutral-700">
          Motivo de consulta
        </label>
        <textarea
          id="reason"
          value={form.reason}
          onChange={update("reason")}
          placeholder="Describe brevemente tu consulta..."
          className="min-h-[120px] rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
        Confirmar cita
      </Button>
    </form>
  );
}
