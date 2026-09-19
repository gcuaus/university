import type { Metadata } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import MarkdocContent from '../components/markdoc-content';
import { pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact GCUA for admissions, academic, and general enquiries.',
  path: '/contact',
});

export default async function ContactPage() {
  const entries = await reader.collections.contact.all();
  const contacts = await Promise.all(
    entries.map(async ({ slug, entry }) => ({ slug, entry, details: await entry.details() })),
  );
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact us.</h1>
        <p>Reach the right team for admissions, academic, or general questions.</p>
      </section>
      <div className="contact-list">
        {contacts.map(({ slug, entry, details }) => (
          <section className="contact-entry" key={slug}>
            {entry.department && <p className="eyebrow">{entry.department}</p>}
            <h2>{entry.title}</h2>
            <div className="contact-links">
              <a href={`mailto:${entry.email}`}>{entry.email}</a>
              {entry.phone && <a href={`tel:${entry.phone.replace(/[^+\d]/g, '')}`}>{entry.phone}</a>}
            </div>
            <MarkdocContent document={details} />
          </section>
        ))}
      </div>
      {contacts.length === 0 && (
        <p className="empty-state">Contact details will appear here once they are added in Keystatic.</p>
      )}
    </main>
  );
}