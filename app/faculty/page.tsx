import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function FacultyPage() {
  const faculty = await reader.collections.faculty.all();
  return (
    <main className="directory-page">
      <header className="directory-header"><Link href="/" className="back-link">GCTSA <span>↗</span></Link><Link href="/keystatic" className="admin-link">Edit in Keystatic</Link></header>
      <section className="directory-hero"><p className="eyebrow">The people who teach with purpose</p><h1>Meet our faculty.</h1><p>Thoughtful teachers, experienced practitioners, and faithful guides for the journey.</p></section>
      <section className="directory-grid">{faculty.map(({ slug, entry }) => <article className="directory-card faculty-card" key={slug}>{entry.photoUrl && <img className="faculty-portrait" style={{ width: 92, height: 92 }} src={entry.photoUrl} alt={entry.name} />}<span className="card-index">FACULTY</span><h2>{entry.name}</h2><p className="card-meta">{entry.role}</p><p>Our faculty members connect careful study with faithful ministry and a generous life of learning.</p><Link href="/keystatic/collection/faculty">Edit faculty <span>↗</span></Link></article>)}</section>
      {faculty.length === 0 && <p className="empty-state">Faculty profiles will appear here once they are added in Keystatic.</p>}
    </main>
  );
}