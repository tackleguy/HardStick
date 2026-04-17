import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  className,
  align = "left",
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "left"
          ? "md:flex-row md:items-end md:justify-between md:gap-6"
          : "items-center text-center",
        className,
      )}
    >
      <div className={cn(align === "center" ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow && <div className="label-mono mb-2">{eyebrow}</div>}
        <h2 className="text-[28px] font-medium leading-[1.08] tracking-tightest text-bone-50 md:text-[34px]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-[14px] leading-relaxed text-bone-300">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-bone-200 hover:text-bone-50"
        >
          {link.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
