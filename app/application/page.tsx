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
        <h2 id="application-title">Begin Your Application</h2>
        <ApplicationForm />
      </section>
    </main>
  );
}
