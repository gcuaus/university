import Link from 'next/link';
import type { Metadata } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import { pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

export const metadata: Metadata = pageMetadata({
  title: 'Location',
  description: 'Find your way to GCUA - location, address, and directions.',
  path: '/location',
});

export default async function LocationPage() {
  const locations = await reader.collections.location.all();

  return (
    <main className="directory-page location-page">

      <section className="directory-hero">
        <p className="eyebrow">Come and see</p>
        <h1>Find your way to GCUA.</h1>
        <p>Visit our campus, meet our community, and see where theological education comes to life.</p>
      </section>

      <section className="location-layout">
        {locations.map(({ slug, entry }) => {
          const telHref = entry.phone ? `tel:${entry.phone.replace(/[^\d+]/g, '')}` : '';

          return (
            <article className="location-card" key={slug}>
              <div className="location-copy">
                <span className="card-index">LOCATION</span>
                <h2>{entry.title}</h2>
                <p className="address">{entry.address}</p>

                {entry.phone && (
                  <p className="location-contact">
                    <strong>Phone</strong>
                    <a href={telHref}>{entry.phone}</a>
                  </p>
                )}

                {entry.hours && <p className="location-hours">{entry.hours}</p>}

                <div className="location-actions">
                  {entry.mapUrl && (
                    <a href={entry.mapUrl} target="_blank" rel="noreferrer">
                      Open in Google Maps <span>↗</span>
                    </a>
                  )}
                  {entry.directionsUrl && (
                    <a href={entry.directionsUrl} target="_blank" rel="noreferrer">
                      Get directions <span>↗</span>
                    </a>
                  )}
                  <Link href="/#evaluation" className="button location-button">
                    Free evaluation
                  </Link>
                </div>
              </div>

              {entry.mapEmbedUrl && (
                <div className="location-map-wrap">
                  <iframe
                    src={entry.mapEmbedUrl}
                    title={`${entry.title} map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              )}
            </article>
          );
        })}
      </section>

      {locations.length === 0 && <p className="empty-state">Locations will appear here once they are added in Keystatic.</p>}
    </main>
  );
}