'use client';

import { useEffect, useRef, useState } from 'react';

const works = [
  { id: 'hunnu-tattoo', name: 'Hunnu Tattoo Studio', meta: 'Online booking experience · 2026', summary: 'Үйлчилгээ, артист, өдөр цаг, санааны зураг, хүсэлт баталгаажуулалтыг нэг веб урсгалд нэгтгэсэн.', url: 'https://hunnutattoo.com/', address: 'hunnutattoo.com' },
  { id: 'dudu-prime', name: 'Dudu Prime', meta: 'Real estate platform · 2026', summary: 'Хайлт, газрын зураг, хадгалалт, харьцуулалт, дэлгэрэнгүй мэдээллийг агентын нэг веб орчинд төвлөрүүлсэн.', url: 'https://gamu666.github.io/dudu-prime/', address: 'gamu666.github.io/dudu-prime' },
];

function LivePreview({ work }: { work: typeof works[number] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(.5);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1200));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="work-gallery__browser">
      <div className="work-gallery__bar">
        <span aria-hidden="true">● ● ●</span><span>{work.address}</span>
        <a href={work.url} target="_blank" rel="noreferrer" aria-label={`${work.name} сайтыг нээх`}>↗</a>
      </div>
      <div className="work-gallery__viewport" ref={viewport}>
        <iframe src={work.url} title={`${work.name} live веб`} loading="eager" referrerPolicy="strict-origin-when-cross-origin" style={{ transform: `scale(${scale})` }} />
      </div>
    </div>
  );
}

export function CommissionedWorkAccordion() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => setEdges({ start: node.scrollLeft < 4, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4 });
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); node.removeEventListener('scroll', update); };
  }, []);
  const move = (direction: number) => {
    const node = track.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement;
    node.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return (
    <div className="work-gallery" role="region" aria-label="Захиалгат ажлууд">
      <div id="work-gallery-track" className="work-gallery__track" ref={track} tabIndex={0} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
        {works.map((work) => (
          <article className="work-gallery__card" key={work.id}>
            <LivePreview work={work} />
            <div className="work-gallery__copy"><p className="work-gallery__meta">{work.meta}</p><h3>{work.name}</h3><p>{work.summary}</p><a href={work.url} target="_blank" rel="noreferrer">Сайтыг нээх ↗</a></div>
          </article>
        ))}
      </div>
      <div className="work-gallery__controls ap-shell">
        <button onClick={() => move(-1)} disabled={edges.start} aria-label="Өмнөх ажил" aria-controls="work-gallery-track">‹</button>
        <button onClick={() => move(1)} disabled={edges.end} aria-label="Дараагийн ажил" aria-controls="work-gallery-track">›</button>
      </div>
    </div>
  );
}
