import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export default async function LocationPage() {
  const [page, locations] = await Promise.all([
    reader.singletons.locationPage.read(),
    reader.collections.location.all(),
  ]);
  return (
    <main className="directory-page">
      <section className="directory-hero"><p className="eyebrow">{page?.heroEyebrow}</p><h1>{page?.heroTitle}</h1><p>{page?.heroDescription}</p></section>
      <section className="directory-grid">{locations.map(({ slug, entry }) => <article className="directory-card" key={slug}><span className="card-index">{page?.locationLabel}</span><h2>{entry.title}</h2><p className="address">{entry.address}</p><p>{entry.hours}</p>{entry.directionsUrl && <a href={entry.directionsUrl} target="_blank" rel="noreferrer">{page?.directionsLabel} <span>↗</span></a>}</article>)}</section>
      {page?.mapEmbedUrl && <div className="location-map-wrap"><iframe className="location-map" title={page.mapTitle} src={page.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>}
      {locations.length === 0 && <p className="empty-state">{page?.emptyMessage}</p>}
    </main>
  );
}