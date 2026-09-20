'use client';

import { useEffect, useRef, useState } from 'react';

const works = [
  { id: 'altan-od-cinematic', name: 'Алтан Од Cinematic', meta: 'Cinematic product experience · 2026', summary: 'Алтан Заан Анар болон Алтан Од Вьетнам гаврын бүтээгдэхүүнийг cinematic 3D хөдөлгөөн, дүрслэлээр танилцуулсан.', url: 'https://gamu666.github.io/altan-od-cinematic/', address: 'gamu666.github.io/altan-od-cinematic', poster: null, gradient: 'radial-gradient(circle at 50% 28%, rgba(164,59,28,.72), transparent 38%), linear-gradient(135deg, #180a12 0%, #512015 48%, #210a22 100%)' },
  { id: 'hunnu-tattoo', name: 'Hunnu Tattoo Studio', meta: 'Online booking experience · 2026', summary: 'Үйлчилгээ, артист, өдөр цаг, санааны зураг, хүсэлт баталгаажуулалтыг нэг веб урсгалд нэгтгэсэн.', url: 'https://hunnutattoo.com/', address: 'hunnutattoo.com', poster: '/work/hunnu-website-booking.png', gradient: 'radial-gradient(circle at 52% 28%, rgba(132,69,47,.64), transparent 40%), linear-gradient(135deg, #150f12 0%, #3d211e 50%, #171319 100%)' },
  { id: 'dudu-prime', name: 'Dudu Prime', meta: 'Real estate platform · 2026', summary: 'Хайлт, газрын зураг, хадгалалт, харьцуулалт, дэлгэрэнгүй мэдээллийг агентын нэг веб орчинд төвлөрүүлсэн.', url: 'https://gamu666.github.io/dudu-prime/', address: 'gamu666.github.io/dudu-prime', poster: '/work/dudu-prime-home.png', gradient: 'radial-gradient(circle at 52% 25%, rgba(31,92,184,.72), transparent 42%), linear-gradient(135deg, #080f22 0%, #102e69 52%, #07172d 100%)' },
];

function LivePreview({ work, active }: { work: typeof works[number]; active: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(.5);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!active) setLoaded(false);
  }, [active]);

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
      <div className={`work-gallery__viewport${loaded ? ' is-loaded' : ''}`} ref={viewport}>
        <div className="work-gallery__placeholder" style={{ background: work.gradient }} aria-hidden="true">
          {work.poster ? <img src={work.poster} alt="" loading="lazy" /> : <strong>АЛТАН ОД</strong>}
          <span>{active ? 'Live preview ачаалж байна…' : work.name}</span>
        </div>
        {active && (
          <iframe
            src={work.url}
            title={`${work.name} live веб`}
            loading="eager"
            tabIndex={0}
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ transform: `scale(${scale})` }}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}

export function CommissionedWorkAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: number) => setActiveIndex((current) => (current + direction + works.length) % works.length);
  return (
    <div className="work-gallery" role="region" aria-label="Захиалгат ажлууд" aria-roledescription="carousel">
      <div className="work-gallery__atmosphere" aria-hidden="true">
        {works.map((work, index) => <span className={index === activeIndex ? 'is-active' : ''} key={work.id} style={{ background: work.gradient }} />)}
      </div>
      <div className="work-gallery__stage" id="work-gallery-track" tabIndex={0} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
        }}>
          {works.map((work, index) => {
            const rawPosition = (index - activeIndex + works.length) % works.length;
            const position = rawPosition === 0 ? 'active' : rawPosition === 1 ? 'next' : 'previous';
            return <article className={`work-gallery__card work-gallery__card--${work.id} is-${position}`} aria-hidden={position !== 'active'} key={work.id}>
              <LivePreview work={work} active={position === 'active'} />
              <div className="work-gallery__copy"><p className="work-gallery__meta">{work.meta}</p><h3>{work.name}</h3><p>{work.summary}</p><a href={work.url} target="_blank" rel="noreferrer">Сайтыг нээх ↗</a></div>
            </article>;
          })}
        <div className="work-gallery__controls" aria-label="Захиалгат ажлын удирдлага">
          <button onClick={() => move(-1)} aria-label="Өмнөх ажил" aria-controls="work-gallery-track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg></button>
          <button onClick={() => move(1)} aria-label="Дараагийн ажил" aria-controls="work-gallery-track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg></button>
        </div>
      </div>
      <p className="work-gallery__position" aria-live="polite"><span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(works.length).padStart(2, '0')}</p>
    </div>
  );
}
