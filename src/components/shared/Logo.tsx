import { cn } from "@/lib/utils";

/**
 * Salooni Transport Hub mark — a hill road that bends into an "S",
 * climbing through snow peaks at sunrise. Same artwork as src/app/icon.svg
 * (the favicon); keep the two in sync.
 *
 * `idPrefix` keeps the SVG gradient/clip ids unique when the mark renders
 * more than once on a page (navbar + footer).
 */
export function LogoMark({
  className,
  idPrefix = "logo",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const sky = `${idPrefix}-sky`;
  const clip = `${idPrefix}-clip`;
  const road =
    "M34 14.8 C 30.5 10.8, 15.2 10.8, 15.6 18.2 C 16 25, 32.6 22.8, 32.6 30.6 C 32.6 38.6, 17 38.6, 14.2 33.8";

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f9679" />
          <stop offset="1" stopColor="#1f5f4e" />
        </linearGradient>
        <clipPath id={clip}>
          <rect width="48" height="48" rx="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="48" height="48" fill={`url(#${sky})`} />
        <circle cx="9.5" cy="8.8" r="3" fill="#FFD27A" />
        <path
          d="M-2 27 L10 15 L17 21 L27 9.5 L37 20 L42 16 L50 23 L50 50 L-2 50 Z"
          fill="#174a3d"
        />
        <path
          d="M27 9.5 L31.6 14.4 L29.6 13.8 L27.6 15.6 L25.8 13.9 L23.4 15 Z"
          fill="#fff"
        />
        <path
          d="M10 15 L13.6 18.6 L12 18.2 L10.4 19.6 L8.8 18.3 L7.2 18.9 Z"
          fill="#fff"
        />
        <path d="M42 16 L45.2 19.2 L43.8 18.8 L42.3 20 L40.6 18.6 Z" fill="#fff" />
        <path
          d="M-2 34 L8 27 L18 32 L30 25 L50 35 L50 50 L-2 50 Z"
          fill="#0f3129"
        />
        <path
          d={road}
          fill="none"
          stroke="#F6AC2F"
          strokeWidth="6.4"
          strokeLinecap="round"
        />
        <path
          d={road}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 2.2"
          strokeOpacity="0.9"
        />
      </g>
    </svg>
  );
}

/** Mark + two-line wordmark: "Salooni" over a tracked "TRANSPORT HUB". */
export function Logo({
  tone = "light",
  className,
  idPrefix,
}: {
  /** "light" for white backgrounds, "dark" for the footer. */
  tone?: "light" | "dark";
  className?: string;
  idPrefix?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark idPrefix={idPrefix} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[19px] font-extrabold tracking-tight",
            tone === "dark" ? "text-white" : "text-forest-900",
          )}
        >
          Salooni
        </span>
        <span
          className={cn(
            "mt-1 text-[9.5px] font-bold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-[#F6AC2F]" : "text-[#c97d0a]",
          )}
        >
          Transport Hub
        </span>
      </span>
    </span>
  );
}
