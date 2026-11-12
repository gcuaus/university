import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="site-footer-name" href="/">GCUA</Link>
      <span className="site-footer-university">Great Commission University of America</span>
      <span className="site-footer-copyright">© {new Date().getFullYear()} Great Commission University of America</span>
      <nav aria-label="Legal">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
      </nav>
    </footer>
  );
}
