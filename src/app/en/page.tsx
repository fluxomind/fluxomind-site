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
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';

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
// Assinatura fatiada como na home pt (head branco, tail azul).
const SIG_BREAK = SIGNATURE_EN.indexOf('. ') + 1;
const SIG_HEAD = SIGNATURE_EN.slice(0, SIG_BREAK);
const SIG_TAIL = SIGNATURE_EN.slice(SIG_BREAK + 1);

export default function HomeEn() {
  return (
    <div className="page-ent" lang="en">
      <SiteHeaderEn ptHref="/" />

      {/* HERO — espelho do hero da home pt: centrado, assinatura como h1
          (lei §1: assinatura = h1 canônico) */}
      <header className="hero">
        <div className="wrap" style={{ textAlign: 'center', paddingBottom: 48 }}>
          <span className="pill">
            <span className="lz" /> Platform in beta · self-operating apps
          </span>
          <h1 style={{ maxWidth: '24ch', margin: '0 auto' }}>
            {SIG_HEAD} <span className="g">{SIG_TAIL}</span>
          </h1>
          <p className="hsub" style={{ maxWidth: '62ch', margin: '18px auto 0' }}>
            {PROMISE_EN} You describe the problem in plain language; the app builds itself —
            and to change it, you just talk.
          </p>
          <div className="herocta" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary btn-lg" href="/en/demo" data-track="en-home-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT_EN} data-track="en-home-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <div className="reassure" style={{ justifyContent: 'center' }}>
            <span>
              <b>✓</b> Watch without signing up
            </span>
            <span>
              <b>✓</b> Proof on screen, every step
            </span>
            <span>
              <b>✓</b> {CTA_EN.demoNote}
            </span>
          </div>
        </div>
      </header>

      {/* NEGATION — primeira seção após o hero: mantém o respiro padrão
          (sem paddingTop: 0, que colava o card no bloco escuro do hero) */}
      <section>
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
            beta: adoption happens closely guided by our team — live in weeks, not a
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
              <Link className="btn btn-primary" href="/en/demo" data-track="en-home-demo-cta">
                {CTA_EN.demo}
              </Link>
              <a className="btn btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-home-contact-cta">
                {CTA_EN.contact}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
