import { cn } from "@/lib/utils";

/*
 * Minera Peças logo, rebuilt as vector.
 *
 * No high-resolution logo file is publicly available (the Instagram profile
 * picture is 150×150 px and the posts are served at 640×640 px), so the "M"
 * monogram was redrawn as clean geometry, matched against the largest logo
 * rendering found (post DadaerUvZsM, 640 px) and the profile picture. The
 * wordmark is live text in Montserrat, the closest free match to the logo
 * lettering. Replace the paths below with the customer's master artwork when
 * it is supplied; public/logo*.svg and src/app/icon.svg share these paths.
 */

/** Monogram geometry, viewBox 0 0 495 490. */
export const MONOGRAM_LEFT = "M0 70H16L328 318 248 426 105 312V490H0Z";
export const MONOGRAM_RIGHT = "M225 215 476 0H495V490H385V198L290 280Z";

interface LogoMarkProps {
  className?: string;
}

/**
 * The yellow "M" monogram. The right stroke uses currentColor so it reads as
 * charcoal on light surfaces and white on dark ones. Decorative: label the
 * parent link instead.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 495 490"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path className="fill-brand" d={MONOGRAM_LEFT} />
      <path fill="currentColor" d={MONOGRAM_RIGHT} />
    </svg>
  );
}

interface LogoProps {
  /** `light` for white/pale backgrounds, `dark` for charcoal surfaces. */
  tone?: "light" | "dark";
  /** Show the "Mineração e Construção" descriptor line. */
  showTagline?: boolean;
  /** Translated descriptor line (only rendered when showTagline is set). */
  tagline?: string;
  className?: string;
}

/**
 * Horizontal lockup: monogram + "MINERA / PEÇAS" wordmark. The text is
 * aria-hidden because the surrounding link carries the store name as its
 * accessible label.
 */
export function Logo({
  tone = "light",
  showTagline = false,
  tagline,
  className,
}: LogoProps) {
  const ink = tone === "dark" ? "text-white" : "text-brand-ink";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-auto shrink-0", ink)} />
      <span
        aria-hidden="true"
        className="flex flex-col font-display uppercase leading-none"
      >
        <span className={cn("text-[1.4rem] font-bold tracking-[0.08em]", ink)}>
          Minera
        </span>
        <span className="mt-0.5 text-[0.78rem] font-semibold tracking-[0.5em] text-brand">
          Peças
        </span>
        {showTagline && tagline && (
          <span
            className={cn(
              "mt-1.5 text-[0.55rem] font-medium tracking-[0.22em]",
              tone === "dark" ? "text-neutral-400" : "text-neutral-600",
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
