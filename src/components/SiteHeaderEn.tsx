import Image from 'next/image';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import LangSwitch from '@/components/LangSwitch';
import { CTA_EN } from '@/lib/messages-en';

// Chrome EN — mesmo padrão visual do SiteHeader pt (nav escura sticky do
// globals.css). O nav cresce conforme as páginas EN entram (roadmap do
// ADR-0006). Sem MobileNav por ora: ≤1040px os links colapsam via CSS e o
// CTA permanece; menu hambúrguer EN entra quando o nav tiver mais itens.
const NAV_EN = [
  { href: '/en/use-cases', label: 'Use cases' },
  { href: '/en/self-operating-app', label: 'What it is' },
  { href: '/en/what-it-does', label: 'What it does' },
  { href: '/en/security', label: 'Security' },
  { href: '/en/accelerate', label: 'Accelerate' },
  { href: '/en/platform', label: 'Platform' },
  { href: '/en/pricing', label: 'Pricing' },
] as const;

export default function SiteHeaderEn({ ptHref }: { ptHref: string }) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/en" className="brand" aria-label="Fluxomind — English home">
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
          {NAV_EN.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="navright">
          <LangSwitch href={ptHref} target="PT" />
          <Link className="btn btn-primary nav-cta" href="/en/demo">
            {CTA_EN.demo}
          </Link>
          <MobileNav
            cta={{ label: CTA_EN.demo, href: '/demo' }}
            links={[...NAV_EN, { href: ptHref, label: 'Português' }]}
            labels={{ open: 'Open menu', close: 'Close menu', dialog: 'Navigation menu' }}
          />
        </div>
      </div>
    </nav>
  );
}
