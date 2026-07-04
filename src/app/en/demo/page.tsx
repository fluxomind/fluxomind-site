import type { Metadata } from 'next';
import SiteFooterEn from '@/components/SiteFooterEn';
import DemoEn from '@/components/DemoEn';
import { CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Try it — create an app by talking',
  description:
    'Create an app in front of you: hand over a spreadsheet (or describe the problem), watch the living draft be born, operate the pipeline and approve what you see. Interactive demo of the Fluxomind creation journey.',
  alternates: {
    canonical: '/en/demo',
    languages: { 'pt-BR': '/demo', en: '/en/demo' },
  },
};

// Espelho EN de /demo (ADR-0006): tela cheia como um sistema, sem chrome de
// marketing — a topbar do JourneyDemo (copy EN) faz o papel de header. O fecho
// usa o contato EN (o BetaForm é pt; form EN é evolução futura).
export default function DemoPageEn() {
  return (
    <div className="page-demo" lang="en">
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

      <section className="offer" id="beta">
        <div className="wrap">
          <h2>Now with your real data</h2>
          <p className="lead">
            Tell us which process you want to delegate — the team builds your first
            self-operating app with you, no card and no commitment.
          </p>
          <div className="offerbtns">
            <a
              className="btn btn-primary btn-lg"
              href={PLATFORM_CONTACT_EN}
              data-track="en-demo-contact-cta"
            >
              {CTA_EN.contact}
            </a>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
