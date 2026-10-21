import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export default async function LocationPage() {
  const locations = await reader.collections.location.all();
  return (
    <main className="directory-page">
      <section className="directory-hero"><p className="eyebrow">Come and see</p><h1>Find your way to GCUA.</h1><p>Visit Great Commission University of America in Brooksville, Florida.</p></section>
      <section className="directory-grid">{locations.map(({ slug, entry }) => <article className="directory-card" key={slug}><span className="card-index">LOCATION</span><h2>{entry.title}</h2><p className="address">{entry.address}</p><p>{entry.hours}</p>{entry.directionsUrl && <a href={entry.directionsUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a>}</article>)}</section>
      <div className="location-map-wrap"><iframe className="location-map" title="Map to Great Commission University of America" src="https://www.google.com/maps?q=15151+Eastwood+Trail+Brooksville+FL+34604&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      {locations.length === 0 && <p className="empty-state">Locations will appear here once they are added in Keystatic.</p>}
    </main>
  );
}