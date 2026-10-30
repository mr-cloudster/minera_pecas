import {
  ArrowUpRight,
  CircleDot,
  Cog,
  Disc3,
  Droplets,
  Filter,
  Link2,
  type LucideIcon,
  Settings2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PART_TYPES, type PartTypeKey, partSearchHref } from "@/lib/brand";

const PART_ICONS: Record<PartTypeKey, LucideIcon> = {
  filters: Filter,
  bearings: Disc3,
  seals: CircleDot,
  hydraulics: Droplets,
  engine: Cog,
  transmission: Settings2,
  undercarriage: Link2,
  electrical: Zap,
};

interface CategoriesSectionProps {
  basePath: string;
  locale: string;
}

/** "Shop by part" grid. Every tile opens the on-site catalog search. */
export async function CategoriesSection({
  basePath,
  locale,
}: CategoriesSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });
  const th = await getTranslations({
    locale: locale as Locale,
    namespace: "header",
  });

  return (
    <section id="pecas" className="scroll-mt-32 bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-brand-ink md:text-4xl">
              {t("categoriesTitle")}
            </h2>
            <div className="mt-4 h-1 w-14 bg-brand" aria-hidden="true" />
            <p className="mt-4 max-w-lg text-neutral-600">
              {t("categoriesSubtitle")}
            </p>
          </div>
          <Link
            href={`${basePath}/products`}
            className="press inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-sm text-sm font-bold uppercase tracking-wider text-brand-ink underline decoration-brand decoration-2 underline-offset-8 hover:decoration-brand-ink sm:self-auto"
          >
            {th("allParts")}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PART_TYPES.map((part) => {
            const Icon = PART_ICONS[part.key];
            return (
              <li key={part.key}>
                <Link
                  href={partSearchHref(basePath, part.query)}
                  className="press group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 p-5 hover:border-brand-ink hover:bg-white hover:shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)] md:p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-brand-ink text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="flex items-end justify-between gap-2">
                    <span className="font-display text-sm font-bold uppercase leading-tight tracking-wide text-brand-ink md:text-base">
                      {th(`partTypes.${part.key}`)}
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-neutral-400 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
