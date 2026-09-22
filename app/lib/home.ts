import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Applications for Fall 2026 are now open', brand: 'GCUA', brandDescriptor: 'Great Commission University of America', logo: null, whatsappNumber: '17185366638',
  navAbout: 'About', navPrograms: 'Programs', navFaculty: 'Faculty', navLocation: 'Location', navTuition: 'Tuition', navNews: 'News', navContact: 'Contact', navApply: 'Apply now', heroEyebrow: 'Forming faithful leaders for a changing world',
  heroTitle: 'Rooted in truth. Ready for service.', heroBody: 'A theological education for the whole person: rigorous in study, generous in community, and alive to the call of Christ.', heroPrimaryCta: 'Explore programs', heroSecondaryCta: 'Meet our faculty',
  statOneValue: '35+', statOneLabel: 'Years of faithful formation', statTwoValue: '12', statTwoLabel: 'Distinctive programs', statThreeValue: '1', statThreeLabel: 'Shared calling',
  welcomeEyebrow: 'A place to belong', welcomeTitle: 'Study deeply. Serve faithfully.', welcomeBody: 'At GCUA, we believe theological education should shape more than what you know. It should form how you live, lead, and love your neighbors.',
  programsEyebrow: 'Find your path', programsTitle: 'Programs shaped around your calling', programsBody: 'Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.', programOneTitle: 'Master of Divinity', programOneBody: 'A comprehensive course of study for pastors and ministry leaders.', programTwoTitle: 'Master of Arts', programTwoBody: 'Focused graduate study for educators, counselors, and working professionals.', programThreeTitle: 'Certificate Studies', programThreeBody: 'Flexible theological formation for the season of life you are in.',
  ctaTitle: 'Your next faithful step starts here.', ctaBody: 'Come and see what thoughtful, Christ-centered education can make possible.', ctaButton: 'Begin your application', footerText: 'Great Commission University of America\nTruthful study. Faithful service.',
};

export async function getHome() {
  const content = await reader.singletons.home.read();
  return { ...fallback, ...(content ?? {}) };
}

export const homeReader = reader;
