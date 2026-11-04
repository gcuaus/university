import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export default async function TuitionPage() {
  const page = await reader.singletons.tuitionPage.read();
  return (
    <main className="directory-page tuition-page">
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      <section className="tuition-plan" aria-labelledby="tuition-plan-title">
        <p className="eyebrow">{page?.planEyebrow}</p>
        <h2 id="tuition-plan-title">{page?.planTitle}</h2>
        <p>{page?.planDescription}</p>
        <div className="tuition-plan-grid">
          <article className="tuition-program">
            <span className="card-index">{page?.yearLabel}</span>
            <h3>{page?.programTitle}</h3>
            <p className="tuition-amount-label">{page?.annualTuitionLabel}</p>
            <p className="tuition-amount">{page?.annualTuition}</p>
            <div className="tuition-division"><span>{page?.collegeDivisionLabel}</span><span>{page?.seminaryDivisionLabel}</span></div>
          </article>
          <article className="tuition-payment">
            <div className="payment-rhythms"><span>{page?.shortPaymentTerm}</span><span>{page?.longPaymentTerm}</span></div>
            <p className="tuition-amount-label">{page?.monthlyLabel}</p>
            <p className="tuition-amount">{page?.monthlyAmount}<small>{page?.monthlyUnit}</small></p>
            <p>{page?.paymentDescription}</p>
            <dl>
              <div><dt>{page?.annualTuitionLabel}</dt><dd>{page?.annualTuition}</dd></div>
              <div><dt>{page?.feesLabel}</dt><dd>{page?.feesAmount}</dd></div>
              <div><dt>{page?.balanceLabel}</dt><dd>{page?.balanceAmount}</dd></div>
            </dl>
            <p className="pay-in-full"><strong>{page?.payInFullTitle}</strong><span>{page?.payInFullDescription}</span></p>
          </article>
        </div>
      </section>
      <section className="financing-section" aria-labelledby="financing-title">
        <p className="eyebrow">{page?.financingEyebrow}</p>
        <h2 id="financing-title">{page?.financingTitle}</h2>
        <div className="financing-grid">
          {page?.financingCards.map((card, index) => <article key={`${index}-${card.title}`}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}
        </div>
      </section>
      <section className="tuition-year">
        <p className="eyebrow">{page?.yearEyebrow}</p>
        <h2>{page?.yearTitle}</h2>
        <p>{page?.yearDescription}</p>
        <p>{page?.scholarshipDescription}</p>
        <Link className="button gold" href={page?.ctaHref || '/#evaluation'}>{page?.ctaLabel} <span>↗</span></Link>
      </section>
    </main>
  );
}
