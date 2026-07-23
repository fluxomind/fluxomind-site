import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { PURPOSE_LINE_EN, CTA_EN } from '@/lib/messages-en';

export const metadata: Metadata = {
  title: 'Why',
  description: `${PURPOSE_LINE_EN} In the founder's own words.`,
  alternates: {
    canonical: '/en/why',
    languages: { 'pt-BR': '/por-que', en: '/en/why' },
  },
};

// EN mirror of /por-que (ADR-0006), restaged in the fx design system
// (editorial-tech, dark): the founder's letter in 3 acts — hero + eyebrow per
// movement, body in fx-prose, impact lines in fx-quote. The signed thesis is
// the native-reviewed EN copy, kept as-is; only the presentation is restaged.
// Never label it "Manifesto"; the vision stays a bet, never a fact.
export default function WhyEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/por-que" />

      {/* OPENING */}
      <header className="fx-hero fx-hero-in">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The founder&rsquo;s letter</p>
          <h1 className="fx-serif fx-h1">
            For 30 years, companies{' '}
            <span className="fx-em">adapted to their software.</span>
          </h1>
          <p className="fx-lead">
            It is time for software to mold itself to them — and work for them. That is what
            Fluxomind exists for.
          </p>
        </div>
      </header>

      {/* ACT 1 — THE OLD WAY */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The old way</p>
          <h2 className="fx-serif fx-h2">
            Who has never bent a process to fit a system?
          </h2>
          <div className="fx-prose">
            <p>
              There were always two paths. You buy a ready-made system and start working on its
              terms — the fields it has, the screens it chose, the report it gives. Or you pay
              for a project to bend it to your process: months of implementation, a consulting
              budget — and, every time the business changes, all of it again.
            </p>
            <p>
              On both paths, the result is the same: <strong>the software stands still</strong>.
              The ones chasing — typing, cross-checking spreadsheets, collecting, verifying,
              remembering — are you and your team. The tool stores the data; the work is still
              yours.
            </p>
          </div>
          <blockquote className="fx-quote fx-mt-s">
            Tailor-made technology has always existed. But it was a privilege: a project, an
            integrator, an IT team. Whoever couldn&rsquo;t pay made do with spreadsheets.
          </blockquote>
        </div>
      </section>

      {/* ACT 2 — THE INVERSION */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The inversion</p>
          <h2 className="fx-serif fx-h2">
            For the first time, software can mold itself to the business — and work for it.
          </h2>
          <div className="fx-prose">
            <p>
              AI crossed two thresholds that change this story. It started to{' '}
              <strong>understand context</strong> — what used to require a project to adapt now
              happens from what you describe. And it started to <strong>execute</strong> — what
              was always a person chasing, an agent now does, shows the proof, and brings you
              in on what&rsquo;s sensitive.
            </p>
            <p>
              That creates a new category. Not a system you operate: an app that builds itself
              from your problem and <strong>runs the day-to-day</strong> — integrated with what
              you already have, governed, in weeks.
            </p>
          </div>

          <div className="fx-mt">
            <p className="fx-eyebrow">Our why</p>
            <blockquote className="fx-quote">
              We exist to give any business what used to be the privilege of those who could pay
              for it: a tailor-made system, operated and governed — without a months-long
              project, without an IT team, without bending your process to fit the tool.
            </blockquote>
          </div>

          <div className="fx-prose fx-mt">
            <p>
              That is why our home page is a demonstration, not a promise. Delegating an
              operation takes trust — and trust, around here, is earned with proof on screen.
            </p>
          </div>
        </div>
      </section>

      {/* ACT 3 — THE BET */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The bet</p>
          <h2 className="fx-serif fx-h2">Where we believe this is going</h2>
          <div className="fx-prose">
            <p>
              The knowledge of how to solve a problem — the method an expert spent years honing —
              is trapped today in one person&rsquo;s calendar. It serves one client at a time,
              and never reaches everyone who needs it.
            </p>
            <p>
              Our bet, declared as a bet: that knowledge will become a{' '}
              <strong>living software business</strong> — created by whoever masters the problem,
              adopted, already operating, by whoever needs the solution. The next generation of
              systems won&rsquo;t be bought off the shelf or cost a whole project: it will be born
              from those who know the subject, and work inside the business of those who adopt it.
            </p>
            <p>
              We are not there yet — and we prefer to tell you exactly that. What already exists,
              what comes next and what is vision are always kept apart, here and across{' '}
              <Link href="/en">the whole site</Link>.
            </p>
          </div>

          <div
            className="fx-mt"
            style={{ borderTop: '1px solid var(--fx-line)', paddingTop: 22, maxWidth: 680 }}
          >
            <div className="fx-serif" style={{ fontSize: 19, fontWeight: 600, color: 'var(--fx-ink)' }}>
              Ralfo Nunes
            </div>
            <div className="fx-fineprint" style={{ marginTop: 3 }}>
              founder · July 2026
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — beta */}
      <section className="fx-sec fx-cta-band">
        <div className="fx-wrap fx-narrow fx-tc fx-center">
          <p className="fx-eyebrow">The next step</p>
          <h2 className="fx-serif fx-h2">The proof is on screen. Let&rsquo;s build yours.</h2>
          <p className="fx-lead fx-center" style={{ margin: '0 auto 22px' }}>
            {PURPOSE_LINE_EN}
          </p>
          <div className="fx-cta-row">
            <Link className="fx-btn fx-btn-primary" href="/en#start" data-track="en-why-beta-cta">
              {CTA_EN.beta}
            </Link>
            <Link className="fx-btn fx-btn-ghost" href="/en/demo">
              {CTA_EN.demo}
            </Link>
          </div>
          <div className="fx-scar">Guided beta · no card · in weeks, not months</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
