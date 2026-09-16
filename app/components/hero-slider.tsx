'use client';

import { useEffect, useState } from 'react';

type Slide = {
  title: string;
  eyebrow?: string;
  imageUrl: string;
  imageAlt: string;
  youtubeUrl?: string | null;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!activeSlide) return null;

  return (
    <div className="hero-slider" aria-label="Featured stories">
      <div className="hero-slide" key={activeSlide.title}>
        <img src={activeSlide.imageUrl} alt={activeSlide.imageAlt} />
        <div className="hero-slide-shade" />
        <div className="hero-slide-caption">
          {activeSlide.eyebrow && <span>{activeSlide.eyebrow}</span>}
          <strong>{activeSlide.title}</strong>
          {activeSlide.youtubeUrl && (
            <a href={activeSlide.youtubeUrl} target="_blank" rel="noreferrer">
              Watch video <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      <div className="hero-slider-controls">
        <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)} aria-label="Previous slide">←</button>
        <div className="hero-slider-dots" aria-label="Choose slide">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              key={slide.title}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % slides.length)} aria-label="Next slide">→</button>
      </div>
    </div>
  );
}
