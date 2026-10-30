import { ArrowRight, Construction, Pickaxe, Tractor } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MACHINE_BRANDS, partSearchHref } from "@/lib/brand";

interface SegmentsSectionProps {
  basePath: string;
  locale: string;
}

/**
 * The three markets Minera Peças serves, plus the machine brands it covers.
 * Each segment opens the catalog search for its machines.
 */
export async function SegmentsSection({
  basePath,
  locale,
}: SegmentsSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  const segments = [
    {
      icon: Tractor,
      title: t("segmentAgroTitle"),
      description: t("segmentAgroDescription"),
      query: "trator",
    },
    {
      icon: Construction,
      title: t("segmentYellowTitle"),
      description: t("segmentYellowDescription"),
      query: "retroescavadeira",
    },
    {
      icon: Pickaxe,
      title: t("segmentMiningTitle"),
      description: t("segmentMiningDescription"),
      query: "escavadeira",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blueprint-grid [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          {t("segmentsTitle")}
        </h2>
        <div className="mt-4 h-1 w-14 bg-brand" aria-hidden="true" />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {segments.map(({ icon: Icon, title, description, query }, index) => (
            <li key={title}>
              <Link
                href={partSearchHref(basePath, query)}
                className="press group relative flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-brand-steel p-6 hover:border-brand focus-visible:outline-brand md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-5 font-display text-5xl font-extrabold leading-none text-white/[0.07] transition-colors duration-200 group-hover:text-brand/30"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="size-10 text-brand" aria-hidden />
                <h3 className="mt-6 text-xl font-bold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-300">
                  {description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand">
                  {t("segmentCta")}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Brands served: plain text, no manufacturer logos. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
            {t("brandsTitle")}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {MACHINE_BRANDS.map((brand) => (
              <li
                key={brand}
                className="font-display text-lg font-bold uppercase tracking-wide text-neutral-200 md:text-xl"
              >
                {brand}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-400">{t("brandsNote")}</p>
        </div>
      </div>
    </section>
  );
}
