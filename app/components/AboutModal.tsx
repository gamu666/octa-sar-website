'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const companyRelationship = 'Naimansar нь ОКТА САР ХХК-ийн үйл ажиллагааны нэр юм.';

export function AboutModal({ contact = false }: { contact?: boolean }) {
  const label = contact ? 'Холбоо барих' : 'Бидний тухай';
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const close = () => {
    const card = dialog.current;
    if (!card || timer.current) return;
    card.dataset.closing = 'true';
    timer.current = setTimeout(() => {
      card.close();
      setOpen(false);
      delete card.dataset.closing;
      timer.current = null;
      trigger.current?.focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180);
  };

  return (
    <>
      <button ref={trigger} className="about-trigger" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{label}</button>
      {open && createPortal(<dialog ref={(node) => { dialog.current = node; if (node && !node.open) node.showModal(); }} className={`company-modal${contact ? ' company-modal--contact' : ''}`} aria-labelledby={titleId} aria-describedby={descriptionId}
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}>
        <button className="company-modal__close" type="button" aria-label={`${label} цонхыг хаах`} autoFocus onClick={close}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        {contact ? <>
          <p className="company-modal__eyebrow">Холбоо барих</p>
          <h2 id={titleId}>Ярилцаад эхэлье.</h2>
          <p id={descriptionId}>Төсөл, санаагаа хуваалцах эсвэл хамтран ажиллах бол өөрт тохирох сувгаар холбогдоорой.</p>
          <div className="company-modal__contacts">
            <a href="tel:+97699250070"><span>Утас</span><strong>+976 9925 0070</strong><i>Залгах ↗</i></a>
            <a href="mailto:gaorm0206@gmail.com"><span>Имэйл</span><strong>gaorm0206@gmail.com</strong><i>Имэйл бичих ↗</i></a>
            <a href="https://www.instagram.com/naiman__sar/" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@naiman__sar</strong><i>Нээх ↗</i></a>
            <a href="https://www.facebook.com/profile.php?id=61594140354144" target="_blank" rel="noreferrer"><span>Facebook</span><strong>НАЙМАН САР</strong><i>Нээх ↗</i></a>
          </div>
        </> : <>
        <p className="company-modal__eyebrow">Бидний тухай</p>
        <h2 id={titleId}>Санааг бодит болгоно.</h2>
        <p id={descriptionId}>НАЙМАН САР нь веб систем, дижитал бүтээгдэхүүн, брэндийн шийдэл бүтээдэг. Бид стратеги, дизайн, технологийг нэгтгэн санааг хэрэглэхэд хялбар, үнэ цэнтэй бүтээгдэхүүн болгоно.</p>
        <section className="company-modal__info" aria-label="Компанийн мэдээлэл">
          <h3>Компанийн мэдээлэл</h3>
          <dl><div><dt>Хуулийн этгээд</dt><dd>ОКТА САР ХХК</dd></div><div><dt>Үйл ажиллагааны нэр</dt><dd>Naimansar</dd></div></dl>
        </section>
        <p className="company-modal__legal">{companyRelationship}</p>
        </>}
      </dialog>, document.body)}
    </>
  );
}
