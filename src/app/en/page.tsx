import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeaderEn from '@/components/SiteHeaderEn';
import SiteFooterEn from '@/components/SiteFooterEn';
import BetaFormEn from '@/components/BetaFormEn';
import { SIGNATURE_EN, PHASE_EN, CTA_EN } from '@/lib/messages-en';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Fluxomind — the business that runs itself',
  description:
    'A self-operating app that answers, collects and organizes on your WhatsApp — 24/7 — and proves the work in cash. You delegate the task; you don’t drive another piece of software. Private beta.',
  alternates: {
    canonical: '/en',
    languages: { 'pt-BR': '/', en: '/en' },
  },
};

const SIG_BREAK = SIGNATURE_EN.indexOf(' — ');
const SIG_HEAD = SIGNATURE_EN.slice(0, SIG_BREAK); // "The app that works for your business"
const SIG_TAIL = SIGNATURE_EN.slice(SIG_BREAK + 3).replace(/\.$/, ''); // "not the other way around"

const PHASE_CARDS_EN = [
  { badge: 'b-impl', text: PHASE_EN.exists },
  { badge: 'b-parc', text: PHASE_EN.next },
  { badge: 'b-road', text: PHASE_EN.vision },
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need to code or drive a system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You delegate the task in plain language, on WhatsApp. The app runs on its own, and to change something you just talk. No menus, no project, no developer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the AI act on its own with my customers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only as far as you allow. Autonomy is earned: it observes, suggests, then acts within the limits you set — and, on an incident, goes back to asking for approval. Like a good employee, no one gets the checkbook on day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to drop my spreadsheet or my WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The app absorbs what you already use and hands back a single, governed operation. Keep working your way; now your way works on its own.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every company is truly isolated, data is encrypted, and every action lands on a tamper-evident trail — enterprise-grade governance, already in production.',
      },
    },
    {
      '@type': 'Question',
      name: 'How soon am I up and running?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The platform is in private beta. The first on the list come in with the team alongside them — the first app built with you, no card to start.',
      },
    },
  ],
};

export default function HomeEn() {
  return (
    <div className="fx" lang="en">
      <SiteHeaderEn ptHref="/" />

      {/* 01 — HERO */}
      <header className="fx-hero">
        <div className="fx-wrap fx-hero-grid">
          <div className="fx-hero-copy">
            <span className="fx-pill">
              <span className="fx-lz" /> Private beta · first spots this quarter
            </span>
            <p className="fx-eyebrow">The business that runs itself</p>
            <h1 className="fx-serif fx-h1">
              {SIG_HEAD} — <span className="fx-em">{SIG_TAIL}</span>.
            </h1>
            <p className="fx-sub">
              You delegate the task; the AI <strong>answers, collects and organizes</strong> on
              your WhatsApp — 24/7 — and proves the work in cash. No driving another piece of
              software.
            </p>
            <div className="fx-cta-row">
              <a className="fx-btn fx-btn-primary" href="#start" data-track="en-hero-beta">
                Enter the beta
              </a>
              <Link className="fx-btn fx-btn-ghost" href="/en/demo" data-track="en-hero-demo">
                See it live →
              </Link>
            </div>
            <div className="fx-reassure">
              <span>No card to start</span>
              <span>Proof on screen, in cash</span>
              <span>You approve what&rsquo;s sensitive</span>
            </div>
          </div>

          {/* Results feed — the product is the demo (animated illustration) */}
          <div className="fx-feedwrap" aria-hidden="true">
            <div className="fx-phone">
              <div className="fx-phone-top">
                <span className="fx-av" />
                <span className="fx-who">
                  <b>Ana&rsquo;s Store</b>
                  <span><i /> Fluxomind operating · now</span>
                </span>
                <span className="fx-exlabel">example</span>
              </div>
              <div className="fx-thread">
                <div className="fx-bub fx-in">Hi! Do you still have the blue dress in size M? 👗</div>
                <div className="fx-bub fx-out">
                  We do, Camila! It&rsquo;s R$189 with free shipping today. Want me to reserve it and send the payment link?
                </div>
                <div className="fx-bub fx-in">Yes please! 🙌</div>
              </div>
              <div className="fx-run">
                <div className="fx-r"><span className="fx-st done">Done</span> Replied to customer <time>23:47</time></div>
                <div className="fx-r"><span className="fx-st done">Done</span> Order logged <time>23:48</time></div>
                <div className="fx-r"><span className="fx-st pay">Paid</span> Payment confirmed · R$189 <time>23:52</time></div>
              </div>
              <div className="fx-receipt">
                <div className="fx-rh">This week&rsquo;s briefing</div>
                <div className="fx-rbig fx-serif">R$12,480 <span>recovered</span></div>
                <div className="fx-rsub">app cost: R$594 · return: <b>21×</b> · 0 customers left unanswered</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 02 — THE OLD GAME */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The problem</p>
          <h2 className="fx-serif fx-h2">
            The whole world tried AI. Almost no one got it to <span className="fx-em">work</span>.
          </h2>
          <div className="fx-gap">
            <div className="fx-gapn">
              <b className="fx-serif">62%</b>
              <span>of companies already experiment with AI agents</span>
            </div>
            <div className="fx-gaparrow">→</div>
            <div className="fx-gapn">
              <b className="fx-serif">23%</b>
              <span>actually get them operating (McKinsey, 2025)</span>
            </div>
          </div>
          <p className="fx-body">
            The rest became abandoned pilots — one more tool someone has to drive. Because the
            hard part was never building. It&rsquo;s <strong>operating</strong>. You bought
            software and became its operator: the spreadsheet, the WhatsApp, the ChatGPT pasted
            on top — each with its own version of the truth, and nothing running on its own.
          </p>
        </div>
      </section>

      {/* 03 — THE NEW GAME */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">The shift</p>
            <h2 className="fx-serif fx-h2">
              We don&rsquo;t hand you another tool. We deliver the <span className="fx-em">work done</span>.
            </h2>
            <p className="fx-body">Three things no software delivers — and what lets you delegate without fear:</p>
          </div>
          <div className="fx-tri">
            <div className="fx-tricard">
              <span className="fx-trilabel">Delegate, don&rsquo;t configure</span>
              <h3 className="fx-serif">A whole life in 3 messages</h3>
              <p>Briefing, approval, exception — on WhatsApp. There is no fourth kind of interaction. Your attention is finite, and the system respects that by design.</p>
              <code className="fx-code">briefing · approval · exception</code>
            </div>
            <div className="fx-tricard">
              <span className="fx-trilabel">Autonomy is earned</span>
              <h3 className="fx-serif">Like a good employee</h3>
              <p>It observes, suggests, acts within your limits, earns autonomy. In owner&rsquo;s language — &ldquo;up to 5% off without asking me&rdquo; — and steps back on an incident.</p>
              <code className="fx-code">observes → suggests → acts → autopilot</code>
            </div>
            <div className="fx-tricard">
              <span className="fx-trilabel">Proof in cash</span>
              <h3 className="fx-serif">Show me it did it</h3>
              <p>Every action logged in three layers: what it proposed, what you decided, and what happened in the world. Without the third, you measure obedience, not work.</p>
              <code className="fx-code">proposed · you decided · happened</code>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — THE PROOF */}
      <section className="fx-sec">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">The proof</p>
          <h2 className="fx-serif fx-h2">
            The proof lives in the <span className="fx-gold">invoice</span> — not the slide.
          </h2>
          <p className="fx-body">
            Every month, a briefing on your WhatsApp: what got done and the return in cash —
            <strong> cash generated ÷ app cost</strong>. No employee sends you the report on
            their own cost-benefit. No software measures what you left on the table. A feature
            gets copied; an invoice doesn&rsquo;t.
          </p>
          <p className="fx-body">
            And we start with ourselves. Fluxomind runs its own sales operation inside the
            product — we are <strong>customer zero</strong>. We operate our business with this
            before asking you to operate yours.
          </p>
        </div>
      </section>

      {/* 05 — WHY NOW */}
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Why now</p>
            <h2 className="fx-serif fx-h2">The window is open — and it&rsquo;s narrow.</h2>
          </div>
          <div className="fx-stats">
            <div className="fx-stat">
              <b className="fx-serif">~10×<span>/yr</span></b>
              <span>the drop in the cost of the AI that powers it all</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">82%</b>
              <span>of small businesses already live on WhatsApp</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">9M</b>
              <span>companies in the red — the pain of getting paid at a record</span>
            </div>
            <div className="fx-stat">
              <b className="fx-serif">9–18<span> mo</span></b>
              <span>the category&rsquo;s window before someone closes it</span>
            </div>
          </div>
          <p className="fx-body fx-narrow">
            The tech unlocked, demand proved itself, and your customer already lives on WhatsApp —
            the tide is rising. Whoever turns &ldquo;trying AI&rdquo; into &ldquo;AI operating&rdquo; wins the category.
          </p>
        </div>
      </section>

      {/* 06 — WHY US */}
      <section className="fx-sec">
        <div className="fx-wrap">
          <div className="fx-narrow">
            <p className="fx-eyebrow">Why us</p>
            <h2 className="fx-serif fx-h2">Big-company capability. WhatsApp simplicity.</h2>
            <p className="fx-body">
              <em>Enterprise-grade by design, SMB-first by choice.</em> Per-company isolation, a
              tamper-evident trail and cost controls already in production — the governance of a
              corporation, delivered to the small-business owner who isn&rsquo;t technical. Built by
              a lean team of 6 + an AI harness, by someone who has founded, scaled and sold a
              technology company.
            </p>
          </div>
          <div className="fx-phase">
            {PHASE_CARDS_EN.map((c) => {
              const idx = c.text.indexOf(': ');
              const label = idx > 0 ? c.text.slice(0, idx) : '';
              const body = idx > 0 ? c.text.slice(idx + 2) : c.text;
              return (
                <div className="fx-pcard" key={c.badge}>
                  <span className={`fx-badge ${c.badge}`}>
                    <span className="fx-d" /> {label}
                  </span>
                  <p>{body}</p>
                </div>
              );
            })}
          </div>
          <p className="fx-fineprint fx-narrow">
            Fact, gap and bet — never confusing the three. That&rsquo;s how we&rsquo;d rather tell you.
          </p>
        </div>
      </section>

      {/* 07 — MANIFESTO */}
      <section className="fx-sec fx-manifesto">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Manifesto</p>
          <p className="fx-serif fx-manifesto-line">
            Real software isn&rsquo;t what you <span className="fx-strike">buy and still have to operate</span>.
            It&rsquo;s what <span className="fx-em">works for you</span> — and reports back.
          </p>
          <p className="fx-body">
            We&rsquo;re against the dashboard no one opens. Against the months-long project. Against
            the AI that replies but doesn&rsquo;t resolve. Every business deserves a first-class
            operation — not only the big ones, with a team and an expensive system.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <section className="fx-sec fx-sec-alt">
        <div className="fx-wrap fx-narrow">
          <p className="fx-eyebrow">Common questions</p>
          <h2 className="fx-serif fx-h2">What people usually ask</h2>
          <div className="fx-faq">
            <div className="fx-qa">
              <h4>Do I need to code or drive a system?</h4>
              <p>No. You delegate the task in plain language, on WhatsApp. The app runs on its own, and to change something you just talk. No menus, no project, no developer.</p>
            </div>
            <div className="fx-qa">
              <h4>Will the AI act on its own with my customers?</h4>
              <p>Only as far as you allow. Autonomy is earned: it observes, suggests, then acts within the limits you set — and, on an incident, goes back to asking for approval.</p>
            </div>
            <div className="fx-qa">
              <h4>Do I have to drop my spreadsheet or my WhatsApp?</h4>
              <p>No. The app absorbs what you already use and hands back a single, governed operation. Keep working your way; now your way works on its own.</p>
            </div>
            <div className="fx-qa">
              <h4>Is my data safe?</h4>
              <p>Every company is truly isolated, data is encrypted, and every action lands on a tamper-evident trail — enterprise-grade governance, already in production.</p>
            </div>
            <div className="fx-qa">
              <h4>How soon am I up and running?</h4>
              <p>The platform is in private beta. The first on the list come in with the team alongside them — the first app built with you, no card to start.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CTA */}
      <section className="fx-sec fx-offer" id="start">
        <div className="fx-wrap fx-narrow fx-tc">
          <p className="fx-eyebrow" style={{ color: 'var(--fx-gold)' }}>The next step</p>
          <h2 className="fx-serif fx-h2">Join the private beta.</h2>
          <p className="fx-body" style={{ margin: '14px auto 0', maxWidth: '54ch' }}>
            First spots this quarter. Tell us the operation you want off your plate — the first
            on the list come straight into the beta, with the team building the first app with you.
          </p>
          <BetaFormEn />
          <div className="fx-offerbtns">
            <a className="fx-btn fx-btn-ghost" href={PLATFORM_CONTACT_EN} data-track="en-home-contact">
              Rather talk first? {CTA_EN.contact}
            </a>
          </div>
          <div className="fx-scar">Guided beta · no card · in weeks, not months</div>
        </div>
      </section>

      <SiteFooterEn />
    </div>
  );
}
