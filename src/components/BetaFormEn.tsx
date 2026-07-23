'use client';

import { useState } from 'react';
import { PLATFORM_CONTACT_EN } from '@/lib/platform';
import { CTA_EN } from '@/lib/messages-en';
import { track } from '@/lib/analytics';

// English launch-list form — EN mirror of BetaForm. POSTs to /api/beta.
// Designed to live inside a dark CTA section (.fx-offer).

type Status = 'idle' | 'sending' | 'ok' | 'error';
type FieldError = 'email' | 'processo' | null;

export default function BetaFormEn() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState<FieldError>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setFieldError(null);

    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, lang: 'en' }),
      });
      if (res.ok) {
        setStatus('ok');
        track('beta_form_submitted', { lang: 'en' });
        return;
      }
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (out.error === 'email' || out.error === 'processo') {
        setFieldError(out.error);
        setStatus('idle');
        const field = form.querySelector<HTMLElement>(`[name=${out.error}]`);
        field?.focus();
        return;
      }
      throw new Error(out.error ?? String(res.status));
    } catch {
      track('beta_form_error', { lang: 'en' });
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="bf bf-ok" role="status">
        <style>{BF_CSS}</style>
        <b>You&rsquo;re on the launch list!</b> We&rsquo;ll let you know when it opens — and, among
        the first, the team reaches out to build your first self-operating app with you. No card,
        no commitment.
      </div>
    );
  }

  return (
    <form className="bf" onSubmit={onSubmit} noValidate>
      <style>{BF_CSS}</style>

      <div className="bf-row">
        <input name="nome" type="text" placeholder="Your name (optional)" autoComplete="name" aria-label="Your name (optional)" />
        <input name="empresa" type="text" placeholder="Company (optional)" autoComplete="organization" aria-label="Company (optional)" />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="Your work email"
        autoComplete="email"
        aria-label="Your work email"
        aria-invalid={fieldError === 'email' || undefined}
        aria-describedby={fieldError === 'email' ? 'bf-field-err' : undefined}
      />
      <textarea
        name="processo"
        required
        rows={3}
        placeholder="The process you want to delegate — e.g. chasing overdue invoices"
        aria-label="The process you want to delegate"
        aria-invalid={fieldError === 'processo' || undefined}
        aria-describedby={fieldError === 'processo' ? 'bf-field-err' : undefined}
      />
      {/* honeypot — invisible to humans */}
      <input name="site" type="text" tabIndex={-1} autoComplete="one-time-code" className="bf-hp" aria-hidden="true" />

      {fieldError && (
        <div className="bf-err" id="bf-field-err" role="alert">
          {fieldError === 'email'
            ? 'Please check the email — it doesn&rsquo;t look valid.'
            : 'Tell us in one line which process you want to delegate.'}
        </div>
      )}

      {status === 'error' ? (
        <div className="bf-err" role="alert">
          We couldn&rsquo;t save that right now.{' '}
          <a href={PLATFORM_CONTACT_EN} data-track="en-beta-mailto-fallback">
            Send it by email
          </a>{' '}
          and the team will reply just the same.
        </div>
      ) : null}

      <button className="btn btn-primary btn-lg bf-send" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : CTA_EN.beta}
      </button>

      <p className="bf-legal">
        By submitting, you agree to our <a href="/en/terms">Terms of Use</a> and{' '}
        <a href="/en/privacy">Privacy Policy</a>, and to being contacted about the launch and the
        beta. No spam.
      </p>
    </form>
  );
}

const BF_CSS = `
.bf { max-width: 560px; margin: 26px auto 0; text-align: left; }
.bf input, .bf textarea {
  width: 100%; margin-top: 10px; padding: 13px 15px;
  background: rgba(255,255,255,.06); color: #fff;
  border: 1px solid rgba(255,255,255,.18); border-radius: 10px;
  font: inherit; font-size: 15px;
}
.bf input::placeholder, .bf textarea::placeholder { color: #8b93a3; }
.bf input:focus, .bf textarea:focus {
  outline: none; border-color: var(--fx-blue, #5B8CFF);
  box-shadow: 0 0 0 3px rgba(91,140,255,.22);
}
.bf input[aria-invalid], .bf textarea[aria-invalid] { border-color: #ff8f75; }
.bf textarea { resize: vertical; min-height: 76px; }
.bf-row { display: flex; gap: 10px; }
.bf-row input { flex: 1; min-width: 0; }
@media (max-width: 520px) { .bf-row { flex-direction: column; gap: 0; } }
.bf-hp { position: absolute !important; left: -9999px !important; width: 1px; height: 1px; opacity: 0; }
.bf-send { width: 100%; margin-top: 14px; }
.bf-send:disabled { opacity: .6; cursor: default; }
.bf-err { margin-top: 12px; font-size: 14px; color: #ffb4a4; }
.bf-err a { color: #fff; font-weight: 600; text-decoration: underline; }
.bf-legal { margin-top: 12px; font-size: 12.5px; color: #8b93a3; text-align: center; }
.bf-legal a { color: #aab3c5; text-decoration: underline; }
.bf-ok {
  max-width: 560px; margin: 26px auto 0; padding: 18px 22px;
  background: rgba(64, 192, 87, .12); border: 1px solid rgba(64, 192, 87, .4);
  border-radius: 12px; color: #d7f5de; font-size: 15.5px; line-height: 1.6;
}
.bf-ok b { color: #fff; }
`;
