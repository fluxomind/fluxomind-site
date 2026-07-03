import Image from 'next/image';
import Link from 'next/link';

type Cta = { label: string; href: string };

// Cabeçalho global. CTA primário de nav é sempre CTA.demo → /demo
// (message house §6; exceção: /demo usa CTA.beta → #beta).
// "Entrar" (PLATFORM_LOGIN) omitido enquanto a plataforma não lança
// (decisão do fundador 2026-07-02) — betas recebem a URL do time.
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
          <Link href="/#usos">O que resolvo</Link>
          <Link href="/demo">Experimente</Link>
          <Link href="/acelere">Acelere</Link>
          <Link href="/por-que">Por quê</Link>
          <Link href="/o-que-tem">O que faz</Link>
          <Link href="/seguranca">Segurança</Link>
          <Link href="/plataforma">Plataforma</Link>
          <Link href="/precos">Preços</Link>
        </div>
        <a className="btn btn-primary nav-cta" href={cta.href}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
