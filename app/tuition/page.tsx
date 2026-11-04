import TuitionCalculator from '../components/tuition-calculator';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export default async function TuitionPage() {
  const page = await reader.singletons.tuitionPage.read();
  const descriptionParagraphs = page?.heroDescription.split(/\n\s*\n/).filter(Boolean) ?? [];

  return (
    <main className="directory-page tuition-page">
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        {descriptionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="tuition-plan" aria-labelledby="tuition-plan-title">
        <p className="eyebrow">{page?.planEyebrow}</p>
        <h2 id="tuition-plan-title">{page?.planTitle}</h2>
        <p>{page?.planDescription}</p>
        <TuitionCalculator
          programs={page?.programs ?? []}
          term12Label={page?.term12Label ?? '12-Month Financing'}
          term18Label={page?.term18Label ?? '18-Month Financing'}
          monthlyLabel={page?.monthlyLabel ?? 'Estimated monthly payment'}
          downPaymentLabel={page?.downPaymentLabel ?? 'Down payment'}
          matriculationLabel={page?.matriculationLabel ?? 'Matriculation'}
          tuitionLabel={page?.tuitionLabel ?? 'Tuition'}
          booksLabel={page?.booksLabel ?? 'Books'}
          shippingLabel={page?.shippingLabel ?? 'Shipping'}
          totalLabel={page?.totalLabel ?? 'Total cost'}
        />
      </section>
      <section className="tuition-fees" aria-labelledby="tuition-fees-title">
        <h2 id="tuition-fees-title">{page?.feesTitle}</h2>
        <dl className="tuition-fee-list">
          {page?.fees.map((fee, index) => (
            <div key={`${index}-${fee.title}`}>
              <dt>{fee.title}</dt>
              <dd>{fee.amount}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
