"use client";

import { Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { headerIconButtonClass } from "@/components/layout/header-styles";
import { Button } from "@/components/ui/button";

const SearchBar = dynamic(
  () =>
    import("@/components/search/SearchBar").then((mod) => ({
      default: mod.SearchBar,
    })),
  {
    loading: () => <div className="h-11 w-full rounded-md bg-white/10" />,
  },
);

interface SearchToggleProps {
  basePath: string;
  /** Left slot (e.g. mobile menu) */
  left: ReactNode;
  /** Logo slot */
  center: ReactNode;
  /** Rendered before the search button in the right section */
  rightStart: ReactNode;
  /** Rendered after the search button in the right section */
  rightEnd: ReactNode;
  /** Rendered under the main bar, inside the sticky header (category nav). */
  below?: ReactNode;
}

/**
 * Charcoal main bar. From md up the search field is always visible in the bar
 * (search is the main way to find a part by code); on phones it opens as an
 * overlay from the search icon.
 */
export function SearchToggle({
  basePath,
  left,
  center,
  rightStart,
  rightEnd,
  below,
}: SearchToggleProps) {
  const t = useTranslations("header");
  const tp = useTranslations("products");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    searchTriggerRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)]">
      <div className="relative h-16 bg-brand-ink text-white">
        {/* Normal header content */}
        <div
          className={`absolute inset-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] ${
            searchOpen
              ? "translate-y-2 opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-full w-full items-center gap-2 md:gap-4">
              <div className="flex items-center">{left}</div>

              <div className="flex min-w-0 flex-1 items-center md:flex-none">
                {center}
              </div>

              {/* Always-on search from md up */}
              <div className="hidden min-w-0 flex-1 md:block md:max-w-xl lg:max-w-2xl lg:mx-auto">
                <SearchBar
                  basePath={basePath}
                  tone="dark"
                  placeholder={tp("searchPlaceholder")}
                />
              </div>

              <div className="flex items-center justify-end gap-1">
                {rightStart}

                {/* Search toggle (phones) */}
                <Button
                  ref={searchTriggerRef}
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => setSearchOpen(true)}
                  aria-label={t("openSearch")}
                  aria-expanded={searchOpen}
                  aria-controls="search-overlay"
                  className={`md:hidden ${headerIconButtonClass}`}
                >
                  <Search className="size-5" />
                </Button>

                {rightEnd}
              </div>
            </div>
          </div>
        </div>

        {/* Click-outside overlay */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={closeSearch}
            role="presentation"
          />
        )}

        {/* Search bar overlay (phones) */}
        <div
          id="search-overlay"
          inert={!searchOpen}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSearch();
          }}
          className={`absolute inset-0 z-50 bg-brand-ink transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] md:hidden ${
            searchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto flex h-full items-center gap-2 px-4 sm:px-6">
            <div className="flex-1">
              {searchOpen && (
                <SearchBar
                  basePath={basePath}
                  autoFocus
                  tone="dark"
                  placeholder={tp("searchPlaceholder")}
                  onNavigate={closeSearch}
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={closeSearch}
              aria-label={t("closeSearch")}
              className={headerIconButtonClass}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      {below}
    </header>
  );
}
