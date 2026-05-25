import { cn } from "@/utils/cn";
import { formatCOP } from "@/utils/cn";

interface PaymentSummaryProps {
  consultationFee: number;
  serviceFee?: number;
  discount?: number;
  className?: string;
}

export function PaymentSummary({
  consultationFee,
  serviceFee = 0,
  discount = 0,
  className,
}: PaymentSummaryProps) {
  const total = consultationFee + serviceFee - discount;

  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6 space-y-4",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-neutral-900">
        Resumen del pago
      </h3>

      <div className="space-y-3">
        {/* Consultation */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <span className="text-sm text-neutral-600">Consulta</span>
          <span className="text-sm font-medium text-neutral-900">
            {formatCOP(consultationFee)}
          </span>
        </div>

        {/* Service fee */}
        {serviceFee > 0 && (
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-sm text-neutral-600">Cargo por servicio</span>
            <span className="text-sm font-medium text-neutral-900">
              {formatCOP(serviceFee)}
            </span>
          </div>
        )}

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-sm text-neutral-600">Descuento</span>
            <span className="text-sm font-medium text-danger-500">
              -{formatCOP(discount)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-neutral-900">Total</span>
          <span className="text-lg font-bold text-primary-500">
            {formatCOP(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
