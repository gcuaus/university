'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ProgramCard = {
  slug: string;
  title: string;
  summary?: string;
  level?: string;
  duration?: string;
  disciplines?: string;
  programType?: string;
  curriculumUrl?: string;
};

function getDisciplines(value?: string) {
  return (value || '')
    .split(/\n|,|\|/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function ProgramsCarousel({ programs }: { programs: ProgramCard[] }) {
  const slides = useMemo(() => {
    if (!programs.length) return [];
    return Array.from({ length: Math.ceil(programs.length / 3) }, (_, index) => programs.slice(index * 3, index * 3 + 3));
  }, [programs]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  if (!slides.length) {
    return <div className="program-carousel empty">Programs will appear here once they are added.</div>;
  }

  return (
    <div className="program-carousel">
      <div className="program-carousel-viewport">
        <div className="program-carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <div className="program-carousel-slide" key={`slide-${slideIndex}`}>
              {slide.map((program, cardIndex) => {
                const disciplines = getDisciplines(program.disciplines);
                const cardNumber = slideIndex * 3 + cardIndex + 1;

                return (
                  <article className="program-carousel-card" key={program.slug}>
                    <div className="program-carousel-card-header">
                      <span className="program-carousel-index">{String(cardNumber).padStart(2, '0')}</span>
                      <span className="program-carousel-level">{program.level || 'Program'}</span>
                    </div>

                    <div className="program-carousel-body">
                      <p className="program-carousel-type">{program.programType || 'Program'}</p>
                      <h3>{program.title}</h3>

                      {disciplines.length > 0 && (
                        <ul className="program-carousel-tags">
                          {disciplines.map((discipline) => (
                            <li key={`${program.slug}-${discipline}`}>{discipline}</li>
                          ))}
                        </ul>
                      )}

                      <p className="program-carousel-summary">{program.summary}</p>
                      <p className="program-carousel-meta">{program.duration || 'Flexible format'}</p>

                      <Link href={program.curriculumUrl || '/programs'} target={program.curriculumUrl ? '_blank' : undefined} rel={program.curriculumUrl ? 'noreferrer' : undefined}>
                        View curriculum <span>↗</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="program-carousel-controls">
          <button
            type="button"
            className="program-carousel-arrow"
            aria-label="Scroll to previous program slide"
            onClick={() => setCurrentSlide((previous) => (previous === 0 ? slides.length - 1 : previous - 1))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="program-carousel-dots" aria-label="Program carousel pagination">
            {slides.map((_, dotIndex) => (
              <button
                key={`dot-${dotIndex}`}
                type="button"
                className={dotIndex === currentSlide ? 'is-active' : ''}
                aria-label={`Go to slide ${dotIndex + 1}`}
                onClick={() => setCurrentSlide(dotIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="program-carousel-arrow"
            aria-label="Scroll to next program slide"
            onClick={() => setCurrentSlide((previous) => (previous + 1) % slides.length)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
