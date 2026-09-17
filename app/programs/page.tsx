import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../navigation-footer.css';

const reader = createReader(process.cwd(), config);

export default async function ProgramsPage() {
  const programs = await reader.collections.programs.all();
  return (
    <main className="directory-page">
      <header className="directory-header"><Link href="/" className="back-link">GCTSA <span>↗</span></Link><Link href="/keystatic" className="admin-link">Edit</Link></header>
      <section className="directory-hero"><p className="eyebrow">Academic formation</p><h1>Programs shaped around your calling.</h1><p>Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.</p></section>
      <section className="directory-grid">{programs.map(({ slug, entry }) => <article className="directory-card" key={slug}><span className="card-index">{String(programs.findIndex((item) => item.slug === slug) + 1).padStart(2, '0')}</span><h2>{entry.title}</h2><p className="card-meta">{entry.level} · {entry.duration}</p><p>{entry.summary}</p><Link href="/keystatic/collection/programs">Edit program <span>↗</span></Link></article>)}</section>
      {programs.length === 0 && <p className="empty-state">Programs will appear here once they are added in Keystatic.</p>}
    </main>
  );
}