import type { Metadata, Viewport } from "next";
import { Sono, Unbounded } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsWebVitals from "@/app/components/Analytics";
import SmoothScroll from "@/app/components/SmoothScroll";
import AnimationErrorBoundary from "@/app/components/AnimationErrorBoundary";
import FloatingNav from "@/app/components/FloatingNav";
import "./globals.css";

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-MQEHDZJNDE";
const analyticsEnabled =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_DISABLED !== "true";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-unbounded",
  display: "optional",
});

const sono = Sono({
  subsets: ["latin"],
  weight: "variable",
  axes: ["MONO"],
  variable: "--font-sono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist",
    template: "%s | Sayuru Akash Amarasinghe",
  },
  description:
    "Official portfolio of Sayuru Akash Amarasinghe, a full-stack developer, musical artist, designer, writer, investor, and Codezela Technologies founder in Colombo, Sri Lanka.",
  keywords: [
    "Sayuru Akash Amarasinghe",
    "サユル アーカーシュ",
    "Full-stack Developer",
    "Front End Developer",
    "Web Designer",
    "Musical Artist",
    "Content Writer",
    "Investor",
    "Codezela Technologies",
    "Sri Lanka",
    "Colombo",
    "Portfolio",
    "Software Engineering",
    "Plymouth University",
    "React",
    "Next.js",
    "TypeScript",
    "Music Production",
    "Content Creation",
  ],
  authors: [{ name: "Sayuru Akash Amarasinghe", url: "https://sayuru.me" }],
  creator: "Sayuru Akash Amarasinghe",
  publisher: "Sayuru Akash Amarasinghe",
  applicationName: "Sayuru Akash Amarasinghe",
  category: "portfolio",
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sayuru.me"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  openGraph: {
    title: "Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist",
    description:
      "Portfolio showcasing expertise in software development, music production, and entrepreneurship. CEO @ Codezela Technologies, BSc Software Engineering graduate from Plymouth University.",
    type: "website",
    locale: "en_US",
    url: "https://sayuru.me",
    siteName: "Sayuru Akash Amarasinghe Portfolio",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sayuru_akash",
    creator: "@sayuru_akash",
    title: "Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist",
    description:
      "Portfolio showcasing expertise in software development, music production, and entrepreneurship.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${sono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {/* NoScript message for users with JavaScript disabled */}
        <noscript>
          <div className="border-b border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm text-[var(--ink)]">
            <strong>JavaScript is disabled.</strong> The portfolio content
            remains available, but motion and copy interactions are reduced.
          </div>
        </noscript>

        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="ink-button sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>

        {/* Main content wrapper with semantic structure */}
        <div id="root" className="relative min-h-screen">
          <SmoothScroll>
            <main id="main-content" className="relative z-10">
              {children}
            </main>
          </SmoothScroll>
        </div>

        <AnimationErrorBoundary fallbackLabel="Floating Navigation">
          <FloatingNav />
        </AnimationErrorBoundary>

        {analyticsEnabled ? <AnalyticsWebVitals /> : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://sayuru.me/#website",
                  url: "https://sayuru.me/",
                  name: "Sayuru Akash Amarasinghe",
                  description:
                    "The official portfolio of Sayuru Akash Amarasinghe.",
                  inLanguage: "en-US",
                  publisher: { "@id": "https://sayuru.me/#sayuru" },
                },
                {
                  "@type": "Person",
                  "@id": "https://sayuru.me/#sayuru",
                  name: "Sayuru Akash Amarasinghe",
                  alternateName: ["Sayuru Akash", "サユル アーカーシュ"],
                  image:
                    "https://sayuru.me/images/portraits/sayuru-graduation.webp",
                  email: "mailto:contact@sayuru.me",
                  url: "https://sayuru.me/",
                  jobTitle: [
                    "Full-stack Developer",
                    "Musical Artist",
                    "Founder and CEO",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    name: "Codezela Technologies",
                    url: "https://codezela.com/",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Plymouth University",
                    address: {
                      "@type": "PostalAddress",
                      addressCountry: "GB",
                    },
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Colombo",
                    addressCountry: "LK",
                  },
                  sameAs: [
                    "https://github.com/sayuru-akash",
                    "https://linkedin.com/in/sayuruakash",
                    "https://facebook.com/sayuru.s",
                    "https://instagram.com/sayuru_akash",
                    "https://x.com/sayuru_akash",
                    "https://tiktok.com/@sayuru_akash",
                    "https://t.me/sayuruakash_channel",
                  ],
                  knowsAbout: [
                    "Software Development",
                    "Full-stack Development",
                    "Web Design",
                    "Music Production",
                    "Technical Writing",
                    "Entrepreneurship",
                    "Investment",
                  ],
                },
              ],
            }),
          }}
        />
      </body>
      {analyticsEnabled ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
