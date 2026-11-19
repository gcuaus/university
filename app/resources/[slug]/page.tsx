import type { Metadata } from 'next';
import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import config from '../../../keystatic.config';
import ResourcesShareLinks from '../../components/resources-share-links';
import '../../site-content.css';

const reader = createReader(process.cwd(), config);

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await reader.collections.resources.read(slug);
  if (!resource || resource.status !== 'published') return {};

  return {
    title: `${resource.title} | GCUA Resources`,
    description: resource.excerpt,
    openGraph: {
      type: 'article',
      title: resource.title,
      description: resource.excerpt,
      publishedTime: resource.publishedAt || undefined,
      authors: [resource.author],
      url: `/resources/${slug}`,
    },
  };
}

export default async function ResourceArticlePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await reader.collections.resources.read(slug);
  if (!resource || resource.status !== 'published') notFound();

  return (
    <main className="directory-page resource-article-page">
      <article className="resource-article">
        <header className="resource-article-header">
          <Link className="resource-back-link" href="/resources">← All resources</Link>
          {resource.publishedAt && <p className="eyebrow">{resource.publishedAt}</p>}
          <h1>{resource.title}</h1>
          <p className="resource-article-byline">By {resource.author}</p>
          {resource.excerpt && <p className="resource-article-excerpt">{resource.excerpt}</p>}
        </header>
        <div className="cms-prose resource-article-body">
          <DocumentRenderer document={await resource.content()} />
        </div>
        <ResourcesShareLinks title={resource.title} />
      </article>
    </main>
  );
}
