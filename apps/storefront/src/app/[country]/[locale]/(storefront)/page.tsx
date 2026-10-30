import type { Metadata } from "next";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SegmentsSection } from "@/components/home/SegmentsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { WholesaleSection } from "@/components/home/WholesaleSection";
import { getCategories } from "@/lib/data/categories";
import { resolveCurrency } from "@/lib/data/markets";
import { generateHomeMetadata } from "@/lib/metadata/home";

interface HomePageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { country, locale } = await params;
  return generateHomeMetadata({ country, locale });
}

export default async function HomePage({ params }: HomePageProps) {
  const { country, locale } = await params;
  const basePath = `/${country}/${locale}`;
  const [currency, categories] = await Promise.all([
    resolveCurrency(country),
    // Root categories from the Spree admin; sections hide while there are none.
    getCategories({ depth_eq: 0 }, { country, locale })
      .then((res) => res.data)
      .catch(() => []),
  ]);

  return (
    <div>
      <HeroSection
        basePath={basePath}
        locale={locale}
        categories={categories}
      />
      <CategoriesSection
        basePath={basePath}
        locale={locale}
        categories={categories}
      />
      <FeaturedProductsSection
        basePath={basePath}
        locale={locale}
        country={country}
        currency={currency}
      />
      <SegmentsSection basePath={basePath} locale={locale} />
      <TrustSection locale={locale} />
      <WholesaleSection basePath={basePath} locale={locale} />
    </div>
  );
}
