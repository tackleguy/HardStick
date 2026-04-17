"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { suggest } from "@/lib/search";
import type { Product } from "@/lib/types";

interface Props {
  size?: "md" | "lg";
  placeholder?: string;
  initialValue?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchInput({
  size = "md",
  placeholder = "Search clubs, balls, bags, shoes, brands…",
  initialValue = "",
  autoFocus,
  className,
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(suggest(value));
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const heightClass = size === "lg" ? "h-14 text-[15px]" : "h-12 text-[14px]";
  const padClass = size === "lg" ? "pl-14 pr-36" : "pl-12 pr-28";
  const iconClass = size === "lg" ? "left-5 h-5 w-5" : "left-4 h-4 w-4";
  const btnClass =
    size === "lg"
      ? "right-2 h-10 px-4 text-[13px]"
      : "right-1.5 h-9 px-3.5 text-[12.5px]";

  function submit(q: string) {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setFocused(false);
  }

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full", className)}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <div className="relative">
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-bone-300",
              iconClass,
            )}
          />
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              "w-full rounded-full border border-bone-200/15 bg-ink-900/70 text-bone-50 placeholder:text-bone-400 backdrop-blur-md",
              "focus:border-sand/40 focus:bg-ink-850/80 focus:outline-none focus:ring-2 focus:ring-sand/20",
              "transition-all duration-200",
              heightClass,
              padClass,
            )}
          />
          <button
            type="submit"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-bone-200 font-medium text-ink-900 transition-colors hover:bg-bone-50",
              btnClass,
            )}
          >
            Search
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {focused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-40 overflow-hidden rounded-2xl border border-bone-200/10 bg-ink-850/95 shadow-panel backdrop-blur-xl">
          <div className="border-b border-bone-200/10 px-4 py-2.5 label-mono">
            Top matches
          </div>
          <ul>
            {suggestions.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={() => setFocused(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-ink-800/80"
                >
                  <span
                    className="h-10 w-10 shrink-0 rounded-md border border-bone-200/10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] text-bone-50">
                      {p.brand} · {p.name}
                    </div>
                    <div className="truncate text-[11.5px] text-bone-400">
                      {p.subtitle}
                    </div>
                  </div>
                  <span className="label-mono">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => submit(value)}
            className="flex w-full items-center justify-between border-t border-bone-200/10 px-4 py-3 text-[12.5px] text-bone-200 hover:bg-ink-800/60"
          >
            <span>
              Search all matches for <span className="text-bone-50 font-medium">&ldquo;{value}&rdquo;</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
