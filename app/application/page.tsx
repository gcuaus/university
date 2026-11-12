import type { Metadata } from 'next';
import ApplicationForm from '../components/application-form';

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
            <li>
              <span>01</span>
              <div><h3>Application review</h3><p>Admissions reviews your program selection, education, and ministry background.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Personal follow-up</h3><p>An admissions team member contacts you to discuss your goals, eligibility, and recommended academic plan.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Plan your studies</h3><p>Get guidance on the $20 application fee, tuition, and available no-interest payment arrangements.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><h3>Start learning</h3><p>After enrollment, required textbooks are included under GCUA's textbook policy. Study at your own pace from wherever you are.</p></div>
            </li>
          </ol>
          <p className="application-next-steps-note">This application form is a preview and does not submit or save your information yet. Contact <a href="mailto:admission@gcua.us">GCUA Admissions</a> to begin.</p>
        </aside>
      </section>
    </main>
  );
}
