"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SearchInput } from "@/components/SearchInput";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Drivers", href: "/category/drivers" },
  { label: "Irons", href: "/category/irons" },
  { label: "Putters", href: "/category/putters" },
  { label: "Balls", href: "/category/golf-balls" },
  { label: "Tech", href: "/category/rangefinders" },
  { label: "Deals", href: "/deals" },
  { label: "Brands", href: "/brands" },
  { label: "Guides", href: "/guides" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bone-200/10 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[62px] max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-bone-200 transition-colors hover:text-bone-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex md:w-[320px] lg:w-[420px]">
          <SearchInput size="md" />
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-200/15 bg-ink-800/60 text-bone-100"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-200/15 bg-ink-800/60 text-bone-100"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-bone-200/10 bg-ink-900/90 px-6 py-3 md:hidden">
          <SearchInput size="md" autoFocus />
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden border-t border-bone-200/10 bg-ink-900/95 transition-[max-height] duration-300 lg:hidden",
          mobileOpen ? "max-h-[600px]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-bone-200/5 py-3 text-[14px] text-bone-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
