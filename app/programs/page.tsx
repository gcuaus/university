import Link from 'next/link';
import ProgramsFilter from '../components/programs-filter';

const programPaths = [
  { level: '01', category: 'ASSOCIATE', filter: 'associate', title: 'Associate of Theology', fields: 'THEOLOGY', description: 'The entry point for serious home study at GCUA, providing a solid foundation in biblical and theological studies.', credential: 'FOUNDATION', curriculum: 'https://gcits.org/curriculum-1/', details: 'https://staging.gcua.us/programs/bible-and-theology' },
  { level: '02', category: 'GRADUATE', filter: 'graduate', title: 'Graduate of Theology', fields: 'THEOLOGY', description: 'An intermediate credential recognizing substantial completion of theological coursework.', credential: 'DISCIPLINE', curriculum: 'https://gcits.org/curriculum-1/', details: 'https://staging.gcua.us/programs/counseling-and-education' },
  { level: '03', category: 'UNDERGRADUATE', filter: 'undergraduate', title: 'Bachelor of...', fields: 'THEOLOGY · CHRISTIAN COUNSELING · RELIGIOUS EDUCATION', description: 'Undergraduate degree level for pastoral ministry, counseling, or education.', credential: 'UNDERGRADUATE DEGREE', curriculum: 'https://gcits.org/curriculum/', details: 'https://staging.gcua.us/programs/bachelor-of-program' },
  { level: '04', category: 'GRADUATE', filter: 'graduate', title: 'Master of...', fields: 'THEOLOGY · CHRISTIAN COUNSELING · RELIGIOUS EDUCATION', description: 'Advanced graduate-level study to sharpen effectiveness in ministry.', credential: 'ADVANCED GRADUATE STUDY', curriculum: 'https://gcits.org/curriculum/', details: 'https://staging.gcua.us/programs/master-of-program' },
  { level: '05', category: 'DOCTORATE', filter: 'doctoral', title: 'Doctor of...', fields: 'THEOLOGY · CHRISTIAN COUNSELING · RELIGIOUS EDUCATION · MINISTRY', description: 'Doctoral-level mastery for the highest level of formal recognition.', credential: 'DOCTORAL LEVEL', curriculum: 'https://gcits.org/curriculum/', details: 'https://staging.gcua.us/programs/doctor-of-program' },
  { level: '06', category: 'DOCTOR OF PHILOSOPHY', filter: 'doctoral', title: 'Doctor of Philosophy in...', fields: 'THEOLOGY · RELIGION · CHRISTIAN COUNSELING', description: 'The highest academic degree offered at GCUA for mature scholars.', credential: 'HIGHEST ACADEMIC DEGREE', curriculum: 'https://gcits.org/curriculum/', details: 'https://staging.gcua.us/programs/doctor-of-philosophy' },
  { level: '07', category: 'DOCTOR OF PHILOSOPHY', filter: 'doctoral', title: 'Doctor of Philosophy in...', fields: 'THEOLOGY · RELIGION · CHRISTIAN COUNSELING', description: 'The highest academic degree offered at GCUA for mature scholars.', credential: 'HIGHEST ACADEMIC DEGREE', curriculum: 'https://gcits.org/curriculum/', details: 'https://staging.gcua.us/programs/seminary-advanced2' },
  { level: '08', category: 'SEMINARY', filter: 'seminary', title: 'Master of Divinity', fields: 'THEOLOGY · MINISTRY', description: 'The Master of Divinity is offered to students who hold a secular Bachelor’s degree and provides rigorous theological and ministerial training at the graduate level.', credential: '3 YEAR COMMITMENT · 96 CREDIT HOURS', curriculum: 'https://gcits.org/degree/#', details: 'https://staging.gcua.us/programs/master-of-divinity' },
];

export default async function ProgramsPage() {
  return (
    <main className="directory-page programs-page">
      <section className="directory-hero"><p className="eyebrow">Academic formation</p><h1>Programs shaped around your calling.</h1><p>Build a strong foundation for ministry, scholarship, and thoughtful Christian witness. Each pathway is designed to deepen biblical understanding and prepare you for faithful service.</p></section>
      <section className="pathway-section" aria-labelledby="pathway-title"><p className="eyebrow">Academic ladder</p><h2 id="pathway-title">All programs</h2><ProgramsFilter programs={programPaths} /></section>
      <section className="programs-next-step"><p className="eyebrow">Next step</p><h2>Find the degree path that fits your calling.</h2><Link className="button gold" href="/#evaluation">Request a free evaluation <span>↗</span></Link></section>
    </main>
  );
}