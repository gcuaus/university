import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import config from '../../../keystatic.config';
import '../../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function AboutDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [entry, page] = await Promise.all([
    reader.collections.about.read(slug),
    reader.singletons.aboutPage.read(),
  ]);
  if (!entry) notFound();

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">{page?.detailEyebrow}</p>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        <div className="cms-prose"><DocumentRenderer document={await entry.content()} /></div>
      </section>
    </main>
  );
}
