'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/nav';

// Menu mobile do cabeçalho: hambúrguer visível quando .navlinks colapsa
// (≤1040px). Painel overlay com os mesmos links do nav + o CTA da página.
export default function MobileNav({ cta }: { cta: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="mnav">
      <style>{CSS}</style>
      <button
        className="mnav-btn"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* portal: o backdrop-filter do nav criaria containing block e
          prenderia o position:fixed do painel dentro do cabeçalho */}
      {open &&
        createPortal(
          <div className="mnav-panel" role="dialog" aria-label="Menu de navegação">
            <style>{CSS}</style>
            <nav className="mnav-links" onClick={() => setOpen(false)}>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <a className="btn btn-primary mnav-cta" href={cta.href}>
                {cta.label}
              </a>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}

const CSS = `
.mnav { display: none; }
@media (max-width: 1040px) { .mnav { display: block; } }
.mnav-btn {
  border: 1px solid rgba(255,255,255,.18); background: none; color: #fff;
  width: 40px; height: 40px; border-radius: 10px; font-size: 17px;
  cursor: pointer; margin-left: 10px; line-height: 1;
}
.mnav-panel {
  position: fixed; inset: 64px 0 0 0; z-index: 60;
  background: rgba(10,11,14,.98); backdrop-filter: blur(10px);
  padding: 18px 24px; overflow-y: auto;
}
.mnav-links { display: flex; flex-direction: column; gap: 4px; }
.mnav-links a {
  color: #e6e9ee; font-size: 18px; font-weight: 600;
  padding: 13px 8px; border-bottom: 1px solid rgba(255,255,255,.07);
}
.mnav-links a:active { color: #fff; }
.mnav-cta {
  margin-top: 18px; text-align: center; border-bottom: none !important;
  font-size: 16px !important;
}
`;
