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

  const isGettingStarted = slug === 'getting-started';

  return (
    <main className={`directory-page${isGettingStarted ? ' getting-started-page' : ''}`}>
      <section className="directory-hero">
        <p className="eyebrow">{isGettingStarted ? 'Getting Started' : page?.detailEyebrow}</p>
        <h1>{isGettingStarted ? 'How to Enroll at Great Commission University of America' : entry.title}</h1>
        <p>{entry.summary}</p>
        <div className={`cms-prose${isGettingStarted ? ' enrollment-journey-content' : ''}`}>
          <DocumentRenderer document={await entry.content()} />
        </div>
      </section>
    </main>
  );
}
