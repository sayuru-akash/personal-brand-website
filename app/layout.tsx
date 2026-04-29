import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Font configuration with display swap for performance
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

// Enhanced metadata for SEO and social sharing
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
    'Musical Artist',
    'Codezela Technologies',
    'Web Developer',
    'Start-up Founder',
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
    'Investment',
  ],
  authors: [{ name: 'Sayuru Akash Amarasinghe', url: 'https://sayuru.dev' }],
  creator: 'Sayuru Akash Amarasinghe',
  publisher: 'Sayuru Akash Amarasinghe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sayuru.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
    description: 'Portfolio showcasing expertise in software development, music production, and entrepreneurship. CEO @ Codezela Technologies, Software Engineering student at Plymouth University.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sayuru.dev',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${geistSans.className} antialiased bg-neutral-50 text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper with semantic structure */}
        <div id="root" className="relative min-h-screen">
          <main id="main-content" className="relative z-10">
            {children}
          </main>
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
              url: 'https://sayuru.dev',
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
