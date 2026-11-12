import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import TuitionCalculator from '../components/tuition-calculator';

const reader = createReader(process.cwd(), config);

export default async function AdmissionPage() {
  const [page, tuitionPage] = await Promise.all([
    reader.singletons.admissionPage.read(),
    reader.singletons.tuitionPage.read(),
  ]);
  if (!tuitionPage) throw new Error('Missing required "tuitionPage" content.');

  return (
    <main className="directory-page">
      <header className="directory-header"><Link href={page?.startHref || '/#evaluation'} className="admin-link">{page?.startLabel}</Link></header>
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      <section className="directory-grid">
        {page?.cards.map((card) => (
          <article className="directory-card" id={card.id} key={card.id || card.label}>
            <span className="card-index">{card.label}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.linkHref && <a href={card.linkHref}>{card.linkLabel} <span>↗</span></a>}
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
