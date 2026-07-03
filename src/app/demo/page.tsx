import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import BetaForm from '@/components/BetaForm';
import JourneyDemo from '@/components/JourneyDemo';
import { SIGNATURE } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Experimente — crie um app conversando',
  description:
    'Crie um app na sua frente: entregue uma planilha (ou descreva o problema), veja o rascunho vivo nascer, opere o pipeline e aprove o que vê. Demonstração interativa da jornada Fluxomind.',
};

// A demo assume a tela inteira como um sistema (decisão do fundador
// 2026-07-03): sem chrome de marketing — a topbar do shell (JourneyDemo)
// faz o papel de header, com saída para o site e o selo de fase.
// O funil continua: CTA final da jornada rola para #beta logo abaixo.
export default function DemoPage() {
  return (
    <div className="page-demo">
      <h1
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
        }}
      >
        Experimente — crie um app conversando
      </h1>

      <JourneyDemo />

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
