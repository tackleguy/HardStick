"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { QuizResult } from "@/components/quiz/QuizResult";
import { recommendSet } from "@/lib/recommendation";
import type { QuizAnswers, SetRecommendation } from "@/lib/types";

const CONTAINER = "mx-auto max-w-[1100px] px-6 lg:px-10";

type Stage = "intro" | "quiz" | "result";

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [recommendation, setRecommendation] = useState<SetRecommendation | null>(null);

  function start() {
    setStage("quiz");
  }

  function complete(answers: QuizAnswers) {
    const result = recommendSet(answers);
    setRecommendation(result);
    setStage("result");
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  function restart() {
    setRecommendation(null);
    setStage("intro");
  }

  return (
    <div className="relative pb-20 pt-12 md:pt-16">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-fairway-glow opacity-50" aria-hidden />

      <div className={`relative ${CONTAINER}`}>
        {stage === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="label-mono inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sand" />
              The 14-club quiz
            </div>
            <h1 className="mt-4 text-[42px] font-medium leading-[1.04] tracking-tightest text-bone-50 md:text-[58px]">
              Get matched to a complete <span className="text-bone-200">14-club set</span> in two minutes.
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-bone-300">
              Nine questions. Conditional logic. A research-backed scoring model picks the right driver, woods, hybrids, irons, wedges, and putter for your profile — across every brand we track.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Why title="9 quick questions" body="Skill, speed, budget, struggles, intent — that's it." />
              <Why title="Weighted scoring" body="A profile-driven model ranks every product against your answers." />
              <Why title="Three alternates" body="Best value, most forgiving, premium upgrade — built for you." />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button onClick={start} className="btn-primary px-6 py-3 text-[14px]">
                Start the quiz
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <Link href="/build-your-bag" className="btn-ghost">
                Or build a bag manually
              </Link>
            </div>

            <p className="mt-8 text-[12.5px] text-bone-400">
              Hardstick is a search and discovery platform. We may earn a commission when you click out and buy.
            </p>
          </motion.div>
        )}

        {stage === "quiz" && <QuizFlow onComplete={complete} />}

        {stage === "result" && recommendation && (
          <QuizResult recommendation={recommendation} onRestart={restart} />
        )}
      </div>
    </div>
  );
}

function Why({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-bone-200/10 bg-ink-850/60 p-4">
      <div className="text-[13.5px] font-medium text-bone-50">{title}</div>
      <div className="mt-1 text-[12.5px] leading-relaxed text-bone-300">{body}</div>
    </div>
  );
}
