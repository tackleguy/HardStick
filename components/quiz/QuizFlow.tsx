"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import type { QuizAnswers, QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  onComplete: (answers: QuizAnswers) => void;
}

export function QuizFlow({ onComplete }: Props) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [step, setStep] = useState(0);

  // Filter active questions based on conditional logic at this point in the flow.
  const activeQuestions = useMemo<QuizQuestion[]>(
    () => QUIZ_QUESTIONS.filter((q) => !q.conditional || q.conditional(answers)),
    [answers],
  );
  const total = activeQuestions.length;
  const safeStep = Math.min(step, total - 1);
  const current = activeQuestions[safeStep];
  const progress = Math.round(((safeStep + (isAnswered(answers, current) ? 1 : 0)) / total) * 100);

  function isAnswered(a: QuizAnswers, q: QuizQuestion): boolean {
    const v = a[q.id];
    if (q.type === "multi") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  }

  function pick(value: string) {
    setAnswers((a) => {
      if (current.type === "multi") {
        const prev = (a[current.id] as string[]) ?? [];
        const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
        return { ...a, [current.id]: next };
      }
      return { ...a, [current.id]: value };
    });
    if (current.type === "single") {
      // auto-advance for single-select
      setTimeout(() => goNext(), 220);
    }
  }

  function isPicked(value: string) {
    if (current.type === "multi") return ((answers[current.id] as string[]) ?? []).includes(value);
    return answers[current.id] === value;
  }

  function goNext() {
    if (safeStep === total - 1) {
      onComplete(answers);
    } else {
      setStep(safeStep + 1);
    }
  }

  function goBack() {
    setStep(Math.max(0, safeStep - 1));
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-4">
        <div className="label-mono shrink-0">
          {String(safeStep + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone-200/10">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 rounded-full bg-sand"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label-mono">Question {safeStep + 1}</div>
          <h2 className="mt-3 text-[28px] font-medium leading-[1.1] tracking-tightest text-bone-50 md:text-[36px]">
            {current.prompt}
          </h2>
          {current.helper && (
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-bone-300">
              {current.helper}
            </p>
          )}

          <div className="mt-8 grid gap-3">
            {current.options.map((option) => {
              const picked = isPicked(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => pick(option.value)}
                  className={cn(
                    "group flex items-start justify-between gap-4 rounded-2xl border bg-ink-850/60 px-5 py-4 text-left transition-colors",
                    picked
                      ? "border-sand/50 bg-sand/5"
                      : "border-bone-200/10 hover:border-bone-200/30",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-medium text-bone-50">{option.label}</div>
                    {option.description && (
                      <div className="mt-1 text-[12.5px] text-bone-300">{option.description}</div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      picked
                        ? "border-sand bg-sand text-ink-900"
                        : "border-bone-200/30 text-transparent",
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer / nav */}
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={safeStep === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-bone-200/15 bg-ink-900/60 px-4 py-2 text-[12.5px] text-bone-200 transition-colors hover:border-bone-200/30 disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!isAnswered(answers, current)}
              className="inline-flex items-center gap-1.5 rounded-full bg-bone-200 px-5 py-2.5 text-[13px] font-medium text-ink-900 transition-colors hover:bg-bone-50 disabled:opacity-40"
            >
              {safeStep === total - 1 ? "Get my 14-club bag" : "Next"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
