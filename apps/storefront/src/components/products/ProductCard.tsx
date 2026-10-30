"use client";

import type { Product } from "@spree/sdk";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { ProductImage } from "@/components/ui/product-image";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { trackSelectItem } from "@/lib/analytics/gtm";
import { strikethroughAmount } from "@/lib/utils/price";

interface ProductCardProps {
  product: Product;
  basePath?: string;
  categoryId?: string;
  index?: number;
  listId?: string;
  listName?: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Optional currency used for analytics; omit to skip the select_item event. */
  currency?: string;
}

export const ProductCard = memo(function ProductCard({
  product,
  basePath = "",
  categoryId,
  index,
  listId,
  listName,
  fetchPriority,
  currency,
}: ProductCardProps) {
  const t = useTranslations("products");
  const imageUrl = product.thumbnail_url || null;

  const formatMoney = useFormatMoney();
  const price = product.price;
  const displayPrice = price
    ? formatMoney(price.amount, price.currency, { unitPrice: true })
    : null;
  const struckAmount = strikethroughAmount(price, product.original_price);
  const onSale = struckAmount !== null;
  const strikethroughPrice =
    price && struckAmount
      ? formatMoney(struckAmount, price.currency, { unitPrice: true })
      : null;

  const handleClick = () => {
    if (index != null && listId && listName && currency) {
      trackSelectItem(product, listId, listName, index, currency);
    }
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-brand-ink hover:shadow-[0_18px_40px_-22px_rgb(0_0_0/0.4)] has-[a:focus-visible]:border-brand-ink has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-ink has-[a:focus-visible]:ring-offset-2">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ProductImage
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px"
          iconClassName="w-16 h-16"
          fetchPriority={fetchPriority}
        />
        {onSale && (
          <span className="absolute left-0 top-3 bg-brand px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-foreground">
            {t("sale")}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-sans text-sm font-semibold leading-snug text-brand-ink line-clamp-2">
          {/* Stretched link: the ::after overlay keeps the whole card clickable
              without wrapping the content in an <a> — HiddenPricePrompt renders
              its own link, and anchors can't nest. */}
          <Link
            href={`${basePath}/products/${product.slug}${categoryId ? `?category_id=${categoryId}` : ""}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
            onClick={handleClick}
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          {displayPrice ? (
            <span className="font-display text-xl font-extrabold tracking-tight text-brand-ink">
              {displayPrice}
            </span>
          ) : (
            // Null price: a deliberate hide inside a HiddenPricingProvider
            // (renders a sign-in prompt), otherwise renders nothing.
            <HiddenPricePrompt />
          )}
          {onSale && strikethroughPrice && (
            <span className="text-sm text-gray-500 line-through">
              {strikethroughPrice}
            </span>
          )}
        </div>

        {!product.purchasable && (
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {t("outOfStock")}
          </span>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </div>
  );
});
