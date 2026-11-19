import type { Metadata } from 'next';
import ContactForm from '../components/contact-form';

export const metadata: Metadata = {
  title: 'Contact GCUA | Great Commission University of America',
  description: 'Contact Great Commission University of America for admissions, programs, and general inquiries.',
};

export default function ContactPage() {
  return (
    <main className="directory-page contact-page">
      <section className="contact-hero">
        <p className="eyebrow">Get in Touch</p>
        <h1>Contact GCUA</h1>
        <p>Questions about an academic program, admission requirements, or the next step in your calling? Our team is ready to help.</p>
      </section>

      <section className="contact-layout" aria-label="GCUA contact information">
        <aside className="contact-information" aria-label="Ways to contact GCUA">
          <p className="eyebrow">Admissions Team</p>
          <h2>We are happy to help you find the right path.</h2>
          <p>Reach out by email or send a message below. Please include your program or study interests so we can respond with relevant guidance.</p>

          <div className="contact-card">
            <span>01</span>
            <h3>Admissions &amp; Programs</h3>
            <p>Program selection, admission requirements, and academic planning.</p>
            <a href="mailto:admission@gcua.us">admission@gcua.us <span>↗</span></a>
          </div>

          <div className="contact-card">
            <span>02</span>
            <h3>General Inquiries</h3>
            <p>Student services, ministry opportunities, and institutional questions.</p>
            <a href="mailto:admission@gcua.us">admission@gcua.us <span>↗</span></a>
          </div>

          <div className="contact-card">
            <span>03</span>
            <h3>GCUA Location</h3>
            <address>15151 Eastwood Trail<br />Brooksville, Florida 34604</address>
            <a href="https://maps.google.com/?q=15151+Eastwood+Trail+Brooksville+FL+34604" target="_blank" rel="noreferrer">Get directions <span>↗</span></a>
          </div>
        </aside>

        <div className="contact-message">
          <p className="eyebrow">Send a Message</p>
          <h2>We will respond promptly.</h2>
          <p>Use this form for general questions, program inquiries, or enrollment guidance.</p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
