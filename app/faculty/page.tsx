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
      <section className="directory-grid">{faculty.map(({ slug, entry }) => <article className="directory-card faculty-card" key={slug}>{entry.photoUrl && <img className="faculty-portrait" src={entry.photoUrl} alt={entry.name} />}<span className="card-index">{page?.cardCategory}</span><h2>{entry.name}</h2><p className="card-meta">{entry.role}</p><p>{entry.summary || page?.cardDescription}</p><Link href={`/faculty/${slug}`}>{page?.cardLinkLabel} <span>↗</span></Link></article>)}</section>
    </main>
  );
}