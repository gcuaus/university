import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import MarkdocContent from '../../components/markdoc-content';
import Breadcrumbs from '../../components/breadcrumbs';
import { formatDate } from '../../lib/format';
import { SITE_NAME, breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../../lib/seo';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const entries = await reader.collections.posts.all();
  return entries
    .filter(({ entry }) => entry.status === 'published')
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.status !== 'published') return {};
  return {
    ...pageMetadata({
      title: entry.title,
      description: entry.excerpt ?? `${entry.title} — ${SITE_NAME} news article.`,
      path: `/blog/${slug}`,
    }),
    openGraph: {
      title: entry.title,
      description: entry.excerpt ?? undefined,
      url: `/blog/${slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: entry.publishedAt ?? undefined,
      authors: entry.author ? [entry.author] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.status !== 'published') notFound();
  const content = await entry.content();
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.excerpt ?? undefined,
    datePublished: entry.publishedAt ?? undefined,
    author: entry.author ? { '@type': 'Person', name: entry.author } : undefined,
    mainEntityOfPage: `/blog/${slug}`,
  };

  return (
    <main className="directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'News', path: '/blog' },
              { name: entry.title, path: `/blog/${slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(article) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/blog' },
          { label: entry.title },
        ]}
      />
      <section className="directory-hero">
        <p className="eyebrow">News</p>
        <h1>{entry.title}</h1>
        <p>
          {formatDate(entry.publishedAt)}
          {entry.publishedAt && entry.author ? ' · ' : ''}
          {entry.author}
        </p>
      </section>
      <MarkdocContent document={content} />
    </main>
  );
}