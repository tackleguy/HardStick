import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EditorialGuide } from "@/lib/types";
import { cn } from "@/lib/utils";

export function EditorialCard({
  guide,
  className,
  size = "md",
}: {
  guide: EditorialGuide;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const aspect = size === "lg" ? "aspect-[16/9]" : "aspect-[3/2]";

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/60 transition-colors hover:border-bone-200/25",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", aspect)}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${guide.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="label-mono flex items-center gap-2">
          <span>Buying guide</span>
          <span>·</span>
          <span>{guide.readingTime}</span>
        </div>
        <h3 className="mt-2 text-[17px] font-medium leading-snug tracking-tight text-bone-50">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-bone-300">
          {guide.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[11.5px] text-bone-400">{guide.publishedAt}</span>
          <ArrowUpRight className="h-4 w-4 text-bone-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
