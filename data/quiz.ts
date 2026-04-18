import type { QuizQuestion } from "@/lib/types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "intent",
    prompt: "What are you here to do?",
    helper: "We'll use this to weight whether to recommend a full set or specific clubs.",
    type: "single",
    options: [
      { value: "first-set", label: "Build my first serious set", description: "I want a full 14-club bag start to finish." },
      { value: "upgrade", label: "Upgrade my current bag", description: "I'm refreshing most clubs and open to a new lineup." },
      { value: "specific-clubs", label: "Replace specific clubs", description: "I'm hunting one or two slots, not the whole bag." },
    ],
  },
  {
    id: "handicap",
    prompt: "How would you describe your game?",
    helper: "Handicap brackets are approximate — pick the closest match.",
    type: "single",
    options: [
      { value: "beginner", label: "Brand new or just starting", description: "First serious set or shooting 100+." },
      { value: "high", label: "Higher handicap", description: "Roughly 19–28." },
      { value: "mid", label: "Mid handicap", description: "Roughly 10–18." },
      { value: "low", label: "Low handicap", description: "Roughly 1–9." },
      { value: "scratch", label: "Scratch or near-scratch", description: "Tour-style player." },
    ],
  },
  {
    id: "swing_speed",
    prompt: "How fast do you swing your driver?",
    helper: "If you've never measured, pick the closest fit.",
    type: "single",
    options: [
      { value: "slow", label: "Under 85 mph", description: "Driver carry around 180–210 yds." },
      { value: "moderate", label: "85 – 100 mph", description: "Driver carry around 210–250 yds." },
      { value: "fast", label: "100 – 110 mph", description: "Driver carry around 250–280 yds." },
      { value: "tour", label: "110+ mph", description: "Tour-grade speed." },
    ],
  },
  {
    id: "priority",
    prompt: "What matters more in your clubs?",
    type: "single",
    options: [
      { value: "forgiveness", label: "Forgiveness", description: "I want help on my misses." },
      { value: "balanced", label: "Balanced", description: "A bit of both." },
      { value: "workability", label: "Workability", description: "I want to shape shots and feel everything." },
    ],
  },
  {
    id: "struggles",
    prompt: "What do you struggle with most?",
    helper: "Choose all that apply — we'll weight recommendations against each.",
    type: "multi",
    options: [
      { value: "distance", label: "Distance" },
      { value: "consistency", label: "Consistency" },
      { value: "slice", label: "Slicing" },
      { value: "launch", label: "Launching the ball" },
      { value: "short-game", label: "Short game / wedges" },
      { value: "putting", label: "Putting" },
    ],
  },
  {
    id: "budget",
    prompt: "What's the right budget for the set?",
    helper: "We'll filter out clubs that don't fit your slot-by-slot price ceilings.",
    type: "single",
    options: [
      { value: "value", label: "Value-first", description: "Around $1,500 for the whole bag." },
      { value: "balanced", label: "Balanced", description: "Around $2,500 for a quality bag." },
      { value: "premium", label: "Premium", description: "Around $4,000+ — fitting and brand matter." },
      { value: "no-cap", label: "No real cap", description: "Find me the best, period." },
    ],
  },
  {
    id: "bag_pref",
    prompt: "Single brand or mixed bag?",
    type: "single",
    options: [
      { value: "one-brand", label: "Stay with one brand", description: "I want a coherent, single-brand setup." },
      { value: "mixed", label: "Mix the best in each category", description: "I want the best driver, irons, wedges, putter — even from different brands." },
    ],
  },
  {
    id: "frequency",
    prompt: "How often do you play?",
    type: "single",
    options: [
      { value: "weekly", label: "Weekly or more", description: "Serious about practice and play." },
      { value: "monthly", label: "A few times a month", description: "Active recreational." },
      { value: "casual", label: "Casual / occasional", description: "Outings and travel rounds." },
    ],
  },
  // Conditional: only ask when intent is specific-clubs
  {
    id: "focus_categories",
    prompt: "Which clubs are you most focused on?",
    helper: "We'll prioritize these in your bag recommendation.",
    type: "multi",
    options: [
      { value: "drivers", label: "Driver" },
      { value: "fairway-woods", label: "Fairway woods" },
      { value: "hybrids", label: "Hybrids / utility" },
      { value: "irons", label: "Irons" },
      { value: "wedges", label: "Wedges" },
      { value: "putters", label: "Putter" },
    ],
    conditional: (answers) => answers.intent === "specific-clubs",
  },
];
