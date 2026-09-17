import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../navigation-footer.css';

const reader = createReader(process.cwd(), config);

export default async function LocationPage() {
  const locations = await reader.collections.location.all();
  return (
    <main className="directory-page">
      <header className="directory-header"><Link href="/" className="back-link">GCTSA <span>↗</span></Link><Link href="/keystatic" className="admin-link">Edit</Link></header>
      <section className="directory-hero"><p className="eyebrow">Come and see</p><h1>Find your way to GCTSA.</h1><p>Visit our campus, meet our community, and see where theological education comes to life.</p></section>
      <section className="directory-grid">{locations.map(({ slug, entry }) => <article className="directory-card" key={slug}><span className="card-index">LOCATION</span><h2>{entry.title}</h2><p className="address">{entry.address}</p><p>{entry.hours}</p>{entry.directionsUrl && <a href={entry.directionsUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a>}</article>)}</section>
      {locations.length === 0 && <p className="empty-state">Locations will appear here once they are added in Keystatic.</p>}
    </main>
  );
}