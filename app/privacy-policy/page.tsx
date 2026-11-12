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
        <p>How Great Commission University of America collects, uses, and protects information shared through this website.</p>
        <p className="legal-updated">Last updated: November 12, 2026</p>
      </section>
      <article className="legal-content">
        <section>
          <h2>Information you provide</h2>
          <p>If you request an academic evaluation or contact GCUA, the website may collect information you submit, such as your name, email address, WhatsApp or telephone number, and ministry or study interests. Please do not send passwords, payment-card information, or other sensitive information through general website forms.</p>
        </section>
        <section>
          <h2>How information is used</h2>
          <p>Information submitted through the website is used to respond to questions, discuss educational interests, and support admissions or evaluation requests. It may also be used to operate, secure, and improve the website and its services.</p>
        </section>
        <section>
          <h2>Storage and service providers</h2>
          <p>Website information may be processed by service providers that support site hosting, form delivery, or site operations. GCUA takes reasonable steps to limit access to information to people and providers who need it for these purposes. Information may be retained as needed to respond to your request, maintain university records, or meet legal obligations.</p>
        </section>
        <section>
          <h2>Cookies and browser storage</h2>
          <p>This website may use browser storage to remember preferences such as your selected language or color theme. Your browser controls allow you to clear stored preferences. Clearing them may reset those choices.</p>
        </section>
        <section>
          <h2>Sharing and external links</h2>
          <p>GCUA does not sell personal information submitted through this website. Information may be shared when needed to provide a requested service, comply with law, protect the university or others, or fulfill another purpose described when the information is collected. Links to other websites are governed by those websites’ own privacy practices.</p>
        </section>
        <section>
          <h2>Your choices and questions</h2>
          <p>You may contact GCUA to ask about, correct, or request deletion of information you submitted, subject to applicable recordkeeping and legal requirements. For privacy questions, email <a href="mailto:admission@gcua.us">admission@gcua.us</a>.</p>
        </section>
        <section>
          <h2>Changes to this policy</h2>
          <p>GCUA may update this policy as website practices or requirements change. The latest version will be posted on this page with its updated date.</p>
        </section>
      </article>
    </main>
  );
}
