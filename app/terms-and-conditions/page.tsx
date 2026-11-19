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
        <p>These terms apply to your use of the Great Commission University of America website and its online resources.</p>
        <p className="legal-updated">Last updated: November 19, 2026</p>
      </section>
      <article className="legal-content">
        <section>
          <h2>Using this website</h2>
          <p>You may use this website to learn about GCUA, explore academic programs and resources, and contact the university. You agree to use the site lawfully and not to disrupt its operation, attempt unauthorized access, submit malicious or misleading content, or misuse its forms or materials.</p>
        </section>
        <section>
          <h2>Academic information and tuition estimates</h2>
          <p>Program descriptions, admission information, articles, and other site content are provided for general informational and educational purposes. They do not replace official university catalogs, academic policies, admission decisions, or written enrollment and financial agreements. Program availability, requirements, tuition, fees, and payment arrangements may change. Tuition calculator results are estimates based on displayed information and assumptions; confirm current details with GCUA before making decisions.</p>
        </section>
        <section>
          <h2>Forms and admissions</h2>
          <p>Contact and academic evaluation forms are for inquiries and follow-up; they do not themselves constitute an application or guarantee admission. The application form currently displayed on the site is a preview and does not submit or store the information entered. Admission, enrollment, transfer credit, academic standing, and degree completion are governed by GCUA’s applicable requirements and official policies.</p>
        </section>
        <section>
          <h2>Website and resource content</h2>
          <p>Unless otherwise credited, GCUA names, branding, and original site content are owned by or used with permission by GCUA. Resource articles may include material or links from other publishers; attribution does not transfer ownership or grant permission to reuse that publisher’s work. You may access the website for personal, noncommercial use. Do not copy, republish, distribute, or commercially use protected material without permission from its rights holder, except as allowed by law.</p>
        </section>
        <section>
          <h2>External services and article sharing</h2>
          <p>Links to external publishers, maps, email, WhatsApp, Threads, X, or other services are provided for convenience. When you follow a link or use a sharing control, you interact with the third party and its terms, privacy practices, and content. GCUA does not control or endorse every third-party service and is not responsible for its availability or practices.</p>
        </section>
        <section>
          <h2>Availability and limitations</h2>
          <p>GCUA may change or remove website content and features. The website is provided on an “as available” basis; uninterrupted or error-free access is not guaranteed. To the extent permitted by law, GCUA disclaims warranties relating to the website and is not liable for indirect or consequential loss arising from its use. Nothing in these terms excludes rights or responsibilities that cannot be limited under applicable law.</p>
        </section>
        <section>
          <h2>Changes to these terms</h2>
          <p>GCUA may revise these terms as the website or its services change. The current version and its revision date will appear on this page. Your continued use of the site after a revision is subject to the updated terms to the extent permitted by law.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Questions about these terms may be sent to <a href="mailto:admission@gcua.us">admission@gcua.us</a>.</p>
        </section>
      </article>
    </main>
  );
}
