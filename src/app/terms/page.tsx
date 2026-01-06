import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso - FluxoMind',
  description: 'Termos de Uso e Condições de Serviço da FluxoMind',
};

export default function TermsOfService() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = '06 de Janeiro de 2026';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <img src="/logoSVG/logo-light.svg" alt="FluxoMind" className="h-8 w-auto" />
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-gray-500 mb-8">
            Última atualização: {lastUpdated}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-600 mb-4">
              Ao acessar ou utilizar os serviços da FluxoMind (&quot;Serviços&quot;), incluindo nossa plataforma,
              aplicativos, APIs e integrações de mensagens (incluindo WhatsApp Business), você concorda
              em estar vinculado a estes Termos de Uso (&quot;Termos&quot;). Se você não concordar com estes Termos,
              não utilize nossos Serviços.
            </p>
            <p className="text-gray-600">
              Estes Termos constituem um acordo legal entre você e a FLUXOMIND LTDA, inscrita no
              CNPJ sob o nº 60.162.547/0001-15, com sede no Brasil (&quot;FluxoMind&quot;, &quot;nós&quot;, &quot;nosso&quot; ou &quot;nossa&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descrição dos Serviços</h2>
            <p className="text-gray-600 mb-4">
              A FluxoMind oferece uma plataforma de inteligência artificial e automação que permite:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Criação e gestão de automações inteligentes</li>
              <li>Integração com canais de comunicação, incluindo WhatsApp Business</li>
              <li>Desenvolvimento de chatbots e assistentes virtuais</li>
              <li>Análise de dados e geração de insights</li>
              <li>Automação de processos empresariais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Elegibilidade</h2>
            <p className="text-gray-600 mb-4">
              Para utilizar nossos Serviços, você deve:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Ter capacidade legal para celebrar contratos vinculativos</li>
              <li>Não estar impedido de receber serviços sob as leis aplicáveis</li>
              <li>Representar uma empresa ou pessoa jurídica devidamente constituída, quando aplicável</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Conta de Usuário</h2>
            <p className="text-gray-600 mb-4">
              Para acessar determinados recursos dos Serviços, você precisará criar uma conta. Você é responsável por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li>Fornecer informações precisas e atualizadas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Uso de Mensagens e WhatsApp Business</h2>
            <p className="text-gray-600 mb-4">
              Ao utilizar nossos Serviços de mensagens, incluindo integração com WhatsApp Business, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
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
            <p className="text-gray-600">
              Você também concorda em cumprir as políticas da Meta/WhatsApp, incluindo a
              <a href="https://business.whatsapp.com/policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> WhatsApp Business Messaging Policy</a> e
              os <a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Termos de Serviço do WhatsApp Business</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Uso Aceitável</h2>
            <p className="text-gray-600 mb-4">
              Você concorda em não utilizar os Serviços para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
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
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Propriedade Intelectual</h2>
            <p className="text-gray-600 mb-4">
              Todos os direitos de propriedade intelectual relacionados aos Serviços, incluindo
              software, design, marcas e conteúdo, pertencem à FluxoMind ou seus licenciadores.
              Você recebe uma licença limitada, não exclusiva e não transferível para utilizar os
              Serviços conforme estes Termos.
            </p>
            <p className="text-gray-600">
              Você mantém a propriedade de todo o conteúdo que criar ou carregar através dos Serviços,
              concedendo à FluxoMind uma licença para processar e exibir tal conteúdo conforme necessário
              para a prestação dos Serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacidade e Proteção de Dados</h2>
            <p className="text-gray-600 mb-4">
              O tratamento de seus dados pessoais é regido pela nossa Política de Privacidade.
              Ao utilizar os Serviços, você concorda com a coleta e uso de dados conforme descrito
              na Política de Privacidade.
            </p>
            <p className="text-gray-600">
              A FluxoMind está comprometida com a conformidade com a Lei Geral de Proteção de Dados (LGPD)
              e outras legislações aplicáveis de proteção de dados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Pagamentos e Assinaturas</h2>
            <p className="text-gray-600 mb-4">
              Alguns Serviços podem exigir pagamento. Ao contratar Serviços pagos, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Fornecer informações de pagamento precisas e atualizadas</li>
              <li>Pagar todas as taxas aplicáveis no vencimento</li>
              <li>Que as assinaturas serão renovadas automaticamente, salvo cancelamento prévio</li>
              <li>Que os preços podem ser alterados mediante aviso com 30 dias de antecedência</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 mb-4">
              Na extensão máxima permitida por lei:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                Os Serviços são fornecidos &quot;como estão&quot;, sem garantias de qualquer tipo
              </li>
              <li>
                A FluxoMind não será responsável por danos indiretos, incidentais, especiais ou
                consequenciais
              </li>
              <li>
                Nossa responsabilidade total não excederá o valor pago por você nos últimos 12 meses
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indenização</h2>
            <p className="text-gray-600">
              Você concorda em indenizar e isentar a FluxoMind, seus diretores, funcionários e
              parceiros de quaisquer reclamações, perdas ou danos decorrentes de: (a) seu uso dos
              Serviços; (b) violação destes Termos; (c) violação de direitos de terceiros; ou
              (d) conteúdo que você transmitir através dos Serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Rescisão</h2>
            <p className="text-gray-600 mb-4">
              Podemos suspender ou encerrar seu acesso aos Serviços a qualquer momento, com ou sem
              motivo, mediante notificação. Você pode encerrar sua conta a qualquer momento através
              das configurações da conta ou entrando em contato conosco.
            </p>
            <p className="text-gray-600">
              Após a rescisão, seu direito de usar os Serviços cessará imediatamente. As disposições
              que, por sua natureza, devam sobreviver à rescisão, permanecerão em vigor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Modificações</h2>
            <p className="text-gray-600">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações
              significativas serão comunicadas por e-mail ou através dos Serviços. O uso continuado
              dos Serviços após as modificações constitui aceitação dos novos Termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Lei Aplicável e Foro</h2>
            <p className="text-gray-600">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer
              disputa será submetida ao foro da comarca de São Paulo, SP, com exclusão de qualquer
              outro, por mais privilegiado que seja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Disposições Gerais</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre
                você e a FluxoMind
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
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contato</h2>
            <p className="text-gray-600 mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold">FLUXOMIND LTDA</p>
              <p className="text-gray-600">CNPJ: 60.162.547/0001-15</p>
              <p className="text-gray-600">E-mail: contato@fluxomind.com.br</p>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <img src="/logoSVG/logo-dark.svg" alt="FluxoMind" className="h-8 w-auto" />
            </Link>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                &copy; {currentYear} Fluxomind &mdash; Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                FLUXOMIND LTDA &mdash; CNPJ: 60.162.547/0001-15
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
