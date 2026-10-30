/**
 * Minera Peças brand data used by the storefront.
 *
 * Sources (checked 2026-10-30):
 * - Instagram profile https://www.instagram.com/minera_pecas/ — display name
 *   "Minera Peças - Mineração e Construção", bio "Peças para máquinas pesadas -
 *   Linha Amarela" (CASE, New Holland, JCB, Volvo), nationwide shipping.
 * - Agricultural brands (John Deere, Massey Ferguson, Valtra, Case IH,
 *   New Holland, Kubota) come from the customer's project brief.
 *
 * The storefront deliberately shows no off-site contact channels: every call
 * to action keeps the customer buying on the site. Social profiles are only
 * exposed to search engines through STORE_INSTAGRAM (Organization JSON-LD).
 */

/**
 * Machine brands the store sells parts for. Shown as plain text only: the
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

export function partSearchHref(basePath: string, query: string): string {
  return `${basePath}/products?q=${encodeURIComponent(query)}`;
}
