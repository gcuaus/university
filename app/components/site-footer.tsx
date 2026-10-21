import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import LanguageSwitcher from './language-switcher';
import FloatingWhatsApp from './floating-whatsapp';
import { getHome } from '../lib/home';

export default async function SiteFooter({ logo, locale = 'en' }: { logo?: string | null; locale?: 'en' | 'id' }) {
  const home = await getHome();
  return (
    <>
      <footer>
        <div>{logo ? <img className="footer-logo" src={logo} alt={`${home.brand} logo`} /> : <span className="seal small">G</span>}<p>{locale === 'id' ? 'Great Commission University of America\nBelajar dengan benar. Melayani dengan setia.' : home.footerText}</p></div>
        <span className="footer-admin"><Link href="/keystatic">{locale === 'id' ? 'Pengelola konten' : 'Content manager'}</Link> · © 2026 {home.brand}</span>
        <span className="footer-theme-toggle"><LanguageSwitcher /><ThemeToggle /></span>
        <FloatingWhatsApp number={home.whatsappNumber} />
      </footer>
    </>
  );
}
