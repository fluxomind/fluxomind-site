import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service of Fluxomind (courtesy translation — the Portuguese version prevails)',
  alternates: {
    canonical: '/en/terms',
    languages: { 'pt-BR': '/terms', en: '/en/terms' },
  },
};

// Tradução de cortesia de /terms (ADR-0006, onda legal). A versão pt é a
// juridicamente vinculante — nota de precedência no topo, padrão de mercado.
export default function TermsEn() {
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
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors" lang="pt-BR">
              Versão em português →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-4">Last updated: {lastUpdated}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-sm">
              This is a courtesy translation. In case of any conflict or divergence, the{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Portuguese version (Termos de Uso)
              </Link>{' '}
              prevails and is the legally binding one. FLUXOMIND LTDA is a Brazilian company and
              these terms are governed by Brazilian law.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of the Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Fluxomind&apos;s services (&quot;Services&quot;), including our
              platform, applications, APIs and messaging integrations (including WhatsApp
              Business), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If
              you do not agree with these Terms, do not use our Services.
            </p>
            <p className="text-gray-600">
              These Terms are a legal agreement between you and FLUXOMIND LTDA, enrolled with the
              Brazilian corporate taxpayer registry (CNPJ) under No. 60.162.547/0001-15,
              headquartered in São Paulo/SP, Brazil (&quot;Fluxomind&quot;, &quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of the Services</h2>
            <p className="text-gray-600 mb-4">Fluxomind offers an AI and automation platform that enables:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Creation and management of intelligent automations</li>
              <li>Integration with communication channels, including WhatsApp Business</li>
              <li>Development of chatbots and virtual assistants</li>
              <li>Data analysis and insight generation</li>
              <li>Business process automation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility</h2>
            <p className="text-gray-600 mb-4">To use our Services, you must:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be barred from receiving services under applicable law</li>
              <li>Represent a duly constituted company or legal entity, where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Account</h2>
            <p className="text-gray-600 mb-4">
              To access certain features of the Services, you will need to create an account. You
              are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Keeping your access credentials confidential</li>
              <li>All activity carried out under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and up-to-date information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Messaging and WhatsApp Business</h2>
            <p className="text-gray-600 mb-4">
              By using our messaging Services, including the WhatsApp Business integration, you
              agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>
                <strong>Obtain consent:</strong> ensure you have the recipients&apos; explicit
                opt-in before sending messages
              </li>
              <li>
                <strong>Respect preferences:</strong> honor opt-out requests immediately
              </li>
              <li>
                <strong>Permitted content:</strong> not send spam or illegal, fraudulent,
                misleading or offensive content
              </li>
              <li>
                <strong>Appropriate frequency:</strong> not send excessive messages or at
                inappropriate times
              </li>
              <li>
                <strong>Clear identification:</strong> clearly identify your company in all
                communications
              </li>
            </ul>
            <p className="text-gray-600">
              You also agree to comply with Meta/WhatsApp policies, including the{' '}
              <a href="https://business.whatsapp.com/policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WhatsApp Business Messaging Policy</a>{' '}
              and the{' '}
              <a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WhatsApp Business Terms of Service</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">You agree not to use the Services to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Violate applicable laws or regulations</li>
              <li>Infringe third-party intellectual property rights</li>
              <li>Transmit viruses, malware or malicious code</li>
              <li>Collect user data without consent</li>
              <li>Reverse-engineer or decompile the software</li>
              <li>Overload or interfere with the Services&apos; infrastructure</li>
              <li>Create fake accounts or impersonate others</li>
              <li>Send unsolicited communications or spam</li>
              <li>Promote illegal, discriminatory or harmful activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All intellectual property rights related to the Services, including software,
              design, trademarks and content, belong to Fluxomind or its licensors. You receive a
              limited, non-exclusive, non-transferable license to use the Services under these
              Terms.
            </p>
            <p className="text-gray-600">
              You retain ownership of all content you create or upload through the Services,
              granting Fluxomind a license to process and display such content as necessary to
              provide the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-600 mb-4">
              The processing of your personal data is governed by our{' '}
              <Link href="/en/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              By using the Services, you agree to the collection and use of data as described in
              the Privacy Policy.
            </p>
            <p className="text-gray-600">
              Fluxomind is committed to compliance with the Brazilian General Data Protection Law
              (LGPD) and other applicable data protection legislation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Payments and Subscriptions</h2>
            <p className="text-gray-600 mb-4">
              Some Services may require payment. By purchasing paid Services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate and up-to-date payment information</li>
              <li>Pay all applicable fees when due</li>
              <li>Automatic renewal of subscriptions unless cancelled in advance</li>
              <li>Price changes upon 30 days&apos; prior notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>The Services are provided &quot;as is&quot;, without warranties of any kind</li>
              <li>Fluxomind shall not be liable for indirect, incidental, special or consequential damages</li>
              <li>Our total liability shall not exceed the amount you paid in the last 12 months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold harmless Fluxomind, its officers, employees and
              partners from any claims, losses or damages arising from: (a) your use of the
              Services; (b) violation of these Terms; (c) violation of third-party rights; or (d)
              content you transmit through the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may suspend or terminate your access to the Services at any time, with or
              without cause, upon notice. You may close your account at any time through the
              account settings or by contacting us.
            </p>
            <p className="text-gray-600">
              Upon termination, your right to use the Services ceases immediately. Provisions
              that by their nature should survive termination shall remain in force.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes</h2>
            <p className="text-gray-600">
              We reserve the right to modify these Terms at any time. Significant changes will be
              communicated by e-mail or through the Services. Continued use of the Services after
              the changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law and Venue</h2>
            <p className="text-gray-600">
              These Terms are governed by the laws of the Federative Republic of Brazil. Any
              dispute shall be submitted to the courts of the district of São Paulo, SP, Brazil,
              to the exclusion of any other, however privileged.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. General Provisions</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Entire agreement:</strong> these Terms constitute the entire agreement between you and Fluxomind</li>
              <li><strong>Waiver:</strong> failure to exercise any right does not constitute a waiver of it</li>
              <li><strong>Severability:</strong> if any provision is held invalid, the remaining ones remain in force</li>
              <li><strong>Assignment:</strong> you may not assign your rights without our prior written consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact</h2>
            <p className="text-gray-600 mb-4">For questions about these Terms of Service, contact us:</p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold">FLUXOMIND LTDA</p>
              <p className="text-gray-600">CNPJ: 60.162.547/0001-15</p>
              <p className="text-gray-600">São Paulo/SP — Brazil</p>
              <p className="text-gray-600">E-mail: contato@fluxomind.com</p>
            </div>
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
