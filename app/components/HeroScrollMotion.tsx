'use client';

import { useEffect } from 'react';

export function HeroScrollMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.apple-hero--scroll-motion');
    const stage = hero?.closest<HTMLElement>('.hero-scroll-stage');
    const aboutCopy = document.querySelector<HTMLElement>('.ap-statement__reveal');
    if (!hero || !stage || !aboutCopy || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let current = 0;
    let target = 0;
    let currentAboutOffset = 0;
    let targetAboutOffset = 0;
    let previousTime = 0;

    const measure = () => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 52;
      const distance = Math.max(1, stage.offsetHeight - hero.offsetHeight);
      const rawProgress = Math.min(1, Math.max(0, (headerHeight - stage.getBoundingClientRect().top) / distance));

      // Keep the hero still while the About copy first rises into the white
      // space. Only the second part of the gesture dismisses the blue scene.
      const exitStart = 0.68;
      const exitEnd = 1;
      const exitProgress = Math.min(1, Math.max(0, (rawProgress - exitStart) / (exitEnd - exitStart)));

      // Let the copy travel into the white band, hold it there, then release it
      // upward at a slower rate as the hero exits. This creates a clear
      // content-first, scene-second hierarchy instead of a simultaneous fade.
      const scrollDistance = rawProgress * distance;
      const introTravel = Math.min(112, Math.max(82, window.innerHeight * 0.14));
      const exitStartDistance = exitStart * distance;
      targetAboutOffset = scrollDistance <= introTravel
        ? 0
        : scrollDistance <= exitStartDistance
          ? scrollDistance - introTravel
          : (exitStartDistance - introTravel) + (scrollDistance - exitStartDistance) * 0.35;

      // Smoothstep gives the transition the precise ease-in/ease-out character
      // used by platform motion without disconnecting it from the user's scroll.
      target = exitProgress * exitProgress * (3 - 2 * exitProgress);

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.7;
      previousTime = time;
      const blend = 1 - Math.exp(-elapsed / 88);
      current += (target - current) * blend;
      currentAboutOffset += (targetAboutOffset - currentAboutOffset) * blend;

      if (Math.abs(target - current) < 0.001) current = target;
      if (Math.abs(targetAboutOffset - currentAboutOffset) < 0.1) currentAboutOffset = targetAboutOffset;
      hero.style.setProperty('--hero-scroll', current.toFixed(4));
      aboutCopy.style.setProperty('--about-counter-y', `${currentAboutOffset.toFixed(2)}px`);
      hero.classList.toggle('is-exiting', current > 0.58);

      if (current !== target || currentAboutOffset !== targetAboutOffset) {
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
      aboutCopy.style.removeProperty('--about-counter-y');
      hero.classList.remove('is-exiting');
    };
  }, []);

  return null;
}
