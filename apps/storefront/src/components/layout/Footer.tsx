import type { Category } from "@spree/sdk";
import { CreditCard, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { POLICY_LINKS } from "@/lib/constants/policies";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreDescription, getStoreName } from "@/lib/store";
import { CurrentYear } from "./CurrentYear";
import { Logo, LogoMark } from "./Logo";

const storeName = getStoreName();
const storeDescription = getStoreDescription();

/* neutral-300 on the near-black footer is 13:1; hover to brand amber is 8.9:1. */
const linkClass =
  "text-sm text-neutral-300 hover:text-brand transition-colors rounded-sm focus-visible:outline-brand";
const headingClass =
  "font-display text-xs font-bold uppercase tracking-[0.2em] text-brand";

interface FooterProps {
  basePath: string;
  locale: Locale;
  categoryLinks: ReactNode;
}

interface FooterCategoryLinksProps {
  rootCategories: Category[];
  basePath: string;
}

export function FooterCategoryLinks({
  rootCategories,
  basePath,
}: FooterCategoryLinksProps) {
  return rootCategories.map((category) => (
    <li key={category.id}>
      <Link href={`${basePath}/c/${category.permalink}`} className={linkClass}>
        {category.name}
      </Link>
    </li>
  ));
}

export async function Footer({ basePath, locale, categoryLinks }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tp = await getTranslations({ locale, namespace: "policies" });
  const tt = await getTranslations({ locale, namespace: "trust" });
  const wholesaleEnabled = isWholesaleEnabled();

  const assurances = [
    { icon: ShieldCheck, label: tt("secureTitle") },
    { icon: Truck, label: tt("shippingTitle") },
    { icon: CreditCard, label: tt("paymentTitle") },
    { icon: PackageCheck, label: tt("ordersTitle") },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-brand-night text-neutral-300">
      <div aria-hidden="true" className="hazard-stripes h-1.5 w-full" />
      {/* Oversized monogram watermark */}
      <LogoMark className="pointer-events-none absolute -bottom-24 -right-16 -z-10 h-[420px] w-auto text-white opacity-[0.035]" />

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href={basePath || "/"}
              aria-label={storeName}
              className="press inline-flex rounded-sm focus-visible:outline-brand"
            >
              <Logo tone="dark" showTagline tagline={t("tagline")} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t("description") || storeDescription}
            </p>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>{t("shop")}</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={`${basePath}/products`} className={linkClass}>
                  {t("allProducts")}
                </Link>
              </li>
              {categoryLinks}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>{t("account")}</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={`${basePath}/account`} className={linkClass}>
                  {t("myAccount")}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/account/orders`} className={linkClass}>
                  {t("orderHistory")}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/cart`} className={linkClass}>
                  {t("cart")}
                </Link>
              </li>
              {wholesaleEnabled && (
                <li>
                  <Link href={`${basePath}/wholesale`} className={linkClass}>
                    {t("wholesale")}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>{t("policies")}</h3>
            <ul className="mt-5 space-y-3">
              {POLICY_LINKS.map((policy) => (
                <li key={policy.slug}>
                  <Link
                    href={`${basePath}/policies/${policy.slug}`}
                    className={linkClass}
                  >
                    {tp(policy.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assurances (no links: reasons to buy here) */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>{t("buyWithConfidence")}</h3>
            <ul className="mt-5 space-y-3">
              {assurances.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-neutral-300"
                >
                  <Icon className="size-4 shrink-0 text-brand" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-neutral-400 sm:flex-row">
          <p>
            &copy; <CurrentYear /> {storeName}. {t("rightsReserved")}
          </p>
          <p className="font-display font-semibold uppercase tracking-[0.25em] text-neutral-400">
            {t("tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}
