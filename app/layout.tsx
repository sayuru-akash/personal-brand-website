import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
  description: 'Portfolio of Sayuru Akash Amarasinghe - Full-stack Developer, Start-up Founder, Musical Artist, and CEO @ Codezela Technologies from Colombo, Sri Lanka.',
  keywords: [
    'Sayuru Akash',
    'Full-stack Developer',
    'Musical Artist',
    'Codezela Technologies',
    'Web Developer',
    'Sri Lanka',
    'Portfolio',
  ],
  authors: [{ name: 'Sayuru Akash Amarasinghe' }],
  openGraph: {
    title: 'Sayuru Akash Amarasinghe | Full-stack Developer & Musical Artist',
    description: 'Portfolio showcasing expertise in software development, music production, and entrepreneurship.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
