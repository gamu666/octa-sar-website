'use client';

import { useEffect } from 'react';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function HomeRedirect({ anchor }: { anchor: string }) {
  const destination = `${assetBase}/#${anchor}`;

  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="route-redirect">
      <p>Нүүр хуудас руу шилжиж байна…</p>
      <a href={destination}>Үргэлжлүүлэх</a>
    </main>
  );
}
