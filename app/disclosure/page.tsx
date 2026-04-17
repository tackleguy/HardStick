import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const CONTAINER = "mx-auto max-w-[1040px] px-6 lg:px-10";

export const metadata = {
  title: "Affiliate disclosure — Hardstick",
  description: "How Hardstick makes money and how we maintain editorial independence.",
};

export default function DisclosurePage() {
  return (
    <div className="pb-20">
      <section className={`${CONTAINER} pt-16 pb-8`}>
        <div className="label-mono">Trust & disclosure</div>
        <h1 className="mt-3 text-[40px] font-medium leading-[1.05] tracking-tightest text-bone-50 md:text-[52px]">
          How we make money — and keep it honest.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-bone-300">
          Hardstick is a reader-supported golf gear search engine. This page explains exactly how our business model works, what that means for you, and how we protect editorial independence.
        </p>
      </section>

      <section className={`${CONTAINER} prose-hardstick space-y-10`}>
        <Block id="affiliate" title="We earn commissions">
          <p>
            When you click an outbound link on Hardstick and buy at a partner retailer, we may earn a small commission. That commission varies by retailer and program — we aim for up to 10% where partner terms allow, but many programs are lower.
          </p>
          <p>
            You never pay more by clicking through Hardstick. Prices are set by the retailer, not by us.
          </p>
        </Block>

        <Block id="editorial" title="Editorial independence">
          <p>
            Our rankings, editor picks, and buying guides are decided independently of commission rates. We will not rank a product higher because a retailer pays more. If two products perform the same, we say so.
          </p>
          <p>
            Partner relationships are disclosed clearly throughout the site, not buried. Every product page includes a disclosure block, and every click-out opens in a new tab so you never lose your place.
          </p>
        </Block>

        <Block id="accuracy" title="Price & availability">
          <p>
            Pricing and stock information on Hardstick is provided by our retail partners and refreshed frequently, but it is not guaranteed. Retailers can change price, shipping, or stock at any time — and sale pricing can expire between the time we fetch it and the time you click through.
          </p>
          <p>
            Always verify the price and terms at the retailer before completing checkout. If you spot a stale price or a broken link, email us at{" "}
            <a href="mailto:hello@hardstick.com" className="text-bone-50 underline">hello@hardstick.com</a>.
          </p>
        </Block>

        <Block id="retailers" title="Who we partner with">
          <p>
            Hardstick works with established golf retailers in good standing — names like PGA Tour Superstore, Golf Galaxy, Worldwide Golf Shops, Global Golf, Fairway Jockey, and 2nd Swing Golf. Each partner provides product feed data, affiliate commission, a cookie window that determines how long we&apos;re credited after a click, and trust terms we pass through to you.
          </p>
        </Block>

        <Block id="cookies" title="Cookies and tracking">
          <p>
            Clicking an outbound affiliate link may set a cookie on your device, owned by the retailer or the affiliate network, that tells the retailer you came from Hardstick. We don&apos;t sell your information and we don&apos;t use retargeting that follows you across the web.
          </p>
        </Block>

        <Block id="contact" title="Questions or corrections">
          <p>
            If any of this is unclear or you have a correction, reach us at{" "}
            <a href="mailto:hello@hardstick.com" className="text-bone-50 underline">hello@hardstick.com</a>.
            For a plain-English summary, see{" "}
            <Link href="/about" className="text-bone-50 underline">How it works</Link>.
          </p>
        </Block>
      </section>

      <section className={`${CONTAINER} mt-16`}>
        <AffiliateDisclosure variant="block" />
      </section>
    </div>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-[22px] font-medium leading-tight tracking-tight text-bone-50 md:text-[26px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-bone-200">
        {children}
      </div>
    </div>
  );
}
