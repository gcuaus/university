import type { Metadata, Viewport } from 'next';
import LanguageProvider from './components/language-provider';
import SiteHeader from './components/site-header';
import SiteFooter from './components/site-footer';
import './globals.css';
import './academy-nav.css';
import './reference-pages.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gcua.us'),
  title: 'GCUA | Great Commission University of America',
  description: 'Great Commission University of America provides Christ-centered, Bible-based, Spirit-empowered academic and ministry education.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Great Commission University of America',
    title: 'GCUA | Great Commission University of America',
    description: 'Christ-centered, Bible-based, and Spirit-empowered education for Christian leaders and ministry preparation.',
    images: [
      {
        url: '/logo-assets/logo.png',
        width: 800,
        height: 800,
        alt: 'Great Commission University of America logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'GCUA | Great Commission University of America',
    description: 'Christ-centered, Bible-based, and Spirit-empowered education for Christian leaders and ministry preparation.',
    images: ['/logo-assets/logo.png'],
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" data-theme="light">
      <body><LanguageProvider><SiteHeader />{children}</LanguageProvider><SiteFooter /></body>
    </html>
  );
}