import Image from 'next/image';
import Link from 'next/link';
import { PLATFORM_LOGIN } from '@/lib/platform';

type Cta = { label: string; href: string };

// Cabeçalho global — conecta as 3 trilhas em todas as páginas.
// O CTA primário muda por trilha (intenção diferente); o resto é consistente.
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
          <Link href="/plataforma">Plataforma</Link>
          <Link href="/enterprise">Enterprise</Link>
          <a href={PLATFORM_LOGIN}>Entrar</a>
        </div>
        <a className="btn btn-primary nav-cta" href={cta.href}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
