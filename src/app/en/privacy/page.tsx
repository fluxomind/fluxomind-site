import type { Metadata } from 'next';
import Link from 'next/link';

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
  const currentYear = new Date().getFullYear();
  const lastUpdated = 'July 4, 2026';

  return (
    <div className="min-h-screen bg-white" lang="en">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/en" className="flex items-center">
              <img src="/logoSVG/logo-light.svg" alt="Fluxomind" className="h-8 w-auto" />
            </Link>
            <Link href="/privacidade" className="text-gray-600 hover:text-gray-900 transition-colors" lang="pt-BR">
              Versão em português →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-4">Last updated: {lastUpdated}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-sm">
              This is a courtesy translation. In case of any conflict, the{' '}
              <Link href="/privacidade" className="text-blue-600 hover:underline">
                Portuguese version (Política de Privacidade)
              </Link>{' '}
              prevails. FLUXOMIND LTDA is a Brazilian company; the applicable law is the
              Brazilian General Data Protection Law (LGPD — Law No. 13,709/2018).
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who we are</h2>
            <p className="text-gray-600 mb-4">
              This Privacy Policy describes how FLUXOMIND LTDA, enrolled with the CNPJ under No.
              60.162.547/0001-15, headquartered in São Paulo/SP, Brazil (&quot;Fluxomind&quot;,
              &quot;we&quot;), processes personal data collected through the website
              www.fluxomind.com (&quot;Site&quot;), as controller, in compliance with the
              Brazilian General Data Protection Law (LGPD) and the Brazilian Internet Civil
              Framework (Law No. 12,965/2014).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What data we collect</h2>
            <p className="text-gray-600 mb-4">
              We collect only the minimum necessary to operate the Site and respond to your
              interest:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Data you send us:</strong> when filling in the beta interest form, we
                collect name, e-mail, company and the description of the process you want to
                automate.
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
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Why we use it and on which legal basis</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Responding to your interest in the beta:</strong> we use the form data to
                contact you about the beta program and evaluate your use case. Legal basis:
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
            <p className="text-gray-600">
              We do not sell your personal data nor use it for third-party advertising.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies</h2>
            <p className="text-gray-600 mb-4">
              The Site <strong>does not use cookies</strong> — neither first-party nor
              third-party, nor for advertising or tracking. Usage measurement is done with an
              anonymous session identifier in the browser&apos;s sessionStorage, which cannot
              identify you and disappears when the tab is closed. That is why the Site shows no
              cookie consent banner. If this practice changes, this Policy will be updated and
              consent will be requested where required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Who we share it with</h2>
            <p className="text-gray-600 mb-4">
              We share data only with processors essential to the Site&apos;s operation:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Vercel</strong> — Site hosting and execution of the capture routes (United States);</li>
              <li><strong>Google</strong> — internal storage of leads and events in corporate spreadsheets with restricted access (Google Workspace);</li>
              <li><strong>Cloudflare</strong> — domain and DNS management.</li>
            </ul>
            <p className="text-gray-600">
              These providers may process data outside Brazil. In such cases, the international
              transfer takes place in accordance with articles 33 et seq. of the LGPD and the
              ANPD&apos;s International Data Transfer Regulation (Resolution CD/ANPD No.
              19/2024), based on standard contractual clauses or another safeguard admitted by
              the regulation. We may also share data when required by law or by order of a
              competent authority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. How long we keep it</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
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
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your rights (LGPD)</h2>
            <p className="text-gray-600 mb-4">
              Under article 18 of the LGPD, you may request at any time:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Confirmation of processing and access to your data</li>
              <li>Correction of incomplete, inaccurate or outdated data</li>
              <li>Anonymization, blocking or deletion of unnecessary or excessive data</li>
              <li>Portability of the data to another provider</li>
              <li>Deletion of data processed on the basis of your consent</li>
              <li>Information about with whom we share your data</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="text-gray-600">
              To exercise any of these rights, write to{' '}
              <a href="mailto:privacidade@fluxomind.com" className="text-blue-600 hover:underline">
                privacidade@fluxomind.com
              </a>
              . We will respond within the timeframes established by law. You may also lodge a
              complaint with the Brazilian National Data Protection Authority (ANPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Security</h2>
            <p className="text-gray-600">
              We adopt technical and organizational measures proportional to the risk: encrypted
              traffic (HTTPS), restricted access to lead data, minimal data collection and abuse
              protections on the forms. No system is infallible; in the event of a security
              incident with relevant risk to data subjects, we will notify those affected and
              the ANPD as required by the LGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children and teenagers</h2>
            <p className="text-gray-600">
              The Site is aimed at companies and professionals. We do not knowingly collect data
              from anyone under 18. If you believe a minor has provided us personal data,
              contact us so it can be removed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to this Policy</h2>
            <p className="text-gray-600">
              We may update this Policy to reflect changes on the Site or in legislation. The
              last-updated date at the top of this page indicates the current version. Relevant
              changes will be highlighted on the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-600 mb-4">
              For questions about this Policy or the processing of your personal data, use our
              dedicated personal-data channel:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold">FLUXOMIND LTDA</p>
              <p className="text-gray-600">CNPJ: 60.162.547/0001-15</p>
              <p className="text-gray-600">São Paulo/SP — Brazil</p>
              <p className="text-gray-600">E-mail: privacidade@fluxomind.com</p>
            </div>
            <p className="text-gray-600 mt-4">
              See also our{' '}
              <Link href="/en/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </article>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/en" className="mb-4 md:mb-0">
              <img src="/logoSVG/logo-dark.svg" alt="Fluxomind" className="h-8 w-auto" />
            </Link>
            <div className="text-center md:text-right">
              <p className="text-gray-400">&copy; {currentYear} Fluxomind &mdash; All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-2">FLUXOMIND LTDA &mdash; CNPJ: 60.162.547/0001-15</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
