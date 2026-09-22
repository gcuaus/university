import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import MarkdocContent from '../components/markdoc-content';
import Breadcrumbs from '../components/breadcrumbs';
import { breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const entries = await reader.collections.pages.all();
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
  const entry = await reader.collections.pages.read(slug);
  if (!entry || entry.status !== 'published') return {};
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/${slug}`,
  });
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await reader.collections.pages.read(slug);
  if (!entry || entry.status !== 'published') notFound();
  const content = await entry.content();

  return (
    <main className="directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: entry.title, path: `/${slug}` },
            ]),
          ),
        }}
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: entry.title }]} />
      <section className="directory-hero">
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
      </section>
      <MarkdocContent document={content} />
    </main>
  );
}