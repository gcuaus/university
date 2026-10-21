import Link from 'next/link';

export default function AdmissionPage() {
  return (
    <main className="directory-page">
      <header className="directory-header"><Link href="/#evaluation" className="admin-link">Start application</Link></header>
      <section className="directory-hero">
        <p className="eyebrow">Join our community</p>
        <h1>Admission to GCTSA.</h1>
        <p>Find tuition information and take your next step toward theological study.</p>
      </section>
      <section className="directory-grid">
        <article className="directory-card" id="tuition">
          <span className="card-index">TUITION</span>
          <h2>Tuition and fees</h2>
          <p>For current tuition, fees, and payment options, contact the Admissions Office.</p>
          <a href="mailto:admissions@gctsa.edu">Email admissions <span>↗</span></a>
        </article>
        <article className="directory-card" id="application">
          <span className="card-index">APPLICATION</span>
          <h2>Take your next step</h2>
          <p>Start by requesting a free evaluation. Our team will follow up about your educational background and study interests.</p>
          <Link href="/#evaluation">Request an evaluation <span>↗</span></Link>
        </article>
      </section>
    </main>
  );
}