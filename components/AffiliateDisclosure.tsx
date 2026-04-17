import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "inline" | "block";
  className?: string;
}

export function AffiliateDisclosure({ variant = "inline", className }: Props) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-start gap-2 rounded-lg border border-bone-200/10 bg-ink-850/60 px-3 py-2 text-[11.5px] leading-relaxed text-bone-400",
          className,
        )}
      >
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bone-400" />
        <p>
          Hardstick is reader-supported. We may earn a commission when you click a retailer link and buy. Prices and availability are provided by retailers and may change.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-bone-200/10 bg-ink-850/60 p-6",
        className,
      )}
    >
      <div className="label-mono mb-3 flex items-center gap-2">
        <Info className="h-3.5 w-3.5 text-sand" />
        <span>Affiliate disclosure</span>
      </div>
      <p className="text-[13px] leading-relaxed text-bone-200">
        Hardstick is an independent golf gear comparison site. When you click a retailer link on this page and make a purchase, we may earn a commission. Our editorial picks and rankings are independent of commission terms — we recommend gear we would play ourselves.
      </p>
      <p className="mt-3 text-[12.5px] leading-relaxed text-bone-400">
        Prices, stock, shipping terms, and promotions on this page are provided by partner retailers and can change at any time. Check the retailer&apos;s site for current terms before purchasing.
      </p>
    </div>
  );
}
