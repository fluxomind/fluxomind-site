import Image from 'next/image';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import { NAV_LINKS } from '@/lib/nav';

type Cta = { label: string; href: string };

// Cabeçalho global. CTA primário de nav é sempre CTA.demo → /demo
// (message house §6; exceção: /demo usa CTA.beta → #beta).
// "Entrar" (PLATFORM_LOGIN) omitido enquanto a plataforma não lança
// (decisão do fundador 2026-07-02) — betas recebem a URL do time.
// ≤1040px: links colapsam no MobileNav (hambúrguer); ≤480px o CTA
// também vive só dentro do menu.
export default function SiteHeader({ cta }: { cta: Cta }) {
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
          <a className="btn btn-primary nav-cta" href={cta.href}>
            {cta.label}
          </a>
          <MobileNav cta={cta} />
        </div>
      </div>
    </nav>
  );
}
