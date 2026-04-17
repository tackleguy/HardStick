import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-6 py-24 lg:px-10">
      <div className="label-mono">404</div>
      <h1 className="mt-3 text-[38px] font-medium leading-[1.06] tracking-tightest text-bone-50 md:text-[48px]">
        That page is off the fairway.
      </h1>
      <p className="mt-4 text-[14.5px] leading-relaxed text-bone-300">
        We couldn&apos;t find what you were looking for. Try a search or head back to one of the main categories.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/category/drivers" className="btn-ghost">Browse drivers</Link>
      </div>
    </div>
  );
}
