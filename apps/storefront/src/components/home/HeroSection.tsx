import { ArrowRight, MessageCircle, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { MACHINE_BRANDS, WHATSAPP_URL } from "@/lib/brand";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

/** Yellow/charcoal safety-stripe band, a nod to heavy-equipment markings. */
function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full bg-[repeating-linear-gradient(-45deg,var(--brand)_0_14px,var(--brand-ink)_14px_28px)]"
    />
  );
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  const highlights = [
    { icon: Wrench, title: t("qualityProducts") },
    { icon: Truck, title: t("fastShipping") },
    { icon: MessageCircle, title: t("support") },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      {/* Oversized monogram as a faint watermark on large screens. */}
      <LogoMark className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 text-white opacity-[0.06] lg:block" />

      <div className="relative min-h-[823px] md:min-h-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold uppercase leading-[1.05] tracking-tight text-white">
              {t("welcome")}
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-2xl">
              {t("heroDescription")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="bg-brand text-brand-foreground font-semibold hover:bg-primary-300 focus-visible:border-white focus-visible:[outline:2px_solid_white]"
              >
                <Link href={`${basePath}/products`}>
                  {t("shopNow")}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:border-white focus-visible:[outline:2px_solid_white]"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden />
                  {t("talkToSpecialist")}
                </a>
              </Button>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 text-sm font-medium text-neutral-200"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>

          {/* Brands served: plain text only, no manufacturer logos. */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {t("brandsTitle")}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {MACHINE_BRANDS.map((brand) => (
                <li
                  key={brand}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-semibold text-white"
                >
                  {brand}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-neutral-400">{t("brandsNote")}</p>
          </div>
        </div>
      </div>
      <HazardStripe />
    </section>
  );
}
