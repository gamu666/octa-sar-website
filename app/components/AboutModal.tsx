'use client';

import { useId, useRef } from 'react';

export const companyRelationship = 'Naimansar нь ОКТА САР ХХК-ийн үйл ажиллагааны нэр юм.';

export function AboutModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const close = () => {
    const card = dialog.current;
    if (!card || timer.current) return;
    card.dataset.closing = 'true';
    timer.current = setTimeout(() => {
      card.close();
      delete card.dataset.closing;
      timer.current = null;
      trigger.current?.focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180);
  };

  return (
    <>
      <button ref={trigger} className="about-trigger" type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Бидний тухай</button>
      <dialog ref={dialog} className="company-modal" aria-labelledby={titleId} aria-describedby={descriptionId}
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}>
        <button className="company-modal__close" type="button" aria-label="Бидний тухай цонхыг хаах" autoFocus onClick={close}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <p className="company-modal__eyebrow">Бидний тухай</p>
        <h2 id={titleId}>НАЙМАН САР</h2>
        <p id={descriptionId}>Бид санааг бодит бүтээгдэхүүн болгох үе шат бүрд стратеги, дизайн, технологийн шийдлийг нэгдсэн байдлаар хэрэгжүүлдэг.</p>
        <p className="company-modal__legal">{companyRelationship}</p>
      </dialog>
    </>
  );
}
