import Image from 'next/image';
import Link from 'next/link';

// Rodapé global — espelha os rótulos do cabeçalho e mantém info legal.
export default function SiteFooter({ tagline }: { tagline: string }) {
  return (
    <footer>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Fluxomind — início">
          <Image
            src="/logoSVG/logo-dark.svg"
            alt="Fluxomind"
            width={292}
            height={49}
            className="brandlogo"
          />
        </Link>
        <div className="footlinks">
          <Link href="/">Início</Link>
          <Link href="/o-que-tem">O que faz</Link>
          <Link href="/seguranca">Segurança</Link>
          <Link href="/acelere">Acelere</Link>
          <Link href="/plataforma">Plataforma</Link>
          <Link href="/por-que">Por quê</Link>
          <Link href="/precos">Preços</Link>
          <Link href="/terms">Termos de Uso</Link>
        </div>
        <div className="footmeta">
          <div>{tagline}</div>
          <div>© 2026 Fluxomind · FLUXOMIND LTDA — CNPJ: 60.162.547/0001-15</div>
        </div>
      </div>
    </footer>
  );
}
