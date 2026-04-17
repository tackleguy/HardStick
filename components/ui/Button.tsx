import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-10 px-4 text-[13.5px]",
  lg: "h-12 px-5 text-[14.5px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-bone-200 text-ink-900 hover:bg-bone-50 transition-colors font-medium",
  ghost:
    "border border-bone-200/15 bg-ink-800/60 text-bone-100 hover:border-bone-200/30 hover:bg-ink-700/70 transition-colors",
  outline:
    "border border-bone-200/20 bg-transparent text-bone-100 hover:border-bone-200/40 hover:bg-ink-800/60 transition-colors",
  subtle:
    "bg-transparent text-bone-200 hover:text-bone-50 underline-offset-4 hover:underline",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone-200/40 disabled:opacity-50 disabled:pointer-events-none select-none";

export const Button = forwardRef<HTMLButtonElement, BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ className, variant = "primary", size = "md", children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

interface ButtonLinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  external,
  ...rest
}: ButtonLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
