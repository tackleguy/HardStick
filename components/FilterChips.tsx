"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Chip {
  key: string;
  label: string;
  value: string;
}

interface Props {
  chips: { label: string; value: string; active: boolean; onToggle: () => void }[];
  activeChips?: Chip[];
  onRemove?: (key: string) => void;
  className?: string;
}

export function FilterChips({ chips, activeChips = [], onRemove, className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          onClick={chip.onToggle}
          className={cn(
            "chip transition-colors",
            chip.active
              ? "border-bone-200/40 bg-bone-200/15 text-bone-50"
              : "hover:border-bone-200/30",
          )}
        >
          {chip.label}
        </button>
      ))}
      {activeChips.map((chip) => (
        <span
          key={chip.key}
          className="chip gap-1 border-fairway/40 bg-fairway-dark/30 text-fairway-light"
        >
          {chip.label}
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(chip.key)}
              className="ml-0.5 rounded-full p-0.5 text-fairway-light/80 hover:text-bone-50"
              aria-label={`Clear ${chip.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
