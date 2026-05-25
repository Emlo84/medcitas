import { cn } from "@/utils/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-base",
  lg: "w-20 h-20 text-xl",
  xl: "w-24 h-24 text-2xl",
  "2xl": "w-32 h-32 text-4xl",
};

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.?|Dra\.?)\s+/i, "")
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-2xl flex items-center justify-center flex-shrink-0",
        "bg-gradient-to-br from-primary-500 to-secondary-500",
        "text-white font-medium select-none",
        sizeStyles[size],
        className
      )}
      aria-label={`Avatar de ${name}`}
    >
      {getInitials(name)}
    </div>
  );
}

interface AvatarCircleProps extends AvatarProps {}

export function AvatarCircle({ name, size = "md", className }: AvatarCircleProps) {
  return (
    <Avatar
      name={name}
      size={size}
      className={cn("!rounded-full", className)}
    />
  );
}
