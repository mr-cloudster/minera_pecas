/**
 * Minera Peças brand facts used by the storefront chrome.
 *
 * Sources (checked 2026-10-30):
 * - Instagram profile https://www.instagram.com/minera_pecas/ — display name
 *   "Minera Peças - Mineração e Construção", bio "Peças para máquinas pesadas -
 *   Linha Amarela", brands CASE, New Holland, JCB and Volvo, nationwide shipping,
 *   and the WhatsApp link below (profile website field).
 * - Agricultural brands (John Deere, Massey Ferguson, Valtra, Case IH,
 *   New Holland, Kubota) come from the customer's project brief.
 *
 * The contact links can be overridden per environment so production can change
 * them without a code change.
 */

/** WhatsApp click-to-chat link from the Instagram profile. */
export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_STORE_WHATSAPP_URL ||
  "https://wa.me/message/TF2LV7ZW3YJWJ1";

/** Official Instagram profile. */
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_STORE_INSTAGRAM_URL ||
  "https://www.instagram.com/minera_pecas/";

export const INSTAGRAM_HANDLE = "@minera_pecas";

/**
 * Machine brands the store sells parts for. Shown as plain text only — the
 * names are trademarks of their owners, so no manufacturer logos are used.
 */
export const MACHINE_BRANDS = [
  "John Deere",
  "Massey Ferguson",
  "Valtra",
  "Case IH",
  "New Holland",
  "Kubota",
  "CASE",
  "JCB",
  "Volvo",
] as const;
