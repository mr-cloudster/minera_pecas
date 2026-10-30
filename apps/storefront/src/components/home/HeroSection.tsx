import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MONOGRAM_LEFT, MONOGRAM_RIGHT } from "@/components/layout/Logo";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { PART_TYPES, partSearchHref } from "@/lib/brand";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

/** Amber crop marks in the corners of the monogram panel. */
function CropMarks() {
  const mark = "absolute size-5 border-brand";
  return (
    <>
      <span className={`${mark} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${mark} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${mark} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${mark} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

/**
 * Large vector monogram, the brand's signature graphic (the Instagram posts
 * use the same "M" as a frame). Pure SVG, so it stays sharp at any size.
 */
function MonogramPanel({ tagline }: { tagline: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block"
    >
      <div className="absolute inset-0 border border-white/10 bg-brand-steel/60 blueprint-grid" />
      <CropMarks />
      <svg
        viewBox="-60 -60 615 610"
        className="absolute inset-0 size-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]"
        focusable="false"
      >
        <defs>
          <linearGradient id="hero-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6bf3a" />
            <stop offset="1" stopColor="#d98f0c" />
          </linearGradient>
          <linearGradient id="hero-steel" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#bdbdbd" />
          </linearGradient>
        </defs>
        <path fill="url(#hero-amber)" d={MONOGRAM_LEFT} />
        <path fill="url(#hero-steel)" d={MONOGRAM_RIGHT} />
      </svg>
      <span className="absolute -bottom-7 left-0 font-display text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-neutral-400">
        {tagline}
      </span>
    </div>
  );
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });
  const tp = await getTranslations({
    locale: locale as Locale,
    namespace: "products",
  });
  const th = await getTranslations({
    locale: locale as Locale,
    namespace: "header",
  });
  const tf = await getTranslations({
    locale: locale as Locale,
    namespace: "footer",
  });

  const highlights = [
    { icon: Wrench, title: t("qualityProducts") },
    { icon: Truck, title: t("fastShipping") },
    { icon: ShieldCheck, title: t("support") },
  ];

  return (
    <section className="relative isolate bg-brand-night text-white">
      {/* Decorative ground: engineering grid fading out + amber glow. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 blueprint-grid [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
        <div className="absolute -right-40 top-1/4 size-[640px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-night to-transparent" />
      </div>

      <div className="container mx-auto flex min-h-[823px] items-center px-4 py-16 sm:px-6 md:min-h-[640px] md:py-20 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="rise inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand sm:text-sm">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {t("heroEyebrow")}
            </p>

            <h1 className="rise rise-1 mt-5 text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
              {t("welcome")}{" "}
              <span className="block text-brand">{t("welcomeHighlight")}</span>
            </h1>

            <div
              className="rise rise-1 mt-6 h-1 w-16 bg-brand"
              aria-hidden="true"
            />

            <p className="rise rise-2 mt-6 max-w-xl text-base text-neutral-300 sm:text-lg">
              {t("heroDescription")}
            </p>

            {/* Search first: most buyers arrive with a part number. */}
            <div className="rise rise-2 relative z-20 mt-8 max-w-xl">
              <SearchBar
                basePath={basePath}
                tone="hero"
                placeholder={tp("searchPlaceholder")}
              />
              <ul className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {PART_TYPES.slice(0, 4).map((part) => (
                  <li key={part.key}>
                    <Link
                      href={partSearchHref(basePath, part.query)}
                      className="press inline-flex rounded-full border border-white/15 px-3 py-1 font-medium text-neutral-300 hover:border-brand hover:text-brand focus-visible:outline-brand"
                    >
                      {th(`partTypes.${part.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="press h-13 bg-brand px-7 font-bold uppercase tracking-wide text-brand-foreground hover:bg-brand-strong focus-visible:border-transparent focus-visible:[outline:2px_solid_white]"
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
                className="press h-13 border-white/30 bg-transparent px-7 font-bold uppercase tracking-wide text-white hover:border-white hover:bg-white/5 hover:text-white focus-visible:border-white focus-visible:[outline:2px_solid_var(--brand)]"
              >
                <Link href="#pecas">{t("heroSecondaryCta")}</Link>
              </Button>
            </div>

            <ul className="rise rise-4 mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-brand/60 text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise rise-2 lg:col-span-5">
            <MonogramPanel tagline={tf("tagline")} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="hazard-stripes h-2.5 w-full" />
    </section>
  );
}
