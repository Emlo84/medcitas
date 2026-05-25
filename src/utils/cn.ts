import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Use instead of raw `clsx` or template literals for all className composition.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a COP currency amount.
 */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format an ISO date string to a readable Spanish date.
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Convert "09:30" 24h time to "9:30 AM" format.
 */
export function formatTime(time24: string): string {
  const [hoursStr, minutes] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
}
