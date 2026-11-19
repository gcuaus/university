import Link from 'next/link';
import Image from 'next/image';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function ResourcesPage() {
  const resources = await reader.collections.resources.all();
  const publishedResources = resources
    .filter(({ entry }) => entry.status === 'published')
    .sort((left, right) =>
      (right.entry.publishedAt ?? '').localeCompare(left.entry.publishedAt ?? '')
    );

  return (
    <main className="directory-page resources-page">
      <section className="directory-hero resources-hero">
        <p className="eyebrow">Articles &amp; Insights</p>
        <h1>Resources for your calling.</h1>
        <p>Read reflections, guidance, and updates to support your studies and ministry.</p>
      </section>
      {publishedResources.length ? (
        <section className="directory-grid resources-grid" aria-label="Published resources">
          {publishedResources.map(({ slug, entry }) => (
            <Link
              className="directory-card resources-card"
              href={`/resources/${slug}`}
              key={slug}
            >
              {entry.publishedAt && <span className="card-index">{entry.publishedAt}</span>}
              <h2>{entry.title}</h2>
              <Image
                className="resources-card-image"
                src={entry.imageUrl}
                alt={entry.imageAlt}
                width={1200}
                height={675}
                unoptimized
              />
              {entry.excerpt && <p>{entry.excerpt}</p>}
              <p className="card-meta">By {entry.author}</p>
              <span className="resources-card-link">Read article <span>↗</span></span>
            </Link>
          ))}
        </section>
      ) : (
        <p className="empty-state">No published resources yet. Check back soon.</p>
      )}
    </main>
  );
}
