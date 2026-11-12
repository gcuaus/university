import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | GCUA',
  description: 'Terms for using the Great Commission University of America website.',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="directory-page legal-page">
      <section className="directory-hero">
        <p className="eyebrow">Website policies</p>
        <h1>Terms and Conditions</h1>
        <p>These terms apply to your use of the Great Commission University of America website.</p>
        <p className="legal-updated">Last updated: November 12, 2026</p>
      </section>
      <article className="legal-content">
        <section>
          <h2>Using this website</h2>
          <p>You may use this website to learn about GCUA, its programs, admissions, and related services. You agree to use it lawfully and not to interfere with its operation, attempt unauthorized access, or misuse its forms or content.</p>
        </section>
        <section>
          <h2>Educational information and tuition estimates</h2>
          <p>Website content is provided for general informational purposes and is not an offer of admission, enrollment agreement, or guarantee of a particular academic or ministry outcome. Program requirements, admissions decisions, tuition, fees, and other policies may change. Tuition calculator results are estimates based on the information displayed; confirm current costs and requirements with GCUA before making enrollment or payment decisions.</p>
        </section>
        <section>
          <h2>Admissions and university policies</h2>
          <p>Submitting an inquiry or evaluation request does not constitute an application or guarantee admission. Enrollment, academic standing, transfer credit, and degree completion are subject to applicable GCUA requirements and official university policies.</p>
        </section>
        <section>
          <h2>Website content and intellectual property</h2>
          <p>Unless otherwise stated, website text, branding, graphics, and other content are owned by or used with permission by GCUA. You may view and print material for personal, noncommercial reference. You may not reproduce, distribute, or commercially use website content without prior written permission, except where applicable law permits.</p>
        </section>
        <section>
          <h2>Third-party websites</h2>
          <p>This website may link to third-party services or websites for convenience. GCUA does not control and is not responsible for their content, availability, or practices. Use of those services is subject to their own terms.</p>
        </section>
        <section>
          <h2>Availability and changes</h2>
          <p>GCUA may update, suspend, or remove website features or content. The website is provided as available, and GCUA does not guarantee uninterrupted or error-free access. Nothing in these terms limits rights or responsibilities that cannot be excluded under applicable law.</p>
        </section>
        <section>
          <h2>Changes to these terms</h2>
          <p>These terms may be revised from time to time. Continued use of the website after a revision means you accept the updated terms to the extent permitted by law. The latest version and its updated date will appear on this page.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Questions about these terms may be sent to <a href="mailto:admission@gcua.us">admission@gcua.us</a>.</p>
        </section>
      </article>
    </main>
  );
}
