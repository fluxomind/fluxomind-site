import type { Metadata } from 'next';
import SiteFooterEn from '@/components/SiteFooterEn';
import BetaFormEn from '@/components/BetaFormEn';
import DemoEn from '@/components/DemoEn';

export const metadata: Metadata = {
  title: 'Try it — create an app by talking',
  description:
    'Create an app in front of you: hand over a spreadsheet (or describe the problem), watch the living draft be born, operate the pipeline and approve what you see. Interactive demo of the Fluxomind creation journey.',
  alternates: {
    canonical: '/en/demo',
    languages: { 'pt-BR': '/demo', en: '/en/demo' },
  },
};

// Espelho EN de /demo (ADR-0006): a demo assume a tela inteira como um sistema
// — sem chrome de marketing, a topbar do shell (JourneyDemo, copy EN) faz o
// papel de header, com saída para o site e o selo de fase. O funil continua: o
// CTA final da jornada rola para #beta logo abaixo, agora com o form EN.
export default function DemoPageEn() {
  return (
    <div className="fx page-demo" lang="en">
      <h1
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
        }}
      >
        Try it — create an app by talking
      </h1>

      <DemoEn />

      <section className="fx-sec fx-offer" id="beta">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>
            The next step
          </p>
          <h2 className="fx-serif fx-h2">Now with your real data</h2>
          <p className="fx-body" style={{ margin: '0 auto 4px' }}>
            The platform is in private beta &mdash; the open launch is coming soon. Join the
            launch list and tell us which process you&rsquo;d hand off first: the first in
            line get early access, with the team building your first self-operating app right
            alongside you &mdash; no card, no commitment.
          </p>
          <BetaFormEn />
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
