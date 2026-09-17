import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">Page not found</p>
        <h1>This page seems to be missing.</h1>
        <p>The page you are looking for does not exist or may have moved.</p>
      </section>
      <div className="empty-state">
        <Link className="button gold" href="/">Return home <span>↗</span></Link>
      </div>
    </main>
  );
}
