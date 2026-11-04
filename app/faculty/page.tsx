import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function FacultyPage() {
  const [page, faculty] = await Promise.all([
    reader.singletons.facultyPage.read(),
    reader.collections.faculty.all(),
  ]);
  return (
    <main className="directory-page">
      <section className="directory-hero"><p className="eyebrow">{page?.heroEyebrow}</p><h1>{page?.heroTitle}</h1><p>{page?.heroDescription}</p></section>
      <section className="directory-grid">{faculty.map(({ slug, entry }) => <article className="directory-card faculty-card" key={slug}>{entry.photoUrl && <Link className="faculty-portrait-link" href={`/faculty/${slug}`} aria-label={`View ${entry.name} profile`}><img className="faculty-portrait" src={entry.photoUrl} alt={entry.name} /></Link>}<span className="card-index">{page?.cardCategory}</span><h2>{entry.name}</h2><p className="card-meta">{entry.role}</p><p>{entry.summary || page?.cardDescription}</p>{entry.externalLinkUrl && entry.externalLinkLabel && <a href={entry.externalLinkUrl} target="_blank" rel="noreferrer">{entry.externalLinkLabel} <span>↗</span></a>}<Link href={`/faculty/${slug}`}>{page?.cardLinkLabel} <span>↗</span></Link></article>)}</section>
    </main>
  );
}