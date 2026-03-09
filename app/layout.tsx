import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sayuru Akash — サユル アーカーシュ",
  description:
    "Musical Artist, Frontend Developer, Web Designer, Content Writer & Investor based in Sri Lanka. Building digital experiences with precision and soul.",
  keywords: [
    "Sayuru Akash",
    "Frontend Developer",
    "Web Designer",
    "Musical Artist",
    "Sri Lanka",
    "Software Engineer",
  ],
  authors: [{ name: "Sayuru Akash" }],
  openGraph: {
    title: "Sayuru Akash — サユル アーカーシュ",
    description:
      "Musical Artist, Frontend Developer, Web Designer & Investor. Building digital experiences with precision and soul.",
    url: "https://sayuru.me",
    siteName: "Sayuru Akash",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayuru Akash — サユル アーカーシュ",
    description: "Musical Artist, Frontend Developer, Web Designer & Investor.",
    creator: "@sayuru_akash",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} font-[family-name:var(--font-manrope)] antialiased bg-bg text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
