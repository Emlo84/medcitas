import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MedCitas — Agenda tu cita médica en línea",
    template: "%s | MedCitas",
  },
  description:
    "Encuentra médicos cerca de ti y agenda citas médicas online de forma rápida, segura y sin filas.",
  keywords: ["citas médicas", "médicos online", "Colombia", "salud"],
  openGraph: {
    title: "MedCitas — Agenda tu cita médica en línea",
    description: "Encuentra médicos cerca de ti y agenda citas médicas online.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Suspense fallback={<div className="flex-1" />}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
