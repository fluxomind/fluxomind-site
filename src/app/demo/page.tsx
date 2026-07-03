import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import BetaForm from '@/components/BetaForm';
import JourneyDemo from '@/components/JourneyDemo';
import { CTA, SIGNATURE } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Experimente — crie um app conversando',
  description:
    'Crie um app na sua frente: entregue uma planilha (ou descreva o problema), veja o rascunho vivo nascer, opere o pipeline e aprove o que vê. Demonstração interativa da jornada Fluxomind.',
};

export default function DemoPage() {
  return (
    <div className="page-demo">
      <SiteHeader cta={{ label: CTA.beta, href: '#beta' }} />

      <section
        style={{
          background:
            'radial-gradient(900px 420px at 50% 0%, rgba(43,102,221,.28), transparent 60%), var(--ink)',
          color: '#fff',
          paddingBottom: 64,
        }}
      >
        <div className="wrap">
          <div className="center" style={{ paddingTop: 48 }}>
            <span className="pill">
              <span className="lz" /> Demonstração interativa · o produto que estamos construindo
            </span>
            <div className="kick" style={{ color: 'var(--sky)' }}>
              Experimente
            </div>
            <h1 style={{ color: '#fff' }}>Crie um app conversando.</h1>
            <p className="lead" style={{ color: '#CdD3Dc', marginTop: 14, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
              Você dirige: entregue uma planilha (ou descreva o problema), corrija as premissas,
              e receba um <strong style={{ color: '#fff' }}>rascunho vivo</strong> — que você
              opera antes de decidir ficar com ele. {SIGNATURE}
            </p>
          </div>
          <div style={{ maxWidth: 1080, margin: '34px auto 0' }}>
            <JourneyDemo />
          </div>
        </div>
      </section>

      <section className="offer" id="beta">
        <div className="wrap">
          <h2>Agora com os seus dados de verdade</h2>
          <p className="lead">
            Conte qual processo você quer delegar — o time monta o primeiro app operante com
            você, sem cartão e sem compromisso.
          </p>
          <BetaForm />
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
