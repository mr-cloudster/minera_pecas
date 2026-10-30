"use client";

import type { Product } from "@spree/sdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useId, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ProductImage } from "@/components/ui/product-image";
import { useStore } from "@/contexts/StoreContext";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { trackQuickSearch, trackSelectItem } from "@/lib/analytics/gtm";
import { getProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  basePath: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
  /** Overrides the default "Search" placeholder (also used as the label). */
  placeholder?: string;
  /**
   * `light` (default) for white surfaces, `dark` for the charcoal header,
   * `hero` for the large homepage search on a dark ground.
   */
  tone?: "light" | "dark" | "hero";
}

export function SearchBar({
  basePath,
  autoFocus,
  onNavigate,
  placeholder,
  tone = "light",
}: SearchBarProps) {
  const idBase = useId();
  const listboxId = `${idBase}-suggestions`;
  const optionId = (index: number) => `${idBase}-option-${index}`;
  const router = useRouter();
  const { currency } = useStore();
  const t = useTranslations("products");
  const formatMoney = useFormatMoney();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestIdRef = useRef(0);

  // Fetch suggestions
  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      const currentRequestId = requestIdRef.current;
      setLoading(true);
      try {
        const response = await getProducts({
          search: searchQuery,
          fields: ["name", "slug", "price", "thumbnail_url"],
          limit: 6,
        });
        // Discard stale responses if a newer query has been issued
        if (requestIdRef.current !== currentRequestId) return;
        setSuggestions(response.data);
        if (response.data.length > 0) {
          trackQuickSearch(response.data, searchQuery, currency);
        }
      } catch (error) {
        if (requestIdRef.current !== currentRequestId) return;
        console.error("Search failed:", error);
        setSuggestions([]);
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setLoading(false);
        }
      }
    },
    [currency],
  );

  // Debounced search — called from onChange handler, no useEffect needed
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
    requestIdRef.current += 1;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${basePath}/products?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
      onNavigate?.();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: Product, index: number) => {
    trackSelectItem(product, "quick-search", "Quick Search", index, currency);
    router.push(`${basePath}/products/${product.slug}`);
    setIsOpen(false);
    setQuery("");
    onNavigate?.();
  };

  // Close suggestions on blur — delayed to allow click on suggestions
  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Cancel blur timeout when interacting with suggestions
  const handleSuggestionsMouseDown = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex], selectedIndex);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const showSuggestions =
    isOpen && (suggestions.length > 0 || loading || query.length >= 2);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <InputGroup
          className={cn(
            tone !== "light" &&
              "border-transparent bg-white text-neutral-900 shadow-sm has-[[data-slot=input-group-control]:focus]:border-transparent has-[[data-slot=input-group-control]:focus]:[outline:2px_solid_var(--brand)] has-[[data-slot=input-group-control]:focus]:outline-offset-2 dark:bg-white",
            tone === "hero" && "h-14 rounded-md [&_input]:text-base",
          )}
        >
          <InputGroupInput
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? t("search")}
            autoFocus={autoFocus}
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls={listboxId}
            aria-activedescendant={
              selectedIndex >= 0 ? optionId(selectedIndex) : undefined
            }
            aria-autocomplete="list"
            aria-label={placeholder ?? t("search")}
          />
          <InputGroupAddon>
            <Search className={tone === "hero" ? "size-5" : undefined} />
          </InputGroupAddon>
        </InputGroup>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-2xl"
          onMouseDown={handleSuggestionsMouseDown}
        >
          <div>
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {t("searching")}
              </div>
            ) : suggestions.length > 0 ? (
              <ul id={listboxId} role="listbox">
                {suggestions.map((product, index) => (
                  <li
                    key={product.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === selectedIndex}
                    tabIndex={-1}
                  >
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(product, index)}
                      tabIndex={-1}
                      className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                        index === selectedIndex ? "bg-gray-50" : ""
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-10 h-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                        <ProductImage
                          src={product.thumbnail_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          iconClassName="w-5 h-5"
                        />
                      </div>
                      {/* Name and price */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        {product.price?.amount && (
                          <p className="text-sm text-gray-500">
                            {formatMoney(
                              product.price.amount,
                              product.price.currency,
                              { unitPrice: true },
                            )}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
                {/* View all results link */}
                {query.trim() && (
                  <li className="border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `${basePath}/products?q=${encodeURIComponent(query.trim())}`,
                        );
                        setIsOpen(false);
                        onNavigate?.();
                      }}
                      className="w-full p-3 text-sm text-primary hover:bg-gray-50 text-center font-medium"
                    >
                      {t("viewAllResultsFor", { query: query.trim() })}
                    </button>
                  </li>
                )}
              </ul>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {t("noProductsFound")}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
