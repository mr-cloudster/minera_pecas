import { Construction, Pickaxe, Tractor } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface SegmentsSectionProps {
  locale: string;
}

/**
 * The three markets Minera Peças serves. Static copy only, so the homepage
 * stays prerenderable.
 */
export async function SegmentsSection({ locale }: SegmentsSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  const segments = [
    {
      icon: Tractor,
      title: t("segmentAgroTitle"),
      description: t("segmentAgroDescription"),
    },
    {
      icon: Construction,
      title: t("segmentYellowTitle"),
      description: t("segmentYellowDescription"),
    },
    {
      icon: Pickaxe,
      title: t("segmentMiningTitle"),
      description: t("segmentMiningDescription"),
    },
  ];

  return (
    <section className="bg-neutral-50 border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-brand-ink">
          {t("segmentsTitle")}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {segments.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="rounded-lg border border-neutral-200 border-t-4 border-t-brand bg-white p-6"
            >
              <Icon className="size-8 text-brand-ink" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-brand-ink">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
