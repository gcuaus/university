import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import Breadcrumbs from '../components/breadcrumbs';
import MarkdocContent from '../components/markdoc-content';
import { breadcrumbJsonLd, jsonLdHtml, pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

async function getGettingStarted() {
  return reader.collections.gettingStarted.read('getting-started');
}

export async function generateMetadata(): Promise<Metadata> {
  const entry = await getGettingStarted();
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: '/getting-started',
  });
}

export default async function GettingStartedPage() {
  const entry = await getGettingStarted();
  if (!entry) notFound();
  const content = await entry.content();

  return (
    <main className="directory-page getting-started-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: entry.title, path: '/getting-started' },
            ]),
          ),
        }}
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: entry.title }]} />
      <MarkdocContent document={content} className="getting-started-timeline" />
    </main>
  );
}
