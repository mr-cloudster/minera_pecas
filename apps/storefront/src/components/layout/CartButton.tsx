"use client";

import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { headerIconButtonClass } from "@/components/layout/header-styles";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function CartButton() {
  const t = useTranslations("header");
  const { itemCount, openCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={openCart}
      aria-label={t("openCart")}
      className={`relative ${headerIconButtonClass}`}
    >
      <ShoppingCart className="size-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-brand-foreground ring-2 ring-brand-ink">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
