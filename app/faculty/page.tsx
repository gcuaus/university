import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function FacultyPage() {
  const faculty = await reader.collections.faculty.all();
  const photos = new Map(faculty.map(({ slug, entry }) => [slug, entry.photoUrl]));
  const profiles = [
    { slug: 'ferdinand-biblical', name: 'Dr. Ferdinand Henoch Saerang Ph.D', role: 'Professor of Biblical Studies', photo: photos.get('ferdinand-saerang'), href: 'https://staging.gcua.us/faculty/Ferdinand' },
    { slug: 'ferdinand-president', name: 'Dr. Ferdinand Henoch Saerang Ph.D', role: 'President and Faculty', photo: photos.get('ferdinand-saerang'), href: 'https://staging.gcua.us/faculty/ferdinand-saerang' },
    { slug: 'mikha-sulistiono', name: 'Dr. Mikha Sulistiono', role: 'Faculty', photo: photos.get('mikha-sulistiono'), href: 'https://staging.gcua.us/faculty/mikha-sulistiono' },
    { slug: 'ronald-mussu', name: 'Dr. Ronald Mussu', role: 'Faculty', photo: photos.get('ronald-mussu'), href: 'https://staging.gcua.us/faculty/ronald-mussu' },
    { slug: 'sammy-golioth', name: 'Dr. Sammy Golioth', role: 'Faculty', photo: photos.get('sammy-golioth'), href: 'https://staging.gcua.us/faculty/sammy-golioth' },
  ];
  return (
    <main className="directory-page">
      <section className="directory-hero"><p className="eyebrow">The people who teach with purpose</p><h1>Meet our faculty.</h1><p>Thoughtful teachers, experienced practitioners, and faithful guides for the journey.</p></section>
      <section className="directory-grid">{profiles.map((profile) => <article className="directory-card faculty-card" key={profile.slug}>{profile.photo && <img className="faculty-portrait" src={profile.photo} alt={profile.name} />}<span className="card-index">FACULTY</span><h2>{profile.name}</h2><p className="card-meta">{profile.role}</p><p>Our faculty members connect careful study with faithful ministry and a generous life of learning.</p><a href={profile.href}>View profile <span>↗</span></a></article>)}</section>
    </main>
  );
}