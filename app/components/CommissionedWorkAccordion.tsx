'use client';

import { useLayoutEffect, useRef, useState } from 'react';

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
  const [frameVersion, setFrameVersion] = useState(0);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useLayoutEffect(() => {
    if (!activeWork) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootScrollBehavior = root.style.scrollBehavior;
    const previousRootOverflowAnchor = root.style.overflowAnchor;
    const previousBodyOverflowAnchor = body.style.overflowAnchor;

    // The page normally uses smooth scrolling. While one large live preview is
    // collapsing and the next is opening, that animation makes the browser aim
    // at a stale document position. Keep the clicked row fixed until the new
    // layout has completely settled.
    root.style.scrollBehavior = 'auto';
    root.style.overflowAnchor = 'none';
    body.style.overflowAnchor = 'none';

    const scrollToActiveItem = () => {
      const item = itemRefs.current[activeWork];
      if (!item) return;

      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 52;
      const offset = item.getBoundingClientRect().top - headerHeight - 10;

      if (Math.abs(offset) > 1) {
        window.scrollBy({ top: offset, behavior: 'auto' });
      }
    };

    scrollToActiveItem();
    const frame = window.requestAnimationFrame(scrollToActiveItem);

    // Cross-origin iframes can finish their first layout a little later. These
    // bounded corrections prevent both 01 and 02 from losing their heading.
    const correctionTimers = [60, 220, 520, 900].map((delay) =>
      window.setTimeout(scrollToActiveItem, delay),
    );

    const restoreTimer = window.setTimeout(() => {
      root.style.scrollBehavior = previousRootScrollBehavior;
      root.style.overflowAnchor = previousRootOverflowAnchor;
      body.style.overflowAnchor = previousBodyOverflowAnchor;
    }, 950);

    return () => {
      window.cancelAnimationFrame(frame);
      correctionTimers.forEach(window.clearTimeout);
      window.clearTimeout(restoreTimer);
      root.style.scrollBehavior = previousRootScrollBehavior;
      root.style.overflowAnchor = previousRootOverflowAnchor;
      body.style.overflowAnchor = previousBodyOverflowAnchor;
    };
  }, [activeWork]);

  function toggleWork(workId: string) {
    if (activeWork === workId) {
      setActiveWork(null);
      return;
    }

    setFrameVersion((version) => version + 1);
    setActiveWork(workId);
  }

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
              onClick={() => toggleWork(work.id)}
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
                    key={`${work.id}-${frameVersion}`}
                    src={`${work.url}?embed=naiman-sar&view=${frameVersion}`}
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
