import type { Category } from "@spree/sdk";
import { PackageCheck, ShieldCheck, Truck, User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { CartButton } from "@/components/layout/CartButton";
import { headerIconButtonClass } from "@/components/layout/header-styles";
import { Logo } from "@/components/layout/Logo";
import { SearchToggle } from "@/components/layout/SearchToggle";
import { Button } from "@/components/ui/button";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreName } from "@/lib/store";

const LazyMobileMenu = dynamic(
  () =>
    import("@/components/layout/MobileMenu").then((mod) => ({
      default: mod.MobileMenu,
    })),
  {
    loading: () => (
      <div className="inline-flex items-center justify-center h-10 w-10" />
    ),
  },
);

const storeName = getStoreName();

interface HeaderProps {
  basePath: string;
  locale: Locale;
  mobileNavigation: ReactNode;
  /** Category rail rendered under the main bar (streamed by the layout). */
  categoryNavigation?: ReactNode;
}

interface HeaderMobileMenuProps {
  rootCategories: Category[];
  basePath: string;
}

export function HeaderMobileMenu({
  rootCategories,
  basePath,
}: HeaderMobileMenuProps) {
  return (
    <LazyMobileMenu
      rootCategories={rootCategories}
      basePath={basePath}
      wholesaleEnabled={isWholesaleEnabled()}
    />
  );
}

/** Thin reassurance strip above the header (desktop only, scrolls away). */
async function TrustStrip({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "trust" });
  const items = [
    { icon: ShieldCheck, label: t("secureTitle") },
    { icon: Truck, label: t("shippingTitle") },
    { icon: PackageCheck, label: t("ordersTitle") },
  ];

  return (
    <div className="hidden bg-brand-night text-neutral-300 md:block">
      <ul className="container mx-auto flex h-9 items-center justify-center gap-8 px-4 text-xs font-medium uppercase tracking-wider sm:px-6 lg:justify-end lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="size-3.5 text-brand" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Header({
  basePath,
  locale,
  mobileNavigation,
  categoryNavigation,
}: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "header" });
  const wholesaleEnabled = isWholesaleEnabled();

  return (
    <>
      <TrustStrip locale={locale} />
      <SearchToggle
        basePath={basePath}
        left={mobileNavigation}
        center={
          <Link
            href={basePath || "/"}
            aria-label={storeName}
            className="press flex min-w-0 items-center rounded-sm focus-visible:outline-brand"
          >
            <Logo tone="dark" />
          </Link>
        }
        rightStart={
          wholesaleEnabled ? (
            <Link
              href={`${basePath}/wholesale`}
              className="hidden whitespace-nowrap rounded-sm px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 transition-colors hover:text-brand focus-visible:outline-brand xl:inline-flex"
            >
              {t("wholesale")}
            </Link>
          ) : null
        }
        rightEnd={
          <>
            {/* Account - desktop only */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="lg"
                asChild
                className={`${headerIconButtonClass} h-11 px-3 text-sm`}
              >
                <Link href={`${basePath}/account`} aria-label={t("myAccount")}>
                  <User className="size-5" />
                  <span className="hidden lg:inline">{t("myAccount")}</span>
                </Link>
              </Button>
            </div>

            {/* Cart */}
            <CartButton />
          </>
        }
        below={categoryNavigation}
      />
    </>
  );
}
