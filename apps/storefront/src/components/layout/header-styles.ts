/**
 * Shared styles for controls that sit on the charcoal header. Ghost buttons
 * default to a light hover and a black focus ring, both of which disappear on
 * the dark bar, so header controls swap them for a translucent white hover and
 * a brand-amber focus ring (8.9:1 against the bar).
 */
export const headerIconButtonClass =
  "press text-white hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white focus-visible:border-transparent focus-visible:[outline:2px_solid_var(--brand)] focus-visible:outline-offset-2";
