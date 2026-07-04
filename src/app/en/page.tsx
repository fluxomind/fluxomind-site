import Link from 'next/link';
import type { Metadata } from 'next';
import {
  SIGNATURE_EN,
  PROMISE_EN,
  PURPOSE_LINE_EN,
  NEGATION_EN,
  FACES_EN,
  TRUST_RULES_EN,
  PHASE_EN,
  CTA_EN,
} from '@/lib/messages-en';
import { PLATFORM_CONTACT } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — self-operating apps for your business',
  description:
    'An app that solves your problem and runs itself — built from what you describe, integrated with what you already use, governed, live in weeks. A human decides the sensitive cases.',
  alternates: {
    canonical: '/en',
    languages: { 'pt-BR': '/', en: '/en' },
  },
};

// Landing EN — escopo credibilidade (message-house-en.md, PROPOSTA):
// condensa a home pt; a demo permanece em português com moldura honesta.
export default function HomeEn() {
  return (
    <div className="page-ent" lang="en">
      {/* header mínimo EN — o nav completo é pt; aqui: marca + retorno ao pt */}
      <header className="bg-white" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px' }}>
          <Link href="/en" aria-label="Fluxomind — English home">
            <img src="/logoSVG/logo-light.svg" alt="Fluxomind" style={{ height: 30 }} />
          </Link>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <Link href="/en/self-operating-app">What is a self-operating app?</Link>
            <Link href="/" lang="pt-BR">
              Português →
            </Link>
          </div>
        </div>
      </header>

      <header className="hero">
        <div className="wrap">
          <div>
            <span className="pill">Fluxomind · self-operating apps</span>
          </div>
          <div className="kick" style={{ marginTop: 18 }}>{SIGNATURE_EN}</div>
          <h1 style={{ maxWidth: '24ch' }}>
            An app that solves your problem — <span className="g">and runs itself.</span>
          </h1>
          <p className="hsub">
            {PROMISE_EN} You describe the problem in plain language; the app builds itself —
            and to change it, you just talk.
          </p>
          <div className="herocta">
            <Link className="btn btn-primary" href="/demo" data-track="en-home-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost" href={PLATFORM_CONTACT} data-track="en-home-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--slate)' }}>
            {CTA_EN.demoNote}
          </p>
        </div>
      </header>

      {/* NEGATION */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fit">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              What it is — and what it is not
            </div>
            <ul style={{ listStyle: 'none', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NEGATION_EN.nots.map((n) => (
                <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#A9AEB8', fontSize: 16 }}>
                  <span aria-hidden="true" style={{ color: '#e07a5f', fontWeight: 700 }}>✕</span>
                  {n}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 22, fontSize: 19, color: '#fff', fontWeight: 600, maxWidth: '58ch', lineHeight: 1.55 }}>
              {NEGATION_EN.is}{' '}
              <Link href="/en/self-operating-app" style={{ textDecoration: 'underline', color: '#fff' }}>
                What is a self-operating app? →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* THE 6 QUESTIONS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">The anatomy</div>
            <h2>The 6 questions every self-operating app answers</h2>
          </div>
          <div className="ways">
            {FACES_EN.map((f) => (
              <div className="way" key={f.label}>
                <div className="tagm">{f.label}</div>
                <h3 style={{ marginTop: 8 }}>{f.q}</h3>
                <p style={{ marginTop: 6 }}>{f.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Trust, by design</div>
            <h2>The 5 rules that make the operation trustworthy</h2>
          </div>
          <div className="ways">
            {TRUST_RULES_EN.map((r) => (
              <div className="way" key={r.title}>
                <h3>{r.title}</h3>
                <p style={{ marginTop: 6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURPOSE + PHASE HONESTY */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <div className="kick">Why we exist</div>
            <h2 style={{ maxWidth: '30ch', margin: '0 auto' }}>{PURPOSE_LINE_EN}</h2>
          </div>
          <div className="honest" style={{ marginTop: 28 }}>
            <b>Transparency.</b> {PHASE_EN.exists} {PHASE_EN.next} {PHASE_EN.vision} We are in
            beta: adoption happens closely accompanied by our team — live in weeks, not a
            months-long project.
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card">
            <div className="kick" style={{ color: 'var(--sky)' }}>
              See it live
            </div>
            <h2>The best definition is watching one being born</h2>
            <p className="lead">
              In the interactive demo, a self-operating app builds itself in front of you —
              from a spreadsheet to a running process, with you approving what you see.{' '}
              {CTA_EN.demoNote}.
            </p>
            <div className="ctab">
              <Link className="btn btn-primary" href="/demo" data-track="en-home-demo-cta">
                {CTA_EN.demo}
              </Link>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT} data-track="en-home-contact-cta">
                {CTA_EN.contact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* footer mínimo EN */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '28px 0', marginTop: 20 }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--slate)', fontSize: 14 }}>
            © 2026 Fluxomind · FLUXOMIND LTDA — CNPJ: 60.162.547/0001-15 · São Paulo, Brazil
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
            <Link href="/en/self-operating-app">Self-operating app</Link>
            <Link href="/terms" lang="pt-BR">Termos de Uso</Link>
            <Link href="/privacidade" lang="pt-BR">Privacidade</Link>
            <Link href="/" lang="pt-BR">Português</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
