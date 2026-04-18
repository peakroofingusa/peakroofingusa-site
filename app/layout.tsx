import type { Metadata } from 'next';
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
      </head>
      <body>{children}</body>
    </html>
  );
}
