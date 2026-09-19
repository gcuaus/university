import type { Metadata } from 'next';
import { DM_Mono, DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import './site-content.css';
import './navigation-footer.css';
import SiteNavigation from './components/site-navigation';
import SiteFooter from './components/site-footer';
import { getHome } from './lib/home';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, jsonLdHtml, organizationJsonLd } from './lib/seo';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Great Commission University of America`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Great Commission University of America`,
    description: SITE_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Great Commission University of America`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const home = await getHome();
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(organizationJsonLd()) }}
        />
        <SiteNavigation
          labels={{
            about: home.navAbout,
            programs: home.navPrograms,
            faculty: home.navFaculty,
            location: home.navLocation,
            tuition: home.navTuition,
            news: home.navNews,
            contact: home.navContact,
            apply: home.navApply,
          }}
        />
        <div id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}