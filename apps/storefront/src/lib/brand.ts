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

/**
 * Part families for "shop by part" navigation while the catalog has no
 * categories. Each one opens the on-site search with a Portuguese query (the
 * catalog language). Labels live in messages under `header.partTypes.<key>`.
 * The header switches to the Spree root categories automatically once they
 * exist.
 */
export const PART_TYPES = [
  { key: "filters", query: "filtro" },
  { key: "bearings", query: "rolamento" },
  { key: "seals", query: "retentor" },
  { key: "hydraulics", query: "hidráulica" },
  { key: "engine", query: "motor" },
  { key: "transmission", query: "transmissão" },
  { key: "undercarriage", query: "rodante" },
  { key: "electrical", query: "elétrica" },
] as const;

export type PartTypeKey = (typeof PART_TYPES)[number]["key"];

export function partSearchHref(basePath: string, query: string): string {
  return `${basePath}/products?q=${encodeURIComponent(query)}`;
}
