'use client';

import { useState } from 'react';

type ProgramPath = {
  slug: string;
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

type FilterLabels = Record<'all' | 'associate' | 'undergraduate' | 'graduate' | 'doctoral' | 'seminary', string>;

export default function ProgramsFilter({
  programs,
  labels,
  countLabel,
  curriculumLabel,
  detailsLabel,
  emptyMessage,
  levelPrefix,
}: {
  programs: ProgramPath[];
  labels: FilterLabels;
  countLabel: string;
  curriculumLabel: string;
  detailsLabel: string;
  emptyMessage: string;
  levelPrefix: string;
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = Object.entries(labels)
    .filter(([id]) => id === 'all' || programs.some((program) => program.filter === id))
    .map(([id, label]) => ({ id, label }));
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
      <p aria-live="polite" className="program-filter-count">{visiblePrograms.length} {countLabel}</p>
      {visiblePrograms.length > 0 ? (
        <div className="pathway-grid">
          {visiblePrograms.map((program) => (
            <article className="pathway-card" key={program.slug}>
              <span className="card-index">{program.level} · {levelPrefix} {program.level}</span>
              <p className="pathway-category">{program.category}</p>
              <h3>{program.title}</h3>
              {program.fields && <p className="pathway-fields">{program.fields}</p>}
              <p>{program.description}</p>
              {program.credential && <span className="pathway-credential">{program.credential}</span>}
              <div className="pathway-links">
                {program.curriculum && <a href={program.curriculum} target="_blank" rel="noreferrer">{curriculumLabel} <span>↗</span></a>}
                <a href={program.details}>{detailsLabel} <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="program-filter-empty">{emptyMessage}</p>
      )}
    </>
  );
}