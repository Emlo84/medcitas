import { cn } from "@/utils/cn";

interface StarRatingProps {
  rating: number;        // 0-5, supports decimals
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={`${rating} de 5 estrellas${reviewCount != null ? `, ${reviewCount} reseñas` : ""}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;

          return (
            <svg
              key={i}
              className={cn(starSize, filled || partial ? "text-amber-400" : "text-neutral-200")}
              fill={filled ? "currentColor" : partial ? "url(#half)" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {partial && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          );
        })}
      </div>

      <span className={cn("font-semibold text-neutral-900", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>

      {reviewCount != null && (
        <span className={cn("text-neutral-500", size === "sm" ? "text-xs" : "text-sm")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
