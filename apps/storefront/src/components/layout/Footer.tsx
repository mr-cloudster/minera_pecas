import type { Category } from "@spree/sdk";
import { Instagram, MessageCircle, Truck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/brand";
import { POLICY_LINKS } from "@/lib/constants/policies";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreDescription, getStoreName } from "@/lib/store";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

const storeName = getStoreName();
const storeDescription = getStoreDescription();

/* neutral-300 on the charcoal band is 11:1; hover to brand yellow is 10:1. */
const linkClass =
  "text-sm text-neutral-300 hover:text-brand transition-colors rounded-sm focus-visible:outline-white";
const headingClass = "text-sm font-bold uppercase tracking-wider text-white";

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
  const wholesaleEnabled = isWholesaleEnabled();

  return (
    <footer className="border-t-4 border-brand bg-brand-ink text-neutral-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link
              href={basePath || "/"}
              aria-label={storeName}
              className="inline-flex rounded-sm focus-visible:outline-white"
            >
              <Logo tone="dark" showTagline tagline={t("tagline")} />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-neutral-300">
              {t("description") || storeDescription}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className={headingClass}>{t("shop")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href={`${basePath}/products`} className={linkClass}>
                  {t("allProducts")}
                </Link>
              </li>
              {categoryLinks}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className={headingClass}>{t("account")}</h3>
            <ul className="mt-4 space-y-3">
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
          <div>
            <h3 className={headingClass}>{t("policies")}</h3>
            <ul className="mt-4 space-y-3">
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

          {/* Contact */}
          <div>
            <h3 className={headingClass}>{t("contact")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  {t("whatsapp")}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("instagram")}: ${INSTAGRAM_HANDLE}`}
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <Instagram className="size-4 shrink-0" aria-hidden />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-300">
                <Truck className="size-4 shrink-0 text-brand" aria-hidden />
                {t("shipsNationwide")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-xs text-neutral-400 text-center">
          <p>
            &copy; <CurrentYear /> {storeName}. {t("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
