'use client';

import { useEffect } from 'react';

export function HeroScrollMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.apple-hero--scroll-motion');
    const stage = hero?.closest<HTMLElement>('.hero-scroll-stage');
    if (!hero || !stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let current = 0;
    let target = 0;
    let previousTime = 0;

    const measure = () => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 52;
      const distance = Math.max(1, stage.offsetHeight - hero.offsetHeight);
      const rawProgress = Math.min(1, Math.max(0, (headerHeight - stage.getBoundingClientRect().top) / distance));

      // Smoothstep gives the transition the precise ease-in/ease-out character
      // used by platform motion without disconnecting it from the user's scroll.
      target = rawProgress * rawProgress * (3 - 2 * rawProgress);

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.7;
      previousTime = time;
      const blend = 1 - Math.exp(-elapsed / 88);
      current += (target - current) * blend;

      if (Math.abs(target - current) < 0.001) current = target;
      hero.style.setProperty('--hero-scroll', current.toFixed(4));
      hero.classList.toggle('is-exiting', current > 0.58);

      if (current !== target) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
        previousTime = 0;
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
      hero.classList.remove('is-exiting');
    };
  }, []);

  return null;
}
