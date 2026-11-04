import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import config from '../../../keystatic.config';
import '../../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function FacultyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [entry, page] = await Promise.all([
    reader.collections.faculty.read(slug),
    reader.singletons.facultyPage.read(),
  ]);
  if (!entry) notFound();

  return (
    <main className="directory-page">
      <section className="directory-hero">
        {entry.photoUrl && <img className="faculty-profile-portrait" src={entry.photoUrl} alt={entry.name} />}
        <p className="eyebrow">{page?.detailEyebrow}</p>
        <h1>{entry.name}</h1>
        {entry.summary && <p>{entry.summary}</p>}
        {entry.externalLinkUrl && entry.externalLinkLabel && <p><a className="under-link" href={entry.externalLinkUrl} target="_blank" rel="noreferrer">{entry.externalLinkLabel} <span>↗</span></a></p>}
        <div className="cms-prose"><DocumentRenderer document={await entry.bio()} /></div>
        <Link className="under-link" href="/faculty">{page?.detailBackLabel} <span>↗</span></Link>
      </section>
    </main>
  );
}
