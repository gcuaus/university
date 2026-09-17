'use client';

import Link from 'next/link';
import { useState } from 'react';

type Program = {
  slug: string;
  title: string;
  level?: string | null;
  programType?: string | null;
  summary: string;
  disciplines?: string | null;
  duration?: string | null;
  curriculumUrl?: string | null;
};

const filters = ['Associate', 'Undergraduate', 'Graduate', 'Doctoral', 'Seminary'];

export default function ProgramsFilter({ programs }: { programs: Program[] }) {
  const [activeFilter, setActiveFilter] = useState('All programs');
  const filteredPrograms = activeFilter === 'All programs'
    ? programs
    : programs.filter((program) => [program.level, program.programType, program.title].filter(Boolean).some((value) => value!.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <>
      <aside className="programs-intro-aside">
        <span className="aside-label">Academic ladder</span>
        <div className="program-levels" role="group" aria-label="Filter programs by academic level">
          <button type="button" className={activeFilter === 'All programs' ? 'is-active' : ''} onClick={() => setActiveFilter('All programs')}>All programs</button>
          {filters.map((filter) => <button type="button" className={activeFilter === filter ? 'is-active' : ''} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}
        </div>
      </aside>

      <section className="programs-grid" aria-live="polite">
        {filteredPrograms.map((program, index) => {
          const disciplines = (program.disciplines || '')
            .split(/\n|,|\|/)
            .map((discipline) => discipline.trim())
            .filter(Boolean);

          return (
            <article className="programs-card" key={program.slug}>
              <div className="programs-card-top">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="program-card-level">{program.level || 'Program'}</span>
              </div>
              <div className="programs-card-body">
                <p className="programs-card-type">{program.programType || 'Program'}</p>
                <h2>{program.title}</h2>
                {disciplines.length > 0 && <ul className="programs-disciplines">{disciplines.map((discipline) => <li key={`${program.slug}-${discipline}`}>{discipline}</li>)}</ul>}
                <p className="programs-card-summary">{program.summary}</p>
                <p className="programs-card-meta">{program.duration || 'Flexible format'}</p>
                {program.curriculumUrl && <a href={program.curriculumUrl} target="_blank" rel="noreferrer">View curriculum <span>↗</span></a>}
                <Link href={`/programs/${program.slug}`}>Program details <span>↗</span></Link>
              </div>
            </article>
          );
        })}
        {filteredPrograms.length === 0 && <p className="empty-state">No programs match this academic level yet.</p>}
      </section>
    </>
  );
}
