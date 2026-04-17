import { BRANDS } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { BrandCard } from "@/components/BrandCard";

const CONTAINER = "mx-auto max-w-[1440px] px-6 lg:px-10";

export const metadata = {
  title: "Brands — Hardstick",
  description: "The golf brands we track across our partner retailers.",
};

export default function BrandsPage() {
  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-10`}>
        <div className="label-mono">Brands</div>
        <h1 className="mt-3 text-[42px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[54px]">
          Every brand worth comparing.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-bone-300">
          From tour-validated heavyweights to cult forgers. We cover the brands players actually play — and we aim for 10% commission with partners where program terms allow.
        </p>
      </section>

      <section className={`${CONTAINER}`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.map((brand) => (
            <BrandCard
              key={brand.slug}
              brand={brand}
              productCount={getProductsByBrand(brand.slug).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
