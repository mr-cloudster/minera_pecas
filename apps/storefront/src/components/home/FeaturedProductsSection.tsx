import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

function CarouselSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface FeaturedProductsSectionProps {
  basePath: string;
  locale: string;
  country: string;
  currency?: string;
}

export async function FeaturedProductsSection({
  basePath,
  locale,
  country,
  currency,
}: FeaturedProductsSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="featured-products border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-brand-ink md:text-4xl">
              {t("featuredProducts")}
            </h2>
            <div className="mt-4 h-1 w-14 bg-brand" aria-hidden="true" />
          </div>
          <Link
            href={`${basePath}/products`}
            className="press inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm text-sm font-bold uppercase tracking-wider text-brand-ink underline decoration-brand decoration-2 underline-offset-8 hover:decoration-brand-ink"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <Suspense fallback={<CarouselSkeleton />}>
          <FeaturedProducts
            basePath={basePath}
            locale={locale}
            country={country}
            currency={currency}
          />
        </Suspense>
      </div>
    </section>
  );
}
