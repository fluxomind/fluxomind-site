import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso e Condições de Serviço da Fluxomind',
  alternates: {
    canonical: '/terms',
    languages: { 'pt-BR': '/terms', en: '/en/terms' },
  },
};

export default function TermsOfService() {
  const lastUpdated = '06 de Janeiro de 2026';

  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/terms" />

      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Legal</p>
          <h1 className="fx-serif fx-h1">Termos de Uso</h1>
        </div>
      </header>

      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-prose">
            <p>Última atualização: {lastUpdated}</p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar os serviços da Fluxomind (&quot;Serviços&quot;), incluindo nossa plataforma,
              aplicativos, APIs e integrações de mensagens (incluindo WhatsApp Business), você concorda
              em estar vinculado a estes Termos de Uso (&quot;Termos&quot;). Se você não concordar com estes Termos,
              não utilize nossos Serviços.
            </p>
            <p>
              Estes Termos constituem um acordo legal entre você e a FLUXOMIND LTDA, inscrita no
              CNPJ sob o nº 60.162.547/0001-15, com sede em São Paulo/SP, Brasil (&quot;Fluxomind&quot;, &quot;nós&quot;, &quot;nosso&quot; ou &quot;nossa&quot;).
            </p>

            <h2>2. Descrição dos Serviços</h2>
            <p>
              A Fluxomind oferece uma plataforma de inteligência artificial e automação que permite:
            </p>
            <ul>
              <li>Criação e gestão de automações inteligentes</li>
              <li>Integração com canais de comunicação, incluindo WhatsApp Business</li>
              <li>Desenvolvimento de chatbots e assistentes virtuais</li>
              <li>Análise de dados e geração de insights</li>
              <li>Automação de processos empresariais</li>
            </ul>

            <h2>3. Elegibilidade</h2>
            <p>
              Para utilizar nossos Serviços, você deve:
            </p>
            <ul>
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Ter capacidade legal para celebrar contratos vinculativos</li>
              <li>Não estar impedido de receber serviços sob as leis aplicáveis</li>
              <li>Representar uma empresa ou pessoa jurídica devidamente constituída, quando aplicável</li>
            </ul>

            <h2>4. Conta de Usuário</h2>
            <p>
              Para acessar determinados recursos dos Serviços, você precisará criar uma conta. Você é responsável por:
            </p>
            <ul>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li>Fornecer informações precisas e atualizadas</li>
            </ul>

            <h2>5. Uso de Mensagens e WhatsApp Business</h2>
            <p>
              Ao utilizar nossos Serviços de mensagens, incluindo integração com WhatsApp Business, você concorda em:
            </p>
            <ul>
              <li>
                <strong>Obter consentimento:</strong> Garantir que possui o consentimento explícito (opt-in)
                dos destinatários antes de enviar mensagens
              </li>
              <li>
                <strong>Respeitar preferências:</strong> Honrar solicitações de cancelamento (opt-out)
                imediatamente
              </li>
              <li>
                <strong>Conteúdo permitido:</strong> Não enviar spam, conteúdo ilegal, fraudulento,
                enganoso ou ofensivo
              </li>
              <li>
                <strong>Frequência adequada:</strong> Não enviar mensagens excessivas ou em horários
                inadequados
              </li>
              <li>
                <strong>Identificação clara:</strong> Identificar claramente sua empresa em todas
                as comunicações
              </li>
            </ul>
            <p>
              Você também concorda em cumprir as políticas da Meta/WhatsApp, incluindo a
              <a href="https://business.whatsapp.com/policy" target="_blank" rel="noopener noreferrer"> WhatsApp Business Messaging Policy</a> e
              os <a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer"> Termos de Serviço do WhatsApp Business</a>.
            </p>

            <h2>6. Uso Aceitável</h2>
            <p>
              Você concorda em não utilizar os Serviços para:
            </p>
            <ul>
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Infringir direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir vírus, malware ou código malicioso</li>
              <li>Coletar dados de usuários sem consentimento</li>
              <li>Realizar engenharia reversa ou descompilar o software</li>
              <li>Sobrecarregar ou interferir na infraestrutura dos Serviços</li>
              <li>Criar contas falsas ou se passar por outras pessoas</li>
              <li>Enviar comunicações não solicitadas ou spam</li>
              <li>Promover atividades ilegais, discriminatórias ou prejudiciais</li>
            </ul>

            <h2>7. Propriedade Intelectual</h2>
            <p>
              Todos os direitos de propriedade intelectual relacionados aos Serviços, incluindo
              software, design, marcas e conteúdo, pertencem à Fluxomind ou seus licenciadores.
              Você recebe uma licença limitada, não exclusiva e não transferível para utilizar os
              Serviços conforme estes Termos.
            </p>
            <p>
              Você mantém a propriedade de todo o conteúdo que criar ou carregar através dos Serviços,
              concedendo à Fluxomind uma licença para processar e exibir tal conteúdo conforme necessário
              para a prestação dos Serviços.
            </p>

            <h2>8. Privacidade e Proteção de Dados</h2>
            <p>
              O tratamento de seus dados pessoais é regido pela nossa{' '}
              <Link href="/privacidade">
                Política de Privacidade
              </Link>
              . Ao utilizar os Serviços, você concorda com a coleta e uso de dados conforme
              descrito na Política de Privacidade.
            </p>
            <p>
              A Fluxomind está comprometida com a conformidade com a Lei Geral de Proteção de Dados (LGPD)
              e outras legislações aplicáveis de proteção de dados.
            </p>

            <h2>9. Pagamentos e Assinaturas</h2>
            <p>
              Alguns Serviços podem exigir pagamento. Ao contratar Serviços pagos, você concorda em:
            </p>
            <ul>
              <li>Fornecer informações de pagamento precisas e atualizadas</li>
              <li>Pagar todas as taxas aplicáveis no vencimento</li>
              <li>Que as assinaturas serão renovadas automaticamente, salvo cancelamento prévio</li>
              <li>Que os preços podem ser alterados mediante aviso com 30 dias de antecedência</li>
            </ul>

            <h2>10. Limitação de Responsabilidade</h2>
            <p>
              Na extensão máxima permitida por lei:
            </p>
            <ul>
              <li>
                Os Serviços são fornecidos &quot;como estão&quot;, sem garantias de qualquer tipo
              </li>
              <li>
                A Fluxomind não será responsável por danos indiretos, incidentais, especiais ou
                consequenciais
              </li>
              <li>
                Nossa responsabilidade total não excederá o valor pago por você nos últimos 12 meses
              </li>
            </ul>

            <h2>11. Indenização</h2>
            <p>
              Você concorda em indenizar e isentar a Fluxomind, seus diretores, funcionários e
              parceiros de quaisquer reclamações, perdas ou danos decorrentes de: (a) seu uso dos
              Serviços; (b) violação destes Termos; (c) violação de direitos de terceiros; ou
              (d) conteúdo que você transmitir através dos Serviços.
            </p>

            <h2>12. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar seu acesso aos Serviços a qualquer momento, com ou sem
              motivo, mediante notificação. Você pode encerrar sua conta a qualquer momento através
              das configurações da conta ou entrando em contato conosco.
            </p>
            <p>
              Após a rescisão, seu direito de usar os Serviços cessará imediatamente. As disposições
              que, por sua natureza, devam sobreviver à rescisão, permanecerão em vigor.
            </p>

            <h2>13. Modificações</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações
              significativas serão comunicadas por e-mail ou através dos Serviços. O uso continuado
              dos Serviços após as modificações constitui aceitação dos novos Termos.
            </p>

            <h2>14. Lei Aplicável e Foro</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer
              disputa será submetida ao foro da comarca de São Paulo, SP, com exclusão de qualquer
              outro, por mais privilegiado que seja.
            </p>

            <h2>15. Disposições Gerais</h2>
            <ul>
              <li>
                <strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre
                você e a Fluxomind
              </li>
              <li>
                <strong>Renúncia:</strong> A falha em exercer qualquer direito não constitui
                renúncia a ele
              </li>
              <li>
                <strong>Separabilidade:</strong> Se qualquer disposição for considerada inválida,
                as demais permanecerão em vigor
              </li>
              <li>
                <strong>Cessão:</strong> Você não pode ceder seus direitos sem nosso consentimento
                prévio por escrito
              </li>
            </ul>

            <h2>16. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <p>
              <strong>FLUXOMIND LTDA</strong><br />
              CNPJ: 60.162.547/0001-15<br />
              São Paulo/SP — Brasil<br />
              E-mail: contato@fluxomind.com
            </p>
          </div>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
