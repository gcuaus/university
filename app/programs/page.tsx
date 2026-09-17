import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../navigation-footer.css';
import SiteNavigation from '../components/site-navigation';
import SiteFooter from '../components/site-footer';

const reader = createReader(process.cwd(), config);

export default async function ProgramsPage() {
  const programs = await reader.collections.programs.all();
  const orderedPrograms = [...programs].sort(
    (a, b) => (Number(a.entry.sortOrder ?? 0) - Number(b.entry.sortOrder ?? 0)) || a.entry.title.localeCompare(b.entry.title),
  );

  return (
    <main className="directory-page programs-page">
      <SiteNavigation variant="directory" />

      <section className="programs-intro">
        <div className="programs-intro-copy">
          <p className="eyebrow">Academic formation</p>
          <h1>Programs shaped around your calling.</h1>
          <p>
            Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.
            Each pathway is designed to deepen biblical understanding and prepare you for faithful service.
          </p>
        </div>

        <aside className="programs-intro-aside">
          <span className="aside-label">Academic ladder</span>
          <ul className="program-levels">
            <li>Associate</li>
            <li>Undergraduate</li>
            <li>Graduate</li>
            <li>Doctoral</li>
            <li>Seminary</li>
          </ul>
        </aside>
      </section>

      <section className="programs-grid">
        {orderedPrograms.map(({ slug, entry }, index) => {
          const disciplines = (entry.disciplines || '')
            .split(/\n|,|\|/)
            .map((discipline) => discipline.trim())
            .filter(Boolean);

          return (
            <article className="programs-card" key={slug}>
              <div className="programs-card-top">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="program-card-level">{entry.level || 'Program'}</span>
              </div>

              <div className="programs-card-body">
                <p className="programs-card-type">{entry.programType || 'Program'}</p>
                <h2>{entry.title}</h2>

                {disciplines.length > 0 && (
                  <ul className="programs-disciplines">
                    {disciplines.map((discipline) => (
                      <li key={`${slug}-${discipline}`}>{discipline}</li>
                    ))}
                  </ul>
                )}

                <p className="programs-card-summary">{entry.summary}</p>
                <p className="programs-card-meta">{entry.duration || 'Flexible format'}</p>

                {entry.curriculumUrl ? (
                  <a href={entry.curriculumUrl} target="_blank" rel="noreferrer">
                    View curriculum <span>↗</span>
                  </a>
                ) : (
                  <Link href="/keystatic/collection/programs">
                    Edit program <span>↗</span>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {orderedPrograms.length === 0 && <p className="empty-state">Programs will appear here once they are added in Keystatic.</p>}

      <section className="programs-cta">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Find the degree path that fits your calling.</h2>
        </div>
        <Link href="/location" className="button button-primary">
          Request a free evaluation
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}