import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Fluxomind — como coletamos, usamos e protegemos seus dados pessoais (LGPD)',
};

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = '04 de Julho de 2026';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <img src="/logoSVG/logo-light.svg" alt="Fluxomind" className="h-8 w-auto" />
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
            Política de Privacidade
          </h1>
          <p className="text-gray-500 mb-8">
            Última atualização: {lastUpdated}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Quem somos</h2>
            <p className="text-gray-600 mb-4">
              Esta Política de Privacidade descreve como a FLUXOMIND LTDA, inscrita no CNPJ sob o
              nº 60.162.547/0001-15, com sede no Brasil (&quot;Fluxomind&quot;, &quot;nós&quot;), trata os dados
              pessoais coletados através do site www.fluxomind.com (&quot;Site&quot;), na condição de
              controladora, em conformidade com a Lei Geral de Proteção de Dados Pessoais
              (Lei nº 13.709/2018 — &quot;LGPD&quot;) e o Marco Civil da Internet (Lei nº 12.965/2014).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Quais dados coletamos</h2>
            <p className="text-gray-600 mb-4">
              Coletamos apenas o mínimo necessário para operar o Site e responder ao seu interesse:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Dados que você nos envia:</strong> ao preencher o formulário de interesse
                no programa beta, coletamos nome, e-mail, empresa e a descrição do processo que
                você deseja automatizar.
              </li>
              <li>
                <strong>Dados de navegação (anônimos):</strong> registramos eventos de uso do Site
                (páginas visitadas, cliques e progresso na demonstração interativa) de forma
                first-party, sem cookies e sem identificação pessoal. Usamos apenas um
                identificador de sessão aleatório e anônimo, armazenado no sessionStorage do seu
                navegador, que é apagado automaticamente quando você fecha a aba.
              </li>
              <li>
                <strong>Dados técnicos transitórios:</strong> o endereço IP é utilizado
                momentaneamente para limitar abusos (rate-limiting) e pode constar nos registros
                técnicos (logs) da infraestrutura de hospedagem, que são retidos por curto período.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Para que usamos e com qual base legal</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Responder ao seu interesse no beta:</strong> usamos os dados do formulário
                para entrar em contato sobre o programa beta e avaliar o seu caso de uso. Base
                legal: consentimento (art. 7º, I, LGPD) e procedimentos preliminares relacionados a
                contrato (art. 7º, V, LGPD).
              </li>
              <li>
                <strong>Entender e melhorar o Site:</strong> usamos os eventos anônimos de
                navegação para medir o funil e melhorar o conteúdo. Base legal: legítimo interesse
                (art. 7º, IX, LGPD) — sem dados pessoais identificáveis.
              </li>
              <li>
                <strong>Segurança e prevenção de abuso:</strong> usamos dados técnicos para
                proteger o Site contra fraude e uso indevido. Base legal: legítimo interesse
                (art. 7º, IX, LGPD).
              </li>
            </ul>
            <p className="text-gray-600">
              Não vendemos seus dados pessoais nem os utilizamos para publicidade de terceiros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies</h2>
            <p className="text-gray-600 mb-4">
              O Site <strong>não utiliza cookies</strong> — nem próprios, nem de terceiros, nem
              para publicidade ou rastreamento. A medição de uso é feita com um identificador
              anônimo de sessão no sessionStorage do navegador, que não permite identificar você e
              desaparece ao fechar a aba. Por isso o Site não exibe banner de consentimento de
              cookies. Se essa prática mudar, esta Política será atualizada e o consentimento será
              solicitado quando exigido.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Com quem compartilhamos</h2>
            <p className="text-gray-600 mb-4">
              Compartilhamos dados apenas com operadores essenciais à operação do Site:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Vercel</strong> — hospedagem do Site e execução das rotas de captura
                (Estados Unidos);
              </li>
              <li>
                <strong>Google</strong> — armazenamento interno dos leads e eventos em planilhas
                corporativas com acesso restrito (Google Workspace);
              </li>
              <li>
                <strong>Cloudflare</strong> — gerenciamento de domínio e DNS.
              </li>
            </ul>
            <p className="text-gray-600">
              Esses provedores podem processar dados fora do Brasil. Nesses casos, a transferência
              internacional ocorre conforme os arts. 33 e seguintes da LGPD, com base nas garantias
              contratuais oferecidas por cada provedor. Também poderemos compartilhar dados quando
              exigido por lei ou ordem de autoridade competente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Por quanto tempo guardamos</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Leads do beta:</strong> mantidos enquanto durar o relacionamento sobre o
                programa beta ou até você solicitar a exclusão;
              </li>
              <li>
                <strong>Registros técnicos (logs):</strong> retidos por curto período pela
                infraestrutura de hospedagem e descartados automaticamente;
              </li>
              <li>
                <strong>Eventos de navegação:</strong> armazenados de forma anônima, sem vínculo
                com pessoa identificável.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Seus direitos (LGPD)</h2>
            <p className="text-gray-600 mb-4">
              Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Confirmação da existência de tratamento e acesso aos seus dados</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
              <li>Portabilidade dos dados a outro fornecedor</li>
              <li>Eliminação dos dados tratados com base no seu consentimento</li>
              <li>Informação sobre com quem compartilhamos seus dados</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p className="text-gray-600">
              Para exercer qualquer desses direitos, escreva para{' '}
              <a href="mailto:contato@fluxomind.com" className="text-blue-600 hover:underline">
                contato@fluxomind.com
              </a>
              . Responderemos nos prazos previstos na legislação. Você também pode apresentar
              reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Segurança</h2>
            <p className="text-gray-600">
              Adotamos medidas técnicas e organizacionais proporcionais ao risco: tráfego
              criptografado (HTTPS), acesso restrito aos dados de leads, mínimo de dados coletados
              e proteções contra abuso nos formulários. Nenhum sistema é infalível; em caso de
              incidente de segurança com risco relevante aos titulares, comunicaremos os afetados e
              a ANPD conforme a LGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Crianças e adolescentes</h2>
            <p className="text-gray-600">
              O Site é direcionado a empresas e profissionais. Não coletamos intencionalmente dados
              de menores de 18 anos. Se você acredita que um menor nos forneceu dados pessoais,
              entre em contato para que sejam removidos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Alterações desta Política</h2>
            <p className="text-gray-600">
              Podemos atualizar esta Política para refletir mudanças no Site ou na legislação. A
              data de última atualização no topo desta página indica a versão vigente. Alterações
              relevantes serão destacadas no Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contato</h2>
            <p className="text-gray-600 mb-4">
              Para dúvidas sobre esta Política ou sobre o tratamento dos seus dados pessoais
              (encarregado de dados):
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold">FLUXOMIND LTDA</p>
              <p className="text-gray-600">CNPJ: 60.162.547/0001-15</p>
              <p className="text-gray-600">E-mail: contato@fluxomind.com</p>
            </div>
            <p className="text-gray-600 mt-4">
              Veja também os nossos{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Termos de Uso
              </Link>
              .
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <img src="/logoSVG/logo-dark.svg" alt="Fluxomind" className="h-8 w-auto" />
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
