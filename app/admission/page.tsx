import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import TuitionCalculator from '../components/tuition-calculator';

const reader = createReader(process.cwd(), config);

export default async function AdmissionPage() {
  const [page, tuitionPage, admissionCards] = await Promise.all([
    reader.singletons.admissionPage.read(),
    reader.singletons.tuitionPage.read(),
    reader.collections.admissionCards.all(),
  ]);
  if (!tuitionPage) throw new Error('Missing required "tuitionPage" content.');
  const sortedAdmissionCards = [...admissionCards].sort(
    (left, right) =>
      (left.entry.sortOrder ?? Number.MAX_SAFE_INTEGER)
      - (right.entry.sortOrder ?? Number.MAX_SAFE_INTEGER),
  );

  return (
    <main className="directory-page">
      <header className="directory-header"><Link href={page?.startHref || '/#evaluation'} className="admin-link">{page?.startLabel}</Link></header>
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      <section className="directory-grid">
        {sortedAdmissionCards.map(({ slug, entry }) => (
          <article className="directory-card" id={entry.sectionId || undefined} key={slug}>
            <span className="card-index">{entry.label}</span>
            <h2>{entry.title}</h2>
            <p>{entry.description}</p>
            {entry.linkHref && <a href={entry.linkHref}>{entry.linkLabel} <span>↗</span></a>}
          </article>
        ))}
      </section>
      <section className="tuition-plan admission-tuition-plan" aria-labelledby="admission-tuition-title" id="tuition-calculator">
        <p className="eyebrow">{tuitionPage.planEyebrow}</p>
        <h2 id="admission-tuition-title">{tuitionPage.planTitle}</h2>
        <p>{tuitionPage.planDescription}</p>
        <TuitionCalculator
          programs={tuitionPage.programs}
          term12Label={tuitionPage.term12Label}
          term18Label={tuitionPage.term18Label}
          monthlyLabel={tuitionPage.monthlyLabel}
          downPaymentLabel={tuitionPage.downPaymentLabel}
          matriculationLabel={tuitionPage.matriculationLabel}
          tuitionLabel={tuitionPage.tuitionLabel}
          booksLabel={tuitionPage.booksLabel}
          shippingLabel={tuitionPage.shippingLabel}
          totalLabel={tuitionPage.totalLabel}
        />
        <Link className="admission-tuition-link" href="/tuition">View all tuition and fees <span>↗</span></Link>
      </section>
    </main>
  );
}
