import type { MetadataRoute } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import { SITE_URL } from './lib/seo';

const reader = createReader(process.cwd(), config);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/programs', '/faculty', '/location', '/tuition', '/contact', '/blog'];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const aboutEntries = await reader.collections.about.all();
  const aboutUrls: MetadataRoute.Sitemap = aboutEntries.map(({ slug }) => ({
    url: `${SITE_URL}/about/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const programEntries = await reader.collections.programs.all();
  const programUrls: MetadataRoute.Sitemap = programEntries.map(({ slug }) => ({
    url: `${SITE_URL}/programs/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const facultyEntries = await reader.collections.faculty.all();
  const facultyUrls: MetadataRoute.Sitemap = facultyEntries.map(({ slug }) => ({
    url: `${SITE_URL}/faculty/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  const posts = await reader.collections.posts.all();
  const postUrls: MetadataRoute.Sitemap = posts
    .filter(({ entry }) => entry.status === 'published')
    .map(({ slug, entry }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: entry.publishedAt ?? undefined,
      changeFrequency: 'yearly',
      priority: 0.5,
    }));

  return [...staticEntries, ...aboutUrls, ...programUrls, ...facultyUrls, ...postUrls];
}