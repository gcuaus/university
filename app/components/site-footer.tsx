import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import FloatingWhatsApp from './floating-whatsapp';
import { getHome } from '../lib/home';

export default async function SiteFooter({ logo }: { logo?: string | null }) {
  const home = await getHome();
  return (
    <>
      <footer>
        <div>{logo ? <img className="footer-logo" src={logo} alt="GCUA logo" /> : <span className="seal small">G</span>}<p>{home.footerText}</p></div>
        <span className="footer-admin"><Link href="/keystatic">Content manager</Link> · © 2026 GCUA</span>
        <span className="footer-theme-toggle"><ThemeToggle /></span>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}
