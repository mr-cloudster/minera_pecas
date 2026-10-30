import { cn } from "@/lib/utils";

/*
 * PLACEHOLDER LOGO — replace with the official vector artwork.
 *
 * The "M" monogram below was hand-traced from the 150×150 px profile picture of
 * the official Instagram account (@minera_pecas), and the wordmark is rendered
 * as live text in Montserrat, the closest free match to the logo lettering.
 * Colors (#facf34 yellow, #222223 charcoal) were sampled from that JPEG.
 * It is a faithful approximation, not the customer's master file: once the
 * original SVG/AI/PDF is available, swap the paths in <LogoMark> and the files
 * public/logo.svg, public/logo-mark.svg and src/app/icon.svg.
 */

interface LogoMarkProps {
  className?: string;
}

/** The yellow-and-charcoal "M" monogram. Decorative; label the parent link. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 77 97"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path fill="#facf34" d="M0 22.5 51.25 61 40 78.75 16.25 61V97H0Z" />
      <path fill="currentColor" d="M30 40 75 0H77V97H62V37.5L45 52.5Z" />
    </svg>
  );
}

interface LogoProps {
  /** `light` for white/pale backgrounds, `dark` for the charcoal brand band. */
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
        <span
          className={cn("text-[1.35rem] font-extrabold tracking-[0.06em]", ink)}
        >
          Minera
        </span>
        <span className="mt-0.5 text-[0.8rem] font-semibold tracking-[0.42em] text-brand">
          Peças
        </span>
        {showTagline && tagline && (
          <span
            className={cn(
              "mt-1 text-[0.55rem] font-medium tracking-[0.2em]",
              tone === "dark" ? "text-neutral-300" : "text-neutral-600",
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
