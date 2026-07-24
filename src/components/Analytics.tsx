'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

// Instrumentação global: pageview por rota + cliques em elementos com
// data-track="id" (funciona em server components — só o atributo).
// Montado uma vez no layout; não renderiza nada.
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track('pageview');
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('[data-track]');
      const id = el?.getAttribute('data-track');
      if (id) {track('click', { id });}
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => { document.removeEventListener('click', onClick, { capture: true }); };
  }, []);

  return null;
}
