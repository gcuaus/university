import Link from 'next/link';

export default function TuitionPage() {
  return (
    <main className="directory-page tuition-page">
      <section className="directory-hero">
        <p className="eyebrow">Affordable · Transparent · Interest-free</p>
        <h1>Tuition that keeps the calling within reach.</h1>
        <p>A seminary-level education designed to be within reach of every called servant of God, with interest-free payments and no credit qualification required.</p>
      </section>
      <section className="tuition-plan" aria-labelledby="tuition-plan-title">
        <p className="eyebrow">Plan your year</p>
        <h2 id="tuition-plan-title">Build your tuition plan.</h2>
        <p>Move the slider to explore a program, then choose the payment rhythm that works for your season.</p>
        <div className="tuition-plan-grid">
          <article className="tuition-program">
            <span className="card-index">1ST YEAR</span>
            <h3>Foundation Courses</h3>
            <p className="tuition-amount-label">Annual tuition</p>
            <p className="tuition-amount">$1,447</p>
            <div className="tuition-division"><span>College division</span><span>Seminary division</span></div>
          </article>
          <article className="tuition-payment">
            <div className="payment-rhythms"><span>12 months</span><span>18 months</span></div>
            <p className="tuition-amount-label">Estimated monthly</p>
            <p className="tuition-amount">$121<small>/mo</small></p>
            <p>after $375 down · 12 interest-free payments</p>
            <dl>
              <div><dt>Annual tuition</dt><dd>$1,447</dd></div>
              <div><dt>Fees &amp; books</dt><dd>$375</dd></div>
              <div><dt>Financed balance</dt><dd>$1,447</dd></div>
            </dl>
            <p className="pay-in-full"><strong>Pay in full</strong><span>$1,533 includes a 20% tuition prepay discount</span></p>
          </article>
        </div>
      </section>
      <section className="financing-section" aria-labelledby="financing-title">
        <p className="eyebrow">Simple &amp; straightforward</p>
        <h2 id="financing-title">How GCUA financing works.</h2>
        <div className="financing-grid">
          <article><span className="card-index">01</span><h3>No qualifying required</h3><p>No credit check, grants, or government loans. GCUA finances every student directly.</p></article>
          <article><span className="card-index">02</span><h3>Choose your rhythm</h3><p>After the annual down payment, the remaining balance is divided evenly over 12 or 18 months.</p></article>
          <article><span className="card-index">03</span><h3>Prepay and save</h3><p>Pay the full year's tuition up front and receive a 20% discount on tuition.</p></article>
        </div>
      </section>
      <section className="tuition-year">
        <p className="eyebrow">Before you enroll</p>
        <h2>A clear picture of the year ahead.</h2>
        <p>Every program includes $110 matriculation, approximately $250 books, and $15 shipping. International students add $200 shipping. Canadian students add $95.</p>
        <p>Students must maintain a 2.0 GPA to qualify for the Ecclesiastical Scholarship.</p>
        <Link className="button gold" href="/#evaluation">Request a free evaluation <span>↗</span></Link>
      </section>
    </main>
  );
}