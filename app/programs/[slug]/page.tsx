import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import MarkdocContent from '../../components/markdoc-content';
import Breadcrumbs from '../../components/breadcrumbs';
import { breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../../lib/seo';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const entries = await reader.collections.programs.all();
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await reader.collections.programs.read(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/programs/${slug}`,
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await reader.collections.programs.read(slug);
  if (!entry) notFound();
  const content = await entry.content();
  const meta = [entry.programType, entry.level, entry.duration].filter(Boolean).join(' · ');

  return (
    <main className="directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Programs', path: '/programs' },
              { name: entry.title, path: `/programs/${slug}` },
            ]),
          ),
        }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: entry.title },
        ]}
      />
      <section className="directory-hero">
        <p className="eyebrow">{entry.programType || 'Program'}</p>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
      </section>
      <div className="program-detail-bar">
        {meta && <p className="program-detail-meta">{meta}</p>}
        {entry.curriculumUrl && (
          <a className="under-link" href={entry.curriculumUrl} target="_blank" rel="noreferrer">
            View curriculum <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <MarkdocContent document={content} />
    </main>
  );
}