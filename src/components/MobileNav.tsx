'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/nav';

// Menu mobile do cabeçalho: hambúrguer visível quando .navlinks colapsa
// (≤1040px). Painel overlay com os mesmos links do nav + o CTA da página.
// `links`/`labels` opcionais: o chrome EN reusa o componente (ADR-0006).
interface NavLink { readonly href: string; readonly label: string }

export default function MobileNav({
  cta,
  links = NAV_LINKS,
  labels = { open: 'Abrir menu', close: 'Fechar menu', dialog: 'Menu de navegação' },
}: {
  cta: { label: string; href: string };
  links?: readonly NavLink[];
  labels?: { open: string; close: string; dialog: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {return;}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {setOpen(false);}
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
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        onClick={() => { setOpen((v) => !v); }}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* portal: o backdrop-filter do nav criaria containing block e
          prenderia o position:fixed do painel dentro do cabeçalho */}
      {open &&
        createPortal(
          <div className="mnav-panel" role="dialog" aria-label={labels.dialog}>
            <style>{CSS}</style>
            <nav className="mnav-links" onClick={() => { setOpen(false); }}>
              {links.map((l) => (
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
