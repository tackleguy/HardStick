import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  className,
  size = "md",
}: {
  category: Category;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const aspect = size === "lg" ? "aspect-[4/5]" : size === "sm" ? "aspect-[4/3]" : "aspect-[3/4]";
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-bone-200/10",
        aspect,
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/10" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <div className="label-mono">Category</div>
        <div className="mt-1 flex items-center justify-between">
          <h3 className="text-[20px] font-medium tracking-tight text-bone-50">
            {category.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-bone-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="mt-1 max-w-[280px] text-[12.5px] leading-relaxed text-bone-200">
          {category.blurb}
        </p>
        <div className="mt-3 text-[11.5px] text-bone-400">
          {category.count} products
        </div>
      </div>
    </Link>
  );
}
