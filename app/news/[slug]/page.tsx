import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import config from '../../../keystatic.config';
import '../../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [entry, page] = await Promise.all([
    reader.collections.posts.read(slug),
    reader.singletons.newsPage.read(),
  ]);
  if (!entry || entry.status !== 'published') notFound();

  return (
    <main className="directory-page">
      <section className="directory-hero">
        {entry.publishedAt && <p className="eyebrow">{entry.publishedAt}</p>}
        <h1>{entry.title}</h1>
        <p>{entry.author}</p>
        {entry.excerpt && <p>{entry.excerpt}</p>}
        <div className="cms-prose"><DocumentRenderer document={await entry.content()} /></div>
        <Link className="under-link" href="/news">{page?.detailBackLabel} <span>↗</span></Link>
      </section>
    </main>
  );
}
