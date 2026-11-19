import Image from 'next/image';
import Link from 'next/link';
import './site-content.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <Image
          className="not-found-logo"
          src="/logo-assets/logo%20gcua.png"
          alt="Great Commission University of America"
          width={96}
          height={96}
          priority
        />
        <p className="not-found-code">404 · Page not found</p>
        <h1 id="not-found-title">This page isn’t here.</h1>
        <p className="not-found-copy">
          The link may be outdated, or the page may have moved. Let’s help you find your way.
        </p>
        <div className="not-found-actions">
          <Link className="button gold" href="/">Return home</Link>
          <Link className="not-found-contact" href="/contact">Contact GCUA <span>↗</span></Link>
        </div>
      </section>
    </main>
  );
}
