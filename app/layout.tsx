import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hardstick — Search top golf stores in one place",
  description:
    "Hardstick is the premium golf gear search engine. Compare clubs, balls, bags, and shoes across trusted retailers, then click through to buy at the best price.",
  metadataBase: new URL("https://hardstick.com"),
  openGraph: {
    title: "Hardstick — Search top golf stores in one place",
    description:
      "Compare clubs, balls, bags, and shoes across trusted retailers. Shop smarter, not harder.",
    url: "https://hardstick.com",
    siteName: "Hardstick",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          ["--font-sans" as string]: GeistSans.style.fontFamily,
          ["--font-mono" as string]: GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className="min-h-screen bg-ink-950 text-bone-50 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
