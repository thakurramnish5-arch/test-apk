import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { ChatAssistant } from "@/components/shared/ChatAssistant";
import { PwaInit } from "@/components/shared/InstallAppButton";
import { siteConfig } from "@/config/site";
import { siteSchema } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/** Fallbacks for routes without their own metadata (404, error). Pages set theirs via pageMetadata(). */
const defaultTitle = `${siteConfig.brand.name} | Salooni Taxi, Cab & Vehicle Booking, Chamba`;
const defaultDescription =
  "Car, bus, pickup, truck, tractor or JCB on hire in Salooni, Chamba — with experienced drivers and fair, upfront rates.";

export const viewport: Viewport = {
  themeColor: "#1f5f4e",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.brand.name,
  /** iPhone "Add to Home Screen": open full-screen like an app, with the short name under the icon. */
  appleWebApp: {
    capable: true,
    title: siteConfig.brand.shortName,
    statusBarStyle: "default",
  },
  keywords: [
    "Salooni Transport Hub",
    "taxi in Salooni",
    "car booking Salooni",
    "vehicle on hire Salooni Chamba",
    "Salooni to Pathankot taxi",
    "Salooni to Chamba taxi",
    "bus booking for wedding Salooni",
    "pickup and truck on hire Chamba",
    "JCB on rent Salooni",
    "tractor on hire Chamba",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  // No canonical here: it would be inherited by the 404 page and point it at
  // the homepage. Each page sets its own canonical via pageMetadata().
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.brand.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  // Pages are indexable by default; only the preview size is set, so the
  // 404 page's automatic "noindex" is not contradicted by an "index" tag.
  robots: {
    googleBot: { "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${jakarta.variable} antialiased`}>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">{children}</main>

        <Footer />
        {/* Clears the mobile sticky action bar so it never hides the footer */}
        <div
          className="h-[calc(68px+env(safe-area-inset-bottom))] bg-charcoal-950 lg:hidden"
          aria-hidden="true"
        />
        <MobileBottomBar />
        <ChatAssistant />
        <PwaInit />

        {/* LocalBusiness + WebSite structured data — factual details only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchema),
          }}
        />
      </body>
    </html>
  );
}
