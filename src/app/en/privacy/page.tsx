import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Fluxomind Privacy Policy — how we collect, use and protect your personal data under the Brazilian LGPD (courtesy translation — the Portuguese version prevails)',
  alternates: {
    canonical: '/en/privacy',
    languages: { 'pt-BR': '/privacidade', en: '/en/privacy' },
  },
};

// Tradução de cortesia de /privacidade (ADR-0006, onda legal). A base legal
// segue sendo a LGPD (controladora brasileira); a versão pt prevalece.
export default function PrivacyEn() {
  const lastUpdated = 'July 4, 2026';

  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/privacidade" />

      <header className="fx-hero">
        <div className="fx-wrap fx-hero-in">
          <p className="fx-eyebrow">Legal</p>
          <h1 className="fx-serif fx-h1">Privacy Policy</h1>
          <p className="fx-fineprint">Last updated: {lastUpdated}</p>
        </div>
      </header>

      <section className="fx-sec">
        <div className="fx-wrap">
          <article className="fx-prose">
            <p className="fx-note">
              This is a courtesy translation. In case of any conflict, the{' '}
              <Link href="/privacidade" lang="pt-BR">
                Portuguese version (Política de Privacidade)
              </Link>{' '}
              prevails. FLUXOMIND LTDA is a Brazilian company; the applicable law is the
              Brazilian General Data Protection Law (LGPD — Law No. 13,709/2018).
            </p>

            <h2>1. Who we are</h2>
            <p>
              This Privacy Policy describes how FLUXOMIND LTDA, enrolled with the Brazilian corporate taxpayer registry (CNPJ) under No.
              60.162.547/0001-15, headquartered in São Paulo/SP, Brazil (&quot;Fluxomind&quot;,
              &quot;we&quot;), processes personal data collected through the website
              www.fluxomind.com (&quot;Site&quot;), as controller, in compliance with the
              Brazilian General Data Protection Law (LGPD) and the Brazilian Internet Civil
              Framework (Law No. 12,965/2014).
            </p>

            <h2>2. What data we collect</h2>
            <p>
              We collect only the minimum necessary to operate the Site and respond to your
              interest:
            </p>
            <ul>
              <li>
                <strong>Data you send us:</strong> when filling in the launch-list (beta
                program) form, we collect name, e-mail, company and the description of the
                process you want to automate.
              </li>
              <li>
                <strong>Browsing data (anonymous):</strong> we record usage events on the Site
                (pages visited, clicks and progress in the interactive demo) in a first-party
                way, without cookies and without personal identification. We use only a random,
                anonymous session identifier stored in your browser&apos;s sessionStorage, which
                is automatically deleted when you close the tab.
              </li>
              <li>
                <strong>Transient technical data:</strong> the IP address is used momentarily to
                limit abuse (rate limiting) and may appear in the hosting infrastructure&apos;s
                technical logs, which are retained for a short period.
              </li>
            </ul>

            <h2>3. Why we use it and on which legal basis</h2>
            <ul>
              <li>
                <strong>Responding to your interest in the beta and the launch:</strong> we use
                the form data to notify you about the launch, contact you about the beta program
                and evaluate your use case. Legal basis:
                consent (LGPD art. 7, I) and preliminary procedures related to a contract (LGPD
                art. 7, V).
              </li>
              <li>
                <strong>Understanding and improving the Site:</strong> we use anonymous browsing
                events to measure the funnel and improve content. Legal basis: legitimate
                interest (LGPD art. 7, IX) — with no identifiable personal data.
              </li>
              <li>
                <strong>Security and abuse prevention:</strong> we use technical data to protect
                the Site against fraud and misuse. Legal basis: legitimate interest (LGPD art. 7,
                IX).
              </li>
            </ul>
            <p>
              We do not sell your personal data nor use it for third-party advertising.
            </p>

            <h2>4. Cookies</h2>
            <p>
              The Site <strong>does not use cookies</strong> — neither first-party nor
              third-party, nor for advertising or tracking. Usage measurement is done with an
              anonymous session identifier in the browser&apos;s sessionStorage, which cannot
              identify you and disappears when the tab is closed. That is why the Site shows no
              cookie consent banner. If this practice changes, this Policy will be updated and
              consent will be requested where required.
            </p>

            <h2>5. Who we share it with</h2>
            <p>
              We share data only with processors essential to the Site&apos;s operation:
            </p>
            <ul>
              <li><strong>Vercel</strong> — Site hosting and execution of the capture routes (United States);</li>
              <li><strong>Google</strong> — internal storage of leads and events in corporate spreadsheets with restricted access (Google Workspace);</li>
              <li><strong>Cloudflare</strong> — domain and DNS management.</li>
            </ul>
            <p>
              These providers may process data outside Brazil. In such cases, the international
              transfer takes place in accordance with articles 33 et seq. of the LGPD and the
              ANPD&apos;s International Data Transfer Regulation (Resolution CD/ANPD No.
              19/2024), based on standard contractual clauses or another safeguard permitted under the regulation. We may also share data when required by law or by order of a
              competent authority.
            </p>

            <h2>6. How long we keep it</h2>
            <ul>
              <li>
                <strong>Beta leads:</strong> kept for as long as the relationship about the beta
                program lasts or until you request deletion;
              </li>
              <li>
                <strong>Technical logs:</strong> retained for a short period by the hosting
                infrastructure and discarded automatically;
              </li>
              <li>
                <strong>Browsing events:</strong> stored anonymously, with no link to an
                identifiable person.
              </li>
            </ul>

            <h2>7. Your rights (LGPD)</h2>
            <p>
              Under article 18 of the LGPD, you may request at any time:
            </p>
            <ul>
              <li>Confirmation of processing and access to your data</li>
              <li>Correction of incomplete, inaccurate or outdated data</li>
              <li>Anonymization, blocking or deletion of unnecessary or excessive data</li>
              <li>Portability of the data to another provider</li>
              <li>Deletion of data processed on the basis of your consent</li>
              <li>Information about with whom we share your data</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p>
              To exercise any of these rights, write to{' '}
              <a href="mailto:privacidade@fluxomind.com">privacidade@fluxomind.com</a>
              . We will respond within the timeframes established by law. You may also lodge a
              complaint with the Brazilian National Data Protection Authority (ANPD).
            </p>

            <h2>8. Security</h2>
            <p>
              We adopt technical and organizational measures proportional to the risk: encrypted
              traffic (HTTPS), restricted access to lead data, minimal data collection and abuse
              protections on the forms. No system is infallible; in the event of a security
              incident with relevant risk to data subjects, we will notify those affected and
              the ANPD as required by the LGPD.
            </p>

            <h2>9. Children and teenagers</h2>
            <p>
              The Site is aimed at companies and professionals. We do not knowingly collect data
              from anyone under 18. If you believe a minor has provided us personal data,
              contact us so it can be removed.
            </p>

            <h2>10. Changes to this Policy</h2>
            <p>
              We may update this Policy to reflect changes on the Site or in legislation. The
              last-updated date at the top of this page indicates the current version. Relevant
              changes will be highlighted on the Site.
            </p>

            <h2>11. Contact</h2>
            <p>
              For questions about this Policy or the processing of your personal data, use our
              dedicated personal-data channel:
            </p>
            <p>
              <strong>FLUXOMIND LTDA</strong>
              <br />
              CNPJ: 60.162.547/0001-15
              <br />
              São Paulo/SP — Brazil
              <br />
              E-mail: privacidade@fluxomind.com
            </p>
            <p>
              See also our <Link href="/en/terms">Terms of Service</Link>.
            </p>
          </article>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
