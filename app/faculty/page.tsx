import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../site-content.css';
import '../navigation-footer.css';
import './faculty-cards.css';
import SiteNavigation from '../components/site-navigation';

const reader = createReader(process.cwd(), config);

export default async function FacultyPage() {
  const faculty = await reader.collections.faculty.all();
  return (
    <main className="directory-page">
      <SiteNavigation variant="directory" />
      <section className="directory-hero"><p className="eyebrow">The people who teach with purpose</p><h1>Meet our faculty.</h1><p>Thoughtful teachers, experienced practitioners, and faithful guides for the journey.</p></section>
      <section className="directory-grid">{faculty.map(({ slug, entry }) => <article className="directory-card faculty-card" key={slug} style={entry.photoUrl ? { backgroundImage: `url(${entry.photoUrl})` } : undefined}>{entry.photoUrl && <img className="faculty-portrait" src={entry.photoUrl} alt="" />}<div className="faculty-card-overlay" /><div className="faculty-card-content"><span className="card-index">FACULTY</span><h2>{entry.name}</h2><p className="card-meta">{entry.role}</p><p>Our faculty members connect careful study with faithful ministry and a generous life of learning.</p><Link href="/keystatic/collection/faculty">Edit faculty <span>↗</span></Link></div></article>)}</section>
      {faculty.length === 0 && <p className="empty-state">Faculty profiles will appear here once they are added in Keystatic.</p>}
    </main>
  );
}