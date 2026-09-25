import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Inverts colours for use on dark sections. */
  tone?: "dark" | "light";
  className?: string;
  /** Renders the title as h1 on hero-style page headers. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            isLight && "border-white/25 bg-white/10 text-white",
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          Tag === "h1"
            ? "text-3xl font-bold sm:text-4xl lg:text-5xl"
            : "text-2xl font-bold sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]",
          isLight ? "text-white" : "text-charcoal-900",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed sm:text-base",
            isLight ? "text-white/75" : "text-charcoal-600",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
