import Link from 'next/link';
import type { Metadata } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import { pageMetadata } from '../lib/seo';
import ProgramsFilter from './programs-filter';
import './programs-filter.css';

const reader = createReader(process.cwd(), config);

export const metadata: Metadata = pageMetadata({
  title: 'Programs',
  description: 'Explore the graduate, certificate, and undergraduate programs offered by GCUA.',
  path: '/programs',
});

export default async function ProgramsPage() {
  const programs = await reader.collections.programs.all();
  const orderedPrograms = [...programs].sort(
    (a, b) => (Number(a.entry.sortOrder ?? 0) - Number(b.entry.sortOrder ?? 0)) || a.entry.title.localeCompare(b.entry.title),
  );

  return (
    <main className="directory-page programs-page">

      <section className="programs-intro">
        <div className="programs-intro-copy">
          <p className="eyebrow">Academic formation</p>
          <h1>Programs shaped around your calling.</h1>
          <p>
            Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.
            Each pathway is designed to deepen biblical understanding and prepare you for faithful service.
          </p>
        </div>

      </section>
      <ProgramsFilter programs={orderedPrograms.map(({ slug, entry }) => ({ slug, title: entry.title, level: entry.level, programType: entry.programType, summary: entry.summary, disciplines: entry.disciplines, duration: entry.duration, curriculumUrl: entry.curriculumUrl }))} />

      <section className="programs-cta">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Find the degree path that fits your calling.</h2>
        </div>
        <Link href="/location" className="button button-primary">
          Request a free evaluation
        </Link>
      </section>
    </main>
  );
}