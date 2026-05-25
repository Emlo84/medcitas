"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/search", label: "Buscar médicos" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#como-funciona", label: "¿Cómo funciona?" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200"
      role="banner"
    >
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          aria-label="MedCitas - Inicio"
        >
          <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v7m0 0v7m0-7H3m7 0h7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          MedCitas
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Regístrate gratis
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden border-t border-neutral-200 bg-white transition-all duration-200",
          menuOpen ? "block" : "hidden"
        )}
      >
        <ul className="px-4 py-4 flex flex-col gap-3" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" fullWidth>
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              <Button variant="primary" size="sm" fullWidth>
                Regístrate gratis
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
