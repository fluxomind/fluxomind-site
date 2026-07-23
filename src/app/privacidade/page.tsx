import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SIGNATURE, CTA } from '@/lib/messages';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Fluxomind — como coletamos, usamos e protegemos seus dados pessoais (LGPD)',
  alternates: {
    canonical: '/privacidade',
    languages: { 'pt-BR': '/privacidade', en: '/en/privacy' },
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = '04 de Julho de 2026';

  return (
    <div className="fx">
      <SiteHeader cta={{ label: CTA.demo, href: '/demo' }} enHref="/en/privacy" />

      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Legal</p>
          <h1 className="fx-serif fx-h1">Política de Privacidade</h1>
          <p className="fx-fineprint">Última atualização: {lastUpdated}</p>
        </div>
      </header>

      <section className="fx-sec">
        <div className="fx-wrap">
          <article className="fx-prose">
            <h2>1. Quem somos</h2>
            <p>
              Esta Política de Privacidade descreve como a FLUXOMIND LTDA, inscrita no CNPJ sob o
              nº 60.162.547/0001-15, com sede em São Paulo/SP, Brasil (“Fluxomind”, “nós”), trata os dados
              pessoais coletados através do site www.fluxomind.com (“Site”), na condição de
              controladora, em conformidade com a Lei Geral de Proteção de Dados Pessoais
              (Lei nº 13.709/2018 — “LGPD”) e o Marco Civil da Internet (Lei nº 12.965/2014).
            </p>

            <h2>2. Quais dados coletamos</h2>
            <p>
              Coletamos apenas o mínimo necessário para operar o Site e responder ao seu interesse:
            </p>
            <ul>
              <li>
                <strong>Dados que você nos envia:</strong> ao preencher o formulário da lista de
                lançamento (programa beta), coletamos nome, e-mail, empresa e a descrição do
                processo que você deseja automatizar.
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

            <h2>3. Para que usamos e com qual base legal</h2>
            <ul>
              <li>
                <strong>Responder ao seu interesse no beta e no lançamento:</strong> usamos os
                dados do formulário para avisar sobre o lançamento, entrar em contato sobre o
                programa beta e avaliar o seu caso de uso. Base
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
            <p>
              Não vendemos seus dados pessoais nem os utilizamos para publicidade de terceiros.
            </p>

            <h2>4. Cookies</h2>
            <p>
              O Site <strong>não utiliza cookies</strong> — nem próprios, nem de terceiros, nem
              para publicidade ou rastreamento. A medição de uso é feita com um identificador
              anônimo de sessão no sessionStorage do navegador, que não permite identificar você e
              desaparece ao fechar a aba. Por isso o Site não exibe banner de consentimento de
              cookies. Se essa prática mudar, esta Política será atualizada e o consentimento será
              solicitado quando exigido.
            </p>

            <h2>5. Com quem compartilhamos</h2>
            <p>
              Compartilhamos dados apenas com operadores essenciais à operação do Site:
            </p>
            <ul>
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
            <p>
              Esses provedores podem processar dados fora do Brasil. Nesses casos, a transferência
              internacional ocorre conforme os arts. 33 e seguintes da LGPD e o Regulamento de
              Transferência Internacional de Dados da ANPD (Resolução CD/ANPD nº 19/2024), com base
              em cláusulas-padrão contratuais ou outra salvaguarda admitida pela regulamentação.
              Também poderemos compartilhar dados quando exigido por lei ou ordem de autoridade
              competente.
            </p>

            <h2>6. Por quanto tempo guardamos</h2>
            <ul>
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

            <h2>7. Seus direitos (LGPD)</h2>
            <p>
              Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:
            </p>
            <ul>
              <li>Confirmação da existência de tratamento e acesso aos seus dados</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
              <li>Portabilidade dos dados a outro fornecedor</li>
              <li>Eliminação dos dados tratados com base no seu consentimento</li>
              <li>Informação sobre com quem compartilhamos seus dados</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p>
              Para exercer qualquer desses direitos, escreva para{' '}
              <a href="mailto:privacidade@fluxomind.com">privacidade@fluxomind.com</a>
              . Responderemos nos prazos previstos na legislação. Você também pode apresentar
              reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>

            <h2>8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais proporcionais ao risco: tráfego
              criptografado (HTTPS), acesso restrito aos dados de leads, mínimo de dados coletados
              e proteções contra abuso nos formulários. Nenhum sistema é infalível; em caso de
              incidente de segurança com risco relevante aos titulares, comunicaremos os afetados e
              a ANPD conforme a LGPD.
            </p>

            <h2>9. Crianças e adolescentes</h2>
            <p>
              O Site é direcionado a empresas e profissionais. Não coletamos intencionalmente dados
              de menores de 18 anos. Se você acredita que um menor nos forneceu dados pessoais,
              entre em contato para que sejam removidos.
            </p>

            <h2>10. Alterações desta Política</h2>
            <p>
              Podemos atualizar esta Política para refletir mudanças no Site ou na legislação. A
              data de última atualização no topo desta página indica a versão vigente. Alterações
              relevantes serão destacadas no Site.
            </p>

            <h2>11. Contato</h2>
            <p>
              Para dúvidas sobre esta Política ou para exercer seus direitos, use nosso canal
              dedicado de comunicação sobre dados pessoais:
            </p>
            <p>
              <strong>FLUXOMIND LTDA</strong>
              <br />
              CNPJ: 60.162.547/0001-15
              <br />
              São Paulo/SP — Brasil
              <br />
              E-mail: privacidade@fluxomind.com
            </p>
            <p>
              Veja também os nossos <Link href="/terms">Termos de Uso</Link>.
            </p>
          </article>
        </div>
      </section>

      <SiteFooter tagline={SIGNATURE} />
    </div>
  );
}
