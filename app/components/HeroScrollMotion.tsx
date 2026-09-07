'use client';

import { useEffect } from 'react';

export function HeroScrollMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.apple-hero--scroll-motion');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let current = 0;
    let target = 0;

    const measure = () => {
      const distance = hero.offsetHeight || 692;
      target = Math.min(1, Math.max(0, window.scrollY / distance));

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const render = () => {
      current += (target - current) * 0.16;

      if (Math.abs(target - current) < 0.001) current = target;
      hero.style.setProperty('--hero-scroll', current.toFixed(4));

      if (current !== target) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (frame) window.cancelAnimationFrame(frame);
      hero.style.removeProperty('--hero-scroll');
    };
  }, []);

  return null;
}
