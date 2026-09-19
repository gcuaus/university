import type { Metadata } from 'next';

export const SITE_NAME = 'GCUA';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://staging.gcua.us';
export const SITE_DESCRIPTION =
  'Great Commission University of America (GCUA) — a theological education for the whole person: rigorous in study, generous in community, and alive to the call of Christ.';

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Great Commission University of America',
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function jsonLdHtml(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}