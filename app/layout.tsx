import type { Metadata } from 'next';
import LanguageProvider from './components/language-provider';
import SiteHeader from './components/site-header';
import SiteFooter from './components/site-footer';
import './globals.css';
import './academy-nav.css';
import './reference-pages.css';

export const metadata: Metadata = {
  title: 'GCUA | Great Commission University of America',
  description: 'GCUA Great Commission University of America',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><LanguageProvider><SiteHeader />{children}</LanguageProvider><SiteFooter /></body>
    </html>
  );
}