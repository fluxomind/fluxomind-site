import Image from 'next/image';
import Link from 'next/link';

// Rodapé global — também conecta as 3 trilhas e mantém info legal.
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
          <Link href="/plataforma">Plataforma</Link>
          <Link href="/enterprise">Enterprise</Link>
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
