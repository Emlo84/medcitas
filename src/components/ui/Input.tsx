import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && (
              <span className="text-danger-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className="absolute left-3 text-neutral-500 pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-neutral-900",
              "placeholder:text-neutral-500",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
              "disabled:bg-neutral-100 disabled:cursor-not-allowed",
              error
                ? "border-danger-500 focus:ring-danger-500"
                : "border-neutral-200 hover:border-neutral-300",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
              undefined
            }
            {...props}
          />

          {rightIcon && (
            <span
              className="absolute right-3 text-neutral-500"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-xs text-danger-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
