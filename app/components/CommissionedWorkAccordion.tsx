'use client';

import { useEffect, useRef, useState } from 'react';

const works = [
  {
    id: 'hunnu-tattoo',
    index: '01',
    name: 'Hunnu Tattoo Studio',
    meta: 'Online booking experience · 2026',
    summary: 'Үйлчилгээ, артист, өдөр цаг, санааны зураг, хүсэлт баталгаажуулалтыг нэг веб урсгалд нэгтгэсэн.',
    url: 'https://hunnutattoo.com/',
    address: 'hunnutattoo.com',
    features: ['Үйлчилгээ сонгох', 'Артист сонгох', 'Өдөр · цаг', 'Зураг хавсаргах', 'Хүсэлт баталгаажуулах'],
  },
  {
    id: 'dudu-prime',
    index: '02',
    name: 'Dudu Prime',
    meta: 'Real estate platform · 2026',
    summary: 'Хайлт, газрын зураг, хадгалалт, харьцуулалт, дэлгэрэнгүй мэдээллийг агентын нэг веб орчинд төвлөрүүлсэн.',
    url: 'https://gamu666.github.io/dudu-prime/',
    address: 'gamu666.github.io/dudu-prime',
    features: ['Ухаалаг хайлт', 'Газрын зураг', 'Хадгалсан зар', 'Харьцуулалт', 'Зарын дэлгэрэнгүй'],
  },
];

export function CommissionedWorkAccordion() {
  const [activeWork, setActiveWork] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!activeWork) return;

    const frame = window.requestAnimationFrame(() => {
      const item = itemRefs.current[activeWork];
      if (!item) return;

      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 52;
      const itemTop = window.scrollY + item.getBoundingClientRect().top - headerHeight - 10;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: itemTop, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeWork]);

  return (
    <div className="work-accordion ap-shell">
      {works.map((work) => {
        const isOpen = activeWork === work.id;
        const panelId = `${work.id}-panel`;

        return (
          <article
            className={`work-accordion__item${isOpen ? ' is-open' : ''}`}
            key={work.id}
            ref={(node) => { itemRefs.current[work.id] = node; }}
          >
            <button
              className="work-accordion__trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActiveWork(isOpen ? null : work.id)}
            >
              <span className="work-accordion__index">{work.index}</span>
              <span className="work-accordion__title">
                <span>{work.meta}</span>
                <strong>{work.name}</strong>
              </span>
              <span className="work-accordion__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </button>

            {isOpen && (
              <div className="work-accordion__panel" id={panelId}>
                <div className="work-accordion__intro">
                  <p>{work.summary}</p>
                  <ul aria-label={`${work.name} үндсэн боломжууд`}>
                    {work.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>

                <div className="work-live-browser">
                  <div className="work-live-browser__bar">
                    <span className="work-live-browser__lights"><i /><i /><i /></span>
                    <span className="work-live-browser__address">{work.address}</span>
                    <a href={work.url} target="_blank" rel="noreferrer" aria-label={`${work.name} сайтыг шинэ цонхонд нээх`}>↗</a>
                  </div>
                  <iframe
                    src={`${work.url}?embed=naiman-sar#top`}
                    title={`${work.name} live веб`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="fullscreen"
                  />
                </div>

                <a className="work-accordion__external" href={work.url} target="_blank" rel="noreferrer">
                  Live сайтыг бүтэн дэлгэцээр үзэх <span>↗</span>
                </a>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
