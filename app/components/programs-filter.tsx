'use client';

import { useState } from 'react';

type ProgramPath = {
  level: string;
  category: string;
  filter: string;
  title: string;
  fields: string;
  description: string;
  credential: string;
  curriculum: string;
  details: string;
};

const filters = [
  { id: 'all', label: 'All programs' },
  { id: 'associate', label: 'Associate' },
  { id: 'undergraduate', label: 'Undergraduate' },
  { id: 'graduate', label: 'Graduate' },
  { id: 'doctoral', label: 'Doctoral' },
  { id: 'seminary', label: 'Seminary' },
];

export default function ProgramsFilter({ programs }: { programs: ProgramPath[] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const visiblePrograms = activeFilter === 'all'
    ? programs
    : programs.filter((program) => program.filter === activeFilter);

  return (
    <>
      <div aria-label="Filter programs" className="program-filters" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            className="program-filter"
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="program-filter-count">{visiblePrograms.length} programs</p>
      {visiblePrograms.length > 0 ? (
        <div className="pathway-grid">
          {visiblePrograms.map((program) => (
            <article className="pathway-card" key={program.level}>
              <span className="card-index">{program.level} · LEVEL {program.level}</span>
              <p className="pathway-category">{program.category}</p>
              <h3>{program.title}</h3>
              <p className="pathway-fields">{program.fields}</p>
              <p>{program.description}</p>
              <span className="pathway-credential">{program.credential}</span>
              <div className="pathway-links">
                <a href={program.curriculum} target="_blank" rel="noreferrer">View curriculum <span>↗</span></a>
                <a href={program.details}>Program details <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="program-filter-empty">No programs in this category.</p>
      )}
    </>
  );
}