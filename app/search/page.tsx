import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search — Hardstick",
  description: "Search golf gear across our partner retailers.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1440px] px-6 py-16 text-bone-300 lg:px-10">Loading results…</div>}>
      <SearchClient />
    </Suspense>
  );
}
