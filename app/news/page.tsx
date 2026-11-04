import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function NewsPage() {
  const [page, posts] = await Promise.all([
    reader.singletons.newsPage.read(),
    reader.collections.posts.all(),
  ]);
  const publishedPosts = posts
    .filter(({ entry }) => entry.status === 'published')
    .sort((a, b) => (b.entry.publishedAt ?? '').localeCompare(a.entry.publishedAt ?? ''));

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      {publishedPosts.length > 0 ? (
        <section className="directory-grid">
          {publishedPosts.map(({ slug, entry }) => (
            <article className="directory-card" key={slug}>
              {entry.publishedAt && <span className="card-index">{entry.publishedAt}</span>}
              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
              <p className="card-meta">{page?.authorPrefix} {entry.author}</p>
              <Link href={`/news/${slug}`}>{page?.readMoreLabel} <span>↗</span></Link>
            </article>
          ))}
        </section>
      ) : (
        <p className="empty-state">{page?.emptyMessage}</p>
      )}
    </main>
  );
}
