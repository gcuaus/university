import type { Metadata } from 'next';
import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import { formatDate } from '../lib/format';
import { pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

export const metadata: Metadata = pageMetadata({
  title: 'News',
  description: 'News, updates, and articles from GCUA.',
  path: '/blog',
});

export default async function BlogPage() {
  const entries = await reader.collections.posts.all();
  const posts = entries
    .filter(({ entry }) => entry.status === 'published')
    .sort((a, b) => (b.entry.publishedAt ?? '').localeCompare(a.entry.publishedAt ?? ''));

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">News &amp; articles</p>
        <h1>From the seminary.</h1>
        <p>Updates, reflections, and stories from the GCUA community.</p>
      </section>
      <section className="directory-grid">
        {posts.map(({ slug, entry }) => (
          <article className="directory-card" key={slug}>
            <span className="card-index">NEWS</span>
            <h2>{entry.title}</h2>
            <p className="card-meta">
              {formatDate(entry.publishedAt)}
              {entry.publishedAt && entry.author ? ' · ' : ''}
              {entry.author}
            </p>
            {entry.excerpt && <p>{entry.excerpt}</p>}
            <Link href={`/blog/${slug}`}>Read article <span>↗</span></Link>
          </article>
        ))}
      </section>
      {posts.length === 0 && (
        <p className="empty-state">Published articles will appear here once they are added in Keystatic.</p>
      )}
    </main>
  );
}