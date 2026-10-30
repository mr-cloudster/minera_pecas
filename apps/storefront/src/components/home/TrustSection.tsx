import { CreditCard, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface TrustSectionProps {
  locale: string;
}

/** Amber reassurance band: why buying on the site is safe and simple. */
export async function TrustSection({ locale }: TrustSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "trust",
  });

  const items = [
    { icon: ShieldCheck, title: t("secureTitle"), text: t("secureText") },
    { icon: Truck, title: t("shippingTitle"), text: t("shippingText") },
    { icon: CreditCard, title: t("paymentTitle"), text: t("paymentText") },
    { icon: PackageCheck, title: t("ordersTitle"), text: t("ordersText") },
  ];

  return (
    <section
      aria-labelledby="trust-title"
      className="bg-brand text-brand-foreground"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="trust-title" className="sr-only">
          {t("sectionTitle")}
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-night text-brand">
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base font-extrabold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-foreground/80">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
