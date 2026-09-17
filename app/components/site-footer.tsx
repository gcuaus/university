import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import FloatingWhatsApp from './floating-whatsapp';

export default function SiteFooter() {
  return (
    <>
      <footer><div><span className="seal small">G</span><p>Great Commission Theological Seminary of America<br />Truthful study. Faithful service.</p></div><span className="footer-admin"><Link href="/keystatic">Content manager</Link> · © 2026 GCTSA</span><span className="footer-theme-toggle"><ThemeToggle /></span></footer>
      <FloatingWhatsApp />
    </>
  );
}
