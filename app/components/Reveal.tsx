'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';

export function Reveal({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    // Keep server-rendered content readable; arm only offscreen entrances.
    if (node.getBoundingClientRect().top < window.innerHeight * .94) {
      setVisible(true);
      return;
    }
    node.dataset.motionReady = 'true';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      delete node.dataset.motionReady;
    };
  }, []);

  return <div ref={ref} className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`} {...props}>{children}</div>;
}
