import type { Metadata } from 'next';
import ApplicationForm from '../components/application-form';
import { enrollmentSteps } from '../enrollment-steps';

export const metadata: Metadata = {
  title: 'Application for Admission | GCUA',
  description: 'Begin your application for admission to Great Commission University of America.',
};

export default function ApplicationPage() {
  return (
    <main className="directory-page application-page">
      <section className="directory-hero">
        <p className="eyebrow">Great Commission University of America</p>
        <h1>Application for Admission</h1>
        <p>Share your contact information, educational background, and program interests to prepare for your next step with GCUA.</p>
      </section>
      <section className="application-content" aria-labelledby="application-title">
        <div className="application-main">
          <div className="application-section-heading">
            <p className="eyebrow">Admissions</p>
            <h2 id="application-title">Begin Your Application</h2>
            <p>Tell us about your goals and background. Required fields are marked with an asterisk.</p>
          </div>
          <ApplicationForm />
        </div>
        <aside className="application-next-steps" aria-labelledby="next-steps-title">
          <p className="eyebrow">Your path to GCUA</p>
          <h2 id="next-steps-title">What Happens Next</h2>
          <ol>
            {enrollmentSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
          <p className="application-next-steps-note">This application form is a preview and does not submit or save your information yet. Contact <a href="mailto:admission@gcua.us">GCUA Admissions</a> to begin.</p>
        </aside>
      </section>
    </main>
  );
}
