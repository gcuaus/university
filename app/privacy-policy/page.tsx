import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | GCUA',
  description: 'Learn how Great Commission University of America handles information submitted through its website.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="directory-page legal-page">
      <section className="directory-hero">
        <p className="eyebrow">Website policies</p>
        <h1>Privacy Policy</h1>
        <p>How Great Commission University of America handles information when you browse the site, contact us, or request an academic evaluation.</p>
        <p className="legal-updated">Last updated: November 19, 2026</p>
      </section>
      <article className="legal-content">
        <section>
          <h2>Information you choose to provide</h2>
          <p>The contact form may ask for your name, email address, phone number, subject, and message. The academic evaluation form may ask for your name, email address, WhatsApp number, and ministry or study interests. These forms send the information you submit to GCUA through the website’s admissions CRM integration when that service is configured. The application form is currently a preview only: information entered there is not submitted or saved by the website. Please do not send passwords, payment-card details, government identification numbers, or other sensitive information through general forms.</p>
        </section>
        <section>
          <h2>How submitted information is used</h2>
          <p>GCUA uses inquiry and evaluation submissions to respond to you, discuss programs and admission, and provide requested guidance. Information is processed by the website and the CRM service configured to receive these submissions. If the CRM integration is unavailable or not configured, a form may not be delivered; the page will display an error so you can contact GCUA directly.</p>
        </section>
        <section>
          <h2>Retention and service providers</h2>
          <p>Submissions may be stored in the admissions CRM and related systems used to operate the site and respond to you. GCUA retains information for as long as reasonably needed to handle your inquiry, maintain appropriate university records, and meet legal or operational requirements. Service providers process information to provide services to GCUA and may handle it under their own security and privacy practices. Contact GCUA to ask about information you have submitted or to request a correction or deletion, subject to applicable recordkeeping requirements.</p>
        </section>
        <section>
          <h2>Browser storage and technical information</h2>
          <p>The site stores your language choice in your browser’s local storage so it can remember that preference. Clearing browser storage resets it. The site does not use this preference storage for advertising. Hosting and security systems may process standard technical request information needed to deliver and protect the website.</p>
        </section>
        <section>
          <h2>Resources, sharing, and external websites</h2>
          <p>Resource articles may include links to third-party websites. Article share links for email, WhatsApp, Threads, and X open or prepare content for those services only when you choose to use them. Those providers may receive information such as your IP address or the article URL under their own privacy policies. GCUA does not control third-party services. GCUA does not sell personal information submitted through its website.</p>
        </section>
        <section>
          <h2>Your choices and privacy questions</h2>
          <p>You can choose not to submit information through the contact or evaluation forms and may contact GCUA directly instead. For privacy questions or requests concerning information you submitted, email <a href="mailto:admission@gcua.us">admission@gcua.us</a>.</p>
        </section>
        <section>
          <h2>Changes to this policy</h2>
          <p>GCUA may update this policy when the website or its practices change. The current version and its revision date will be posted on this page.</p>
        </section>
      </article>
    </main>
  );
}
