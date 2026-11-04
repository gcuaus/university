import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import config from '../../../keystatic.config';
import '../../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [entry, page] = await Promise.all([
    reader.collections.programs.read(slug),
    reader.singletons.programsPage.read(),
  ]);
  if (!entry) notFound();

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">{entry.category}</p>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        {entry.duration && <p>{entry.duration}</p>}
        <div className="cms-prose"><DocumentRenderer document={await entry.content()} /></div>
        <Link className="under-link" href="/programs">{page?.detailBackLabel} <span>↗</span></Link>
      </section>
    </main>
  );
}
