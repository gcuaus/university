import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import MarkdocContent from '../../components/markdoc-content';
import Breadcrumbs from '../../components/breadcrumbs';
import { breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../../lib/seo';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const entries = await reader.collections.faculty.all();
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await reader.collections.faculty.read(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.name,
    description: `${entry.name} — ${entry.role} at GCTSA.`,
    path: `/faculty/${slug}`,
  });
}

export default async function FacultyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await reader.collections.faculty.read(slug);
  if (!entry) notFound();
  const bio = await entry.bio();
  const portrait = entry.photoUrl ?? entry.photo ?? null;

  return (
    <main className="directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Faculty', path: '/faculty' },
              { name: entry.name, path: `/faculty/${slug}` },
            ]),
          ),
        }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Faculty', href: '/faculty' },
          { label: entry.name },
        ]}
      />
      <section className="directory-hero">
        <p className="eyebrow">{entry.role}</p>
        <h1>{entry.name}</h1>
      </section>
      {portrait && (
        <div className="faculty-detail-portrait-wrap">
          <img className="faculty-detail-portrait" src={portrait} alt={entry.name} />
        </div>
      )}
      <MarkdocContent document={bio} />
    </main>
  );
}