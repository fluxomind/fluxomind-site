'use client';

import { useState } from 'react';
import { PLATFORM_BETA } from '@/lib/platform';
import { CTA } from '@/lib/messages';
import { track } from '@/lib/analytics';

// Form da lista de lançamento — a captura primária do site (substitui o mailto;
// PLATFORM_BETA vira fallback quando a entrega falha). POST em /api/beta.
// Desenhado para viver dentro da seção .offer (fundo escuro).

type Status = 'idle' | 'sending' | 'ok' | 'error';
type FieldError = 'email' | 'processo' | null;

export default function BetaForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState<FieldError>(null);

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();
    if (status === 'sending') {return;}

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setFieldError(null);

    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('ok');
        track('beta_form_submitted');
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
      track('beta_form_error');
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="bf bf-ok" role="status">
        <style>{BF_CSS}</style>
        <b>Você está na lista de lançamento!</b> Avisamos quando abrir — e, entre os
        primeiros, o time entra em contato para montar o primeiro app operante com você.
        Sem cartão, sem compromisso.
      </div>
    );
  }

  return (
    <form className="bf" onSubmit={(event) => { void onSubmit(event); }} noValidate>
      <style>{BF_CSS}</style>

      <div className="bf-row">
        <input
          name="nome"
          type="text"
          placeholder="Seu nome (opcional)"
          autoComplete="name"
          aria-label="Seu nome (opcional)"
        />
        <input
          name="empresa"
          type="text"
          placeholder="Empresa (opcional)"
          autoComplete="organization"
          aria-label="Empresa (opcional)"
        />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="Seu e-mail de trabalho"
        autoComplete="email"
        aria-label="Seu e-mail de trabalho"
        aria-invalid={fieldError === 'email' || undefined}
        aria-describedby={fieldError === 'email' ? 'bf-field-err' : undefined}
      />
      <textarea
        name="processo"
        required
        rows={3}
        placeholder="O processo que você quer delegar — ex.: cobrança de clientes em atraso"
        aria-label="O processo que você quer delegar"
        aria-invalid={fieldError === 'processo' || undefined}
        aria-describedby={fieldError === 'processo' ? 'bf-field-err' : undefined}
      />
      {/* honeypot anti-spam — invisível para humanos; one-time-code evita autofill */}
      <input
        name="site"
        type="text"
        tabIndex={-1}
        autoComplete="one-time-code"
        className="bf-hp"
        aria-hidden="true"
      />

      {fieldError && (
        <div className="bf-err" id="bf-field-err" role="alert">
          {fieldError === 'email'
            ? 'Confira o e-mail — ele não parece válido.'
            : 'Conte em uma frase qual processo você quer delegar.'}
        </div>
      )}

      {status === 'error' ? (
        <div className="bf-err" role="alert">
          Não conseguimos registrar agora.{' '}
          <a href={PLATFORM_BETA} data-track="beta-mailto-fallback">
            Envie por e-mail
          </a>{' '}
          que o time responde do mesmo jeito.
        </div>
      ) : null}

      <button className="btn btn-primary btn-lg bf-send" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : CTA.beta}
      </button>

      <p className="bf-legal">
        Ao enviar, você concorda com os <a href="/terms">Termos de Uso</a> e a{' '}
        <a href="/privacidade">Política de Privacidade</a>, e em ser contatado sobre o
        lançamento e o beta. Nada de spam.
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
  outline: none; border-color: var(--sky);
  box-shadow: 0 0 0 3px rgba(77,171,247,.22);
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
