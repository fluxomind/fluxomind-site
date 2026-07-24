import Image from 'next/image';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import LangSwitch from '@/components/LangSwitch';
import { NAV_LINKS } from '@/lib/nav';

interface Cta { label: string; href: string }

// Cabeçalho global. CTA primário de nav é sempre CTA.demo → /demo
// (message house §6; exceção: /demo usa CTA.beta → #beta).
// "Entrar" (PLATFORM_LOGIN) omitido enquanto a plataforma não lança
// (decisão do fundador 2026-07-02) — betas recebem a URL do time.
// ≤1040px: links colapsam no MobileNav (hambúrguer); ≤480px o CTA
// também vive só dentro do menu.
// `enHref`: par exato da página em inglês (mesmo mapa do hreflang);
// default /en cobre páginas sem par específico.
export default function SiteHeader({ cta, enHref = '/en' }: { cta: Cta; enHref?: string }) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Fluxomind — início">
          <Image
            src="/logoSVG/logo-dark.svg"
            alt="Fluxomind"
            width={292}
            height={49}
            className="brandlogo"
            priority
          />
        </Link>
        <div className="navlinks">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="navright">
          <LangSwitch href={enHref} target="EN" />
          <a className="btn btn-primary nav-cta" href={cta.href}>
            {cta.label}
          </a>
          <MobileNav cta={cta} links={[...NAV_LINKS, { href: enHref, label: 'English' }]} />
        </div>
      </div>
    </nav>
  );
}
