import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import ProgramsFilter from '../components/programs-filter';

const reader = createReader(process.cwd(), config);

export default async function ProgramsPage() {
  const [settings, programs] = await Promise.all([
    reader.singletons.programsPage.read(),
    reader.collections.programs.all(),
  ]);
  const page = settings;
  const programPaths = [...programs]
    .sort((a, b) => (a.entry.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.entry.sortOrder ?? Number.MAX_SAFE_INTEGER))
    .map(({ slug, entry }, index) => ({
    slug,
    level: String(index + 1).padStart(2, '0'),
    category: entry.category,
    filter: entry.filter,
    title: entry.title,
    fields: entry.fields,
    description: entry.summary,
    credential: entry.credential,
    curriculum: entry.curriculumUrl,
    details: entry.detailsUrl || `/programs/${slug}`,
    }));
  const labels = {
    all: page?.allFilterLabel ?? 'All programs',
    associate: page?.associateFilterLabel ?? 'Associate',
    undergraduate: page?.undergraduateFilterLabel ?? 'Undergraduate',
    graduate: page?.graduateFilterLabel ?? 'Graduate',
    doctoral: page?.doctoralFilterLabel ?? 'Doctoral',
    seminary: page?.seminaryFilterLabel ?? 'Seminary',
  };
  return (
    <main className="directory-page programs-page">
      <section className="directory-hero"><p className="eyebrow">{page?.heroEyebrow}</p><h1>{page?.heroTitle}</h1><p>{page?.heroDescription}</p></section>
      <section className="pathway-section" aria-labelledby="pathway-title"><p className="eyebrow">{page?.listEyebrow}</p><h2 id="pathway-title">{page?.listTitle}</h2><ProgramsFilter programs={programPaths} labels={labels} countLabel={page?.programCountLabel ?? 'programs'} curriculumLabel={page?.curriculumLinkLabel ?? 'View curriculum'} detailsLabel={page?.detailsLinkLabel ?? 'Program details'} emptyMessage={page?.noProgramsMessage ?? 'No programs in this category.'} levelPrefix={page?.levelPrefix ?? 'LEVEL'} /></section>
      <section className="programs-next-step"><p className="eyebrow">{page?.nextEyebrow}</p><h2>{page?.nextTitle}</h2><Link className="button gold" href={page?.ctaHref || '/#evaluation'}>{page?.ctaLabel} <span>↗</span></Link></section>
    </main>
  );
}