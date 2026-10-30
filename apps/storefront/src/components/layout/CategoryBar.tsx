import type { Category } from "@spree/sdk";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface CategoryBarProps {
  basePath: string;
  locale: Locale;
  /** Spree root categories, managed in the admin panel. */
  categories?: Category[];
}

const itemClass =
  "press inline-flex h-11 shrink-0 items-center gap-2 px-3 text-[0.8rem] font-bold uppercase tracking-wider text-brand-foreground hover:bg-brand-night hover:text-brand focus-visible:outline-offset-[-3px]";

/**
 * Amber category rail under the charcoal bar. Scrolls horizontally on small
 * screens so every family stays one tap away.
 */
export async function CategoryBar({
  basePath,
  locale,
  categories = [],
}: CategoryBarProps) {
  const t = await getTranslations({ locale, namespace: "header" });

  const items = categories.map((category) => ({
    key: category.id,
    label: category.name,
    href: `${basePath}/c/${category.permalink}`,
  }));

  return (
    <nav
      aria-label={t("shopByPart")}
      className="bg-brand text-brand-foreground"
    >
      <div className="container mx-auto px-0 sm:px-6 lg:px-8">
        <ul className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              href={`${basePath}/products`}
              className={`${itemClass} bg-brand-night text-white hover:text-brand focus-visible:outline-brand`}
            >
              <LayoutGrid className="size-4" aria-hidden />
              {t("allParts")}
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.key} className="shrink-0">
              <Link href={item.href} className={itemClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
