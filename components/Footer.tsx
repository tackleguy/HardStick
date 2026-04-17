import Link from "next/link";
import { Logo } from "@/components/Logo";

const SHOP = [
  { label: "Drivers", href: "/category/drivers" },
  { label: "Irons", href: "/category/irons" },
  { label: "Wedges", href: "/category/wedges" },
  { label: "Putters", href: "/category/putters" },
  { label: "Balls", href: "/category/golf-balls" },
  { label: "Bags", href: "/category/bags" },
  { label: "Shoes", href: "/category/shoes" },
];
const DISCOVER = [
  { label: "Deals", href: "/deals" },
  { label: "Brands", href: "/brands" },
  { label: "Buying guides", href: "/guides" },
  { label: "Gifts", href: "/category/gifts" },
  { label: "Simulators", href: "/category/simulators" },
];
const COMPANY = [
  { label: "How it works", href: "/about" },
  { label: "Affiliate disclosure", href: "/disclosure" },
  { label: "Trust & accuracy", href: "/disclosure#accuracy" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-bone-200/10 bg-ink-950">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[13px] leading-relaxed text-bone-300">
              Hardstick is a premium golf gear search engine. Compare clubs, balls, bags, and tech across trusted retailers, then click through to buy at the best price.
            </p>
            <p className="mt-4 text-[12px] leading-relaxed text-bone-400">
              We may earn a commission when you click a partner link and buy. Prices and availability are provided by retailers and can change.
            </p>
          </div>

          <FooterCol title="Shop" items={SHOP} />
          <FooterCol title="Discover" items={DISCOVER} />
          <FooterCol title="Company" items={COMPANY} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-bone-200/10 pt-6 text-[12px] text-bone-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Hardstick Inc. All rights reserved.</p>
          <p className="label-mono">Affiliate disclosure · Not a retailer</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="label-mono mb-4">{title}</div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[13px] text-bone-200 transition-colors hover:text-bone-50"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
