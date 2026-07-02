import type { Metadata, Viewport } from 'next';
import { M_PLUS_1_Code, Unbounded, Zen_Kaku_Gothic_New } from 'next/font/google';
import SmoothScroll from '@/app/components/SmoothScroll';
import './globals.css';

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-unbounded',
  display: 'swap',
});

const mPlusCode = M_PLUS_1_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-m-plus-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
    template: '%s | Sayuru Akash Amarasinghe',
  },
  description: 'Portfolio of Sayuru Akash Amarasinghe (サユル アーカーシュ) - Full-stack Developer, Start-up Founder, Musical Artist, and CEO @ Codezela Technologies from Colombo, Sri Lanka. Showcasing expertise in software development, music production, and entrepreneurship.',
  keywords: [
    'Sayuru Akash Amarasinghe',
    'サユル アーカーシュ',
    'Full-stack Developer',
    'Front End Developer',
    'Web Designer',
    'Musical Artist',
    'Content Writer',
    'Investor',
    'Codezela Technologies',
    'Sri Lanka',
    'Colombo',
    'Portfolio',
    'Software Engineering',
    'Plymouth University',
    'React',
    'Next.js',
    'TypeScript',
    'Music Production',
    'Content Creation',
  ],
  authors: [{ name: 'Sayuru Akash Amarasinghe', url: 'https://sayuru.me' }],
  creator: 'Sayuru Akash Amarasinghe',
  publisher: 'Sayuru Akash Amarasinghe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sayuru.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
    description: 'Portfolio showcasing expertise in software development, music production, and entrepreneurship. CEO @ Codezela Technologies, BSc Software Engineering graduate from Plymouth University.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sayuru.me',
    siteName: 'Sayuru Akash Amarasinghe Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sayuru Akash Amarasinghe - Full-stack Developer & Musical Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
    description: 'Portfolio showcasing expertise in software development, music production, and entrepreneurship.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#ffffff' },
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
      className={`${zenKaku.variable} ${unbounded.variable} ${mPlusCode.variable}`}
    >
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {/* NoScript message for users with JavaScript disabled */}
        <noscript>
          <div className="border-b border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm text-[var(--ink)]">
            <strong>JavaScript is disabled.</strong> The portfolio content remains available, but motion and copy interactions are reduced.
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
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sayuru Akash Amarasinghe',
              alternateName: 'サユル アーカーシュ',
              jobTitle: ['Full-stack Developer', 'Musical Artist', 'CEO'],
              worksFor: {
                '@type': 'Organization',
                name: 'Codezela Technologies',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Plymouth University',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'UK',
                },
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Colombo',
                addressCountry: 'Sri Lanka',
              },
              url: 'https://sayuru.me',
              sameAs: [
                'https://github.com/sayuru-akash',
                'https://linkedin.com/in/sayuru-akash',
                'https://twitter.com/sayuru_akash',
              ],
              knowsAbout: [
                'Software Development',
                'Full-stack Development',
                'Music Production',
                'Content Creation',
                'Entrepreneurship',
                'Investment',
                'Web Design',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
