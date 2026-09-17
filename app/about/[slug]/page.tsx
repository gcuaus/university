import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import MarkdocContent from '../../components/markdoc-content';
import Breadcrumbs from '../../components/breadcrumbs';
import { breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../../lib/seo';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const entries = await reader.collections.about.all();
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await reader.collections.about.read(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/about/${slug}`,
  });
}

export default async function AboutArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await reader.collections.about.read(slug);
  if (!entry) notFound();
  const content = await entry.content();

  return (
    <main className="directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: entry.title, path: `/about/${slug}` },
            ]),
          ),
        }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: entry.title },
        ]}
      />
      <section className="directory-hero">
        <p className="eyebrow">About GCTSA</p>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
      </section>
      <MarkdocContent document={content} />
    </main>
  );
}