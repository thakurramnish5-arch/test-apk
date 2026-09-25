import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "accent"
  | "whatsapp"
  | "outline"
  | "ghost"
  | "light";

type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-transparent font-semibold transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 " +
  "active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-white shadow-sm hover:bg-forest-800 hover:shadow-md focus-visible:outline-forest-700",
  secondary:
    "bg-himalaya-700 text-white shadow-sm hover:bg-himalaya-800 hover:shadow-md focus-visible:outline-himalaya-700",
  accent:
    "bg-accent-700 text-white shadow-sm hover:bg-accent-800 hover:shadow-md focus-visible:outline-accent-700",
  whatsapp:
    "bg-whatsapp text-white shadow-sm hover:bg-whatsapp-dark hover:shadow-md focus-visible:outline-whatsapp-dark",
  outline:
    "border border-charcoal-300 bg-white text-charcoal-800 hover:border-forest-400 hover:bg-forest-50 hover:text-forest-800 focus-visible:outline-forest-600",
  ghost:
    "text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900 focus-visible:outline-forest-600",
  /** For use over dark imagery */
  light:
    "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** Button styling for elements that cannot use <Button>, e.g. a download link. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
}: { variant?: Variant; size?: Size; fullWidth?: boolean } = {}): string {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  /** Set for tel:, wa.me and other external destinations. */
  external?: boolean;
  ariaLabel?: string;
};

/** Anchor styled as a button. Uses next/link for internal routes. */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  external,
  ariaLabel,
}: LinkButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("tel:"));

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
