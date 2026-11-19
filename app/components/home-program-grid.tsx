'use client';

import Link from 'next/link';
import { useState } from 'react';

type HomeProgram = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  detailsUrl: string;
};

export default function HomeProgramGrid({ programs }: { programs: HomeProgram[] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const visiblePrograms = programs.slice(0, visibleCount);

  return (
    <>
      <div className="program-grid">
        {visiblePrograms.map((program, index) => (
          <Link className="program-card" href={program.detailsUrl} key={program.slug}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p className="program-category">{program.category}</p>
            <h3>{program.title}</h3>
            <p>{program.summary}</p>
            <span className="program-card-link">View program <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>
      {visibleCount < programs.length && (
        <button
          className="button outline program-load-more"
          onClick={() => setVisibleCount((count) => count + 3)}
          type="button"
        >
          Load more programs
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </>
  );
}
