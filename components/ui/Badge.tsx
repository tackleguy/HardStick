import { cn } from "@/lib/utils";
import type { ProductTag } from "@/lib/types";

const TAG_LABEL: Record<ProductTag, string> = {
  "best-value": "Best value",
  "premium-pick": "Premium pick",
  "most-popular": "Most popular",
  "on-sale": "On sale",
  "editor-pick": "Editor pick",
  new: "New",
  "best-seller": "Best seller",
};

const TAG_TONE: Record<ProductTag, string> = {
  "best-value": "border-fairway/40 text-fairway-light bg-fairway-dark/30",
  "premium-pick": "border-sand/40 text-sand bg-ink-800/60",
  "most-popular": "border-bone-200/20 text-bone-100 bg-ink-800/60",
  "on-sale": "border-flag/40 text-flag bg-ink-800/60",
  "editor-pick": "border-sand-warm/40 text-sand-warm bg-ink-800/60",
  new: "border-bone-200/20 text-bone-100 bg-ink-800/60",
  "best-seller": "border-bone-200/20 text-bone-200 bg-ink-800/60",
};

export function ProductBadge({
  tag,
  className,
}: {
  tag: ProductTag;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-medium tracking-wide",
        TAG_TONE[tag],
        className,
      )}
    >
      {TAG_LABEL[tag]}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "fairway" | "sand" | "flag";
  className?: string;
}) {
  const tones = {
    neutral: "border-bone-200/15 text-bone-200 bg-ink-800/60",
    fairway: "border-fairway/40 text-fairway-light bg-fairway-dark/30",
    sand: "border-sand/40 text-sand bg-ink-800/60",
    flag: "border-flag/40 text-flag bg-ink-800/60",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
