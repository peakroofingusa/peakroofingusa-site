import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Peak Roofing USA — Trusted Roofing Contractors',
  description: 'Free roof inspection. Licensed, insured, and trusted by thousands of homeowners. Residential and commercial roofing across the USA.',
  openGraph: {
    title: 'Peak Roofing USA',
    description: 'Trusted roofing contractors. Free inspection. Licensed & insured.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TLC51W729X"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TLC51W729X');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
