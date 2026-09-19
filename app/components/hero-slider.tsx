'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

type Slide = {
  title: string;
  eyebrow?: string;
  imageUrl: string;
  imageAlt: string;
  youtubeUrl?: string | null;
};

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServer() {
  return false;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );
  const activeSlide = slides[activeIndex] ?? slides[0];
  const autoplay = slides.length > 1 && !hovered && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [autoplay, slides.length]);

  if (!activeSlide) return null;

  return (
    <section
      className="hero-slider"
      aria-label="Featured stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
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
        <button
          type="button"
          onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="hero-slider-dots" role="group" aria-label="Choose slide">
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
        <button
          type="button"
          onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}
          aria-label="Next slide"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}