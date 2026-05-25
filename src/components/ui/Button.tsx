import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

// ─── Variant styles ────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-sm",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500 shadow-sm",
  outline:
    "border border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500",
  ghost:
    "text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-4 py-2 text-base rounded-lg gap-2",
  lg: "px-6 py-3 text-lg rounded-xl gap-2.5",
};

// ─── Component ────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variant + size
          variantStyles[variant],
          sizeStyles[size],
          // Modifiers
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span>Cargando…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
