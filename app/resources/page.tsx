import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function ResourcesPage() {
  const page = await reader.singletons.resourcesPage.read();

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      <section className="directory-grid">
        {page?.resources.map((resource) => (
          <article className="directory-card" key={resource.title}>
            <span className="card-index">{resource.label}</span>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <Link href={resource.href}>{resource.linkLabel} <span>↗</span></Link>
          </article>
        ))}
      </section>
    </main>
  );
}
