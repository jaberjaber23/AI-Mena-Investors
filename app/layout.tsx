import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Header from '../components/Header';

let title = 'MENA AI Angels';
let description = 'Empowering AI Startups Across MENA';
let url = 'https://angels.jaber.blog/';  // Update this to your actual website URL
let sitename = 'MENA AI Angels';


export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 px-6 lg:px-8">
          <div className="mx-auto max-w-6xl pt-4">
            <Header />
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
