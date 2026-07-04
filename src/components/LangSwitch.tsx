import Link from 'next/link';

// Seletor de idioma do nav — globo + rótulo do idioma ALVO (clicou, trocou).
// `href` é o par exato da página no outro idioma (mesmo mapa do hreflang);
// cada página passa o seu. Discreto por design: cabe entre os links e o CTA.
export default function LangSwitch({
  href,
  target,
}: {
  href: string;
  target: 'EN' | 'PT';
}) {
  const lang = target === 'EN' ? 'en' : 'pt-BR';
  const title = target === 'EN' ? 'Read in English' : 'Ler em português';
  return (
    <Link href={href} className="langsw" lang={lang} title={title} aria-label={title}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
      </svg>
      {target}
    </Link>
  );
}
