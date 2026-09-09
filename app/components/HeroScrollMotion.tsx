'use client';

import { useEffect } from 'react';

export function HeroScrollMotion() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.hero-scroll-stage');
    if (!stage) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const render = () => {
      frame = 0;
      const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 52;
      const hold = parseFloat(getComputedStyle(stage).getPropertyValue('--intro-hold')) || 180;
      const travel = Math.max(0, header - stage.getBoundingClientRect().top);
      // Finish the entrance before the shared scene releases into normal flow.
      // Direct scroll progress prevents catch-up, overshoot and settling jumps.
      const progress = Math.min(1, travel / (hold * 0.8));
      const eased = progress * progress * (3 - 2 * progress);
      stage.style.setProperty('--about-enter', preference.matches ? '1' : String(eased));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const configure = () => {
      stage.classList.toggle('has-intro-motion', !preference.matches);
      render();
    };
    configure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', configure);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', configure);
      cancelAnimationFrame(frame);
      stage.classList.remove('has-intro-motion');
      stage.style.removeProperty('--about-enter');
    };
  }, []);
  return null;
}
