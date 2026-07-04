import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import { PURPOSE_LINE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Why',
  description: `${PURPOSE_LINE_EN} In the founder's own words.`,
  alternates: {
    canonical: '/en/why',
    languages: { 'pt-BR': '/por-que', en: '/en/why' },
  },
};

// Espelho EN de /por-que (ADR-0006). Texto assinado: tradução fiel à carta
// pt, marcada para reescrita do fundador no seu próprio inglês — a voz
// pessoal é dele. 3 atos; a visão declarada como aposta, nunca fato.
export default function WhyEn() {
  return (
    <div className="page-porque" lang="en">
      <style>{PQ_CSS}</style>

      <SiteHeaderEn ptHref="/por-que" />

      <header className="hero">
        <div className="wrap pq-hero">
          <span className="pill">Why we exist · in the founder&apos;s words</span>
          <h1>
            For 30 years, companies <span className="g">adapted to their software.</span>
          </h1>
          <p className="hsub">
            It is time for software to mold itself to them — and work for them. That is what
            Fluxomind exists for.
          </p>
        </div>
      </header>

      <section className="pq-act">
        <div className="wrap pq-prose">
          <div className="kick">Act 1 · The old way</div>
          <h2>Who has never bent a process to fit a system?</h2>
          <p>
            There were always two paths. You buy a ready-made system and start working on its terms —
            the fields it has, the screens it chose, the report it gives. Or you pay for a
            project to bend it to your process: months of implementation, a consulting budget —
            and, every time the business changes, all of it again.
          </p>
          <p>
            On both paths, the result is the same: <strong>the software stands still</strong>.
            The ones chasing — typing, cross-checking spreadsheets, collecting, verifying, remembering — are you and your team. The tool stores the data; the work is still
            yours.
          </p>
          <blockquote className="pq-pull">
            Tailor-made technology has always existed. But it was a privilege: a project, an
            integrator, an IT team. Whoever couldn&apos;t pay made do with spreadsheets.
          </blockquote>
        </div>
      </section>

      <section className="pq-act pq-dark">
        <div className="wrap pq-prose">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            Act 2 · The inversion
          </div>
          <h2 style={{ color: '#fff' }}>
            For the first time, software can mold itself to the business — and work for it.
          </h2>
          <p>
            AI crossed two thresholds that change this story. It started to{' '}
            <strong>understand context</strong> — what used to require a project to adapt now
            happens from what you describe. And it started to <strong>execute</strong> — what
            was always a person chasing, an agent now does, shows the proof, and brings you in on what&apos;s sensitive.
          </p>
          <p>
            That creates a new category. Not a system you operate: an app that builds itself
            from your problem and <strong>runs the day-to-day</strong> — integrated with what
            you already have, governed, in weeks.
          </p>
          <div className="pq-purpose">
            <div className="pq-purpose-label">Our why</div>
            <p>
              We exist to give any business what used to be the privilege of those who could
              pay for it: <strong>a tailor-made system, operated and governed</strong> — without
              a months-long project, without an IT team, without bending your process to fit
              the tool.
            </p>
          </div>
          <p>
            That is why our home page is a demonstration, not a promise. Delegating an
            operation takes trust — and trust, around here, is earned with proof on screen.
          </p>
        </div>
      </section>

      <section className="pq-act">
        <div className="wrap pq-prose">
          <div className="kick">Act 3 · The bet</div>
          <h2>Where we believe this is going</h2>
          <p>
            The knowledge of how to solve a problem — the method an expert spent years honing —
            is trapped today in one person&apos;s calendar. It serves one client at a time, and
            never reaches everyone who needs it.
          </p>
          <p>
            Our bet, declared as a bet: that knowledge will become a{' '}
            <strong>living software business</strong> — created by whoever masters the problem,
            adopted, already operating, by whoever needs the solution. The next generation of
            systems won&apos;t be bought off the shelf or cost a whole project: it will be born from
            those who know the subject, and work inside the business of those who adopt it.
          </p>
          <p>
            We are not there yet — and we prefer to tell you exactly that. What already exists,
            what comes next and what is vision are always kept apart, here and across{' '}
            <Link href="/en" className="pq-link">
              the whole site
            </Link>
            .
          </p>

          <div className="pq-sign">
            <div className="pq-sign-name">Ralfo Nunes</div>
            <div className="pq-sign-role">founder · July 2026</div>
          </div>
        </div>
      </section>

      <section className="offer">
        <div className="wrap">
          <div className="kick" style={{ color: 'var(--sky)' }}>
            The next step
          </div>
          <h2>The best way to understand is to watch it work</h2>
          <p className="lead" style={{ maxWidth: '56ch', margin: '14px auto 0' }}>
            {PURPOSE_LINE_EN}
          </p>
          <div className="offerbtns">
            <Link className="btn btn-primary btn-lg" href="/en/demo" data-track="en-why-demo-cta">
              {CTA_EN.demo}
            </Link>
            <a className="btn btn-ghost btn-lg" href={PLATFORM_CONTACT_EN} data-track="en-why-contact-cta">
              {CTA_EN.contact}
            </a>
          </div>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--slate)' }}>{CTA_EN.demoNote}</p>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}

const PQ_CSS = `
.page-porque .pq-hero { text-align: center; padding-bottom: 40px; }
.page-porque .pq-hero h1 { max-width: 22ch; margin: 0 auto; }
.page-porque .pq-hero .hsub { max-width: 58ch; margin: 18px auto 0; }
.pq-act { padding: 72px 0; }
.pq-act.pq-dark {
  background:
    radial-gradient(900px 420px at 50% 0%, rgba(43, 102, 221, 0.22), transparent 60%),
    var(--ink);
  color: #cdd3dc;
}
.pq-prose { max-width: 680px; margin: 0 auto; }
.pq-prose h2 { margin-top: 14px; }
.pq-prose p { margin-top: 18px; font-size: 17px; line-height: 1.75; }
.pq-dark .pq-prose p { color: #b6bdc9; }
.pq-dark .pq-prose strong { color: #fff; }
.pq-pull {
  margin: 30px 0 6px;
  padding: 4px 0 4px 22px;
  border-left: 3px solid var(--blue);
  font-size: 19px;
  line-height: 1.6;
  font-weight: 550;
  color: var(--slate);
}
.pq-purpose {
  margin: 30px 0 6px;
  padding: 24px 26px;
  border: 1px solid rgba(77, 171, 247, 0.35);
  border-radius: 14px;
  background: rgba(43, 102, 221, 0.10);
}
.pq-purpose .pq-purpose-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--sky);
}
.pq-purpose p { margin-top: 10px; font-size: 17.5px; color: #e8ecf3; }
.pq-link { color: var(--blue); font-weight: 600; }
.pq-dark .pq-link { color: var(--sky); }
.pq-sign { margin-top: 44px; padding-top: 22px; border-top: 1px solid var(--line); }
.pq-sign-name { font-size: 18px; font-weight: 700; }
.pq-sign-role { margin-top: 2px; font-size: 14px; color: var(--mute); }
`;
