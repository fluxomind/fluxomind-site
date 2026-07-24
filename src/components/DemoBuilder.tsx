'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CTA } from '@/lib/messages';
import { PLATFORM_CONTACT } from '@/lib/platform';
import { track } from '@/lib/analytics';

/* ------------------------------------------------------------------
   A demonstração da home, em dois atos.

   Ato 1 — CONSTRUIR: o app nasce a partir do que o visitante digita
   (3 cenários: cobrança / vendas / onboarding), com a prova na tela
   a cada passo e contadores animados.

   Ato 2 — OPERAR: "30 dias depois", o app cuida do dia a dia —
   detecta casos novos, prepara ações aguardando o OK, processa uma
   resposta e ESCALA um caso sensível para um humano (handoff
   visível — a regra "Humano assume"). Painel com números evoluindo.
   A mensagem: construir ficou fácil; operar é o que falta.

   Respeita prefers-reduced-motion (estado final imediato).
   Demonstração ilustrativa — rótulo honesto no rodapé do painel.
   ------------------------------------------------------------------ */

interface Metric { k: string; format: 'count' | 'money'; target: number }
interface Draft { tag: string; text: string }

type OpsKind = 'detect' | 'prep' | 'reply' | 'handoff' | 'resume';
interface OpsEvent { t: string; kind: OpsKind; tag: string; text: string }
interface OpsMetric {
  k: string;
  format: 'count' | 'money';
  from: number;
  target: number;
  note: string;
}

interface Scenario {
  id: string;
  chip: string;
  steps: string[];
  title: string;
  metrics: Metric[];
  drafts: Draft[];
  done: string;
  ops: {
    title: string;
    events: OpsEvent[];
    metrics: OpsMetric[];
    done: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cobranca',
    chip: 'Controlar clientes em atraso',
    steps: [
      'Entendendo o que você precisa',
      'Criando o cadastro de clientes em atraso',
      'Montando as telas: lista, ficha e busca',
      'Trazendo 137 registros de exemplo',
      'Calculando quanto está em risco: R$ 284 mil',
      'Montando seu painel ao vivo',
      'Preparando os lembretes de cobrança',
    ],
    title: 'Seu painel de cobrança — pronto',
    metrics: [
      { k: 'Clientes em atraso', format: 'count', target: 137 },
      { k: 'Valor a receber', format: 'money', target: 284000 },
      { k: 'Prioridade alta', format: 'count', target: 23 },
    ],
    drafts: [
      { tag: 'rascunho', text: 'Lembrete amigável — 54 clientes' },
      { tag: 'aguardando seu OK', text: 'Cobrança firme — 23 clientes' },
    ],
    done: 'Seu sistema de cobrança está montado — e nenhum e-mail sai sem você aprovar.',
    ops: {
      title: 'Sua cobrança — dia 30 de operação',
      events: [
        {
          t: '08:02',
          kind: 'detect',
          tag: 'detectou',
          text: '6 faturas vencem amanhã. Quem é avisado hoje quase nunca atrasa.',
        },
        {
          t: '08:03',
          kind: 'prep',
          tag: 'aguardando seu OK',
          text: 'Preparou 6 lembretes, no tom que você aprovou — nada sai sem você.',
        },
        {
          t: '09:41',
          kind: 'reply',
          tag: 'processou',
          text: 'Um cliente respondeu "pago sexta". Promessa registrada, cobrança pausada até lá.',
        },
        {
          t: '11:17',
          kind: 'handoff',
          tag: 'humano assume',
          text: 'Um cliente contesta R$ 18 mil da fatura. Caso sensível: o app parou e chamou o seu financeiro para decidir.',
        },
        {
          t: '11:29',
          kind: 'resume',
          tag: 'pessoa decidiu',
          text: 'Seu financeiro fechou acordo em 2 parcelas. O app registrou, refez o plano de cobrança e seguiu.',
        },
      ],
      metrics: [
        { k: 'Clientes em atraso', format: 'count', from: 137, target: 89, note: '−48 em 30 dias' },
        { k: 'Recuperado no mês', format: 'money', from: 0, target: 96000, note: 'cobrado pelo app, com o seu OK' },
        { k: 'Escalados para humanos', format: 'count', from: 0, target: 3, note: 'casos sensíveis: pessoa decide' },
      ],
      done: 'Trinta dias de cobrança operada — e nenhum caso sensível decidido sem uma pessoa.',
    },
  },
  {
    id: 'vendas',
    chip: 'Acompanhar meu funil de vendas',
    steps: [
      'Entendendo o que você precisa',
      'Criando o cadastro de oportunidades',
      'Montando as telas: funil, ficha e busca',
      'Trazendo 88 oportunidades de exemplo',
      'Calculando o valor do pipeline: R$ 1,2 mi',
      'Montando seu painel ao vivo',
      'Preparando os follow-ups automáticos',
    ],
    title: 'Seu painel de vendas — pronto',
    metrics: [
      { k: 'Oportunidades abertas', format: 'count', target: 88 },
      { k: 'Valor no pipeline', format: 'money', target: 1200000 },
      { k: 'Fechamento previsto', format: 'count', target: 14 },
    ],
    drafts: [
      { tag: 'rascunho', text: 'Follow-up de proposta — 19 contatos' },
      { tag: 'aguardando seu OK', text: 'Reativar parados — 12 contatos' },
    ],
    done: 'Seu funil de vendas está montado — os follow-ups só saem com o seu OK.',
    ops: {
      title: 'Seu funil — dia 30 de operação',
      events: [
        {
          t: '08:15',
          kind: 'detect',
          tag: 'detectou',
          text: '5 oportunidades paradas há mais de 7 dias — esfriando no funil.',
        },
        {
          t: '08:16',
          kind: 'prep',
          tag: 'aguardando seu OK',
          text: 'Preparou um follow-up para cada uma, retomando a última conversa.',
        },
        {
          t: '10:02',
          kind: 'reply',
          tag: 'processou',
          text: 'Uma conta respondeu ao follow-up: reunião marcada para quinta, ficha atualizada.',
        },
        {
          t: '14:38',
          kind: 'handoff',
          tag: 'humano assume',
          text: 'Um cliente pediu desconto acima da alçada. Caso sensível: o app parou e chamou o seu gestor comercial.',
        },
        {
          t: '14:51',
          kind: 'resume',
          tag: 'pessoa decidiu',
          text: 'O gestor aprovou 8%. O app atualizou a proposta, enviou — e deixou tudo na trilha.',
        },
      ],
      metrics: [
        { k: 'Paradas há 7+ dias', format: 'count', from: 12, target: 3, note: '−9 em 30 dias' },
        { k: 'Reuniões marcadas no mês', format: 'count', from: 0, target: 11, note: 'follow-up do app, agenda sua' },
        { k: 'Escalados para humanos', format: 'count', from: 0, target: 2, note: 'preço e exceção: pessoa decide' },
      ],
      done: 'Trinta dias de funil operado — follow-up em dia e decisão de preço sempre com gente.',
    },
  },
  {
    id: 'onboarding',
    chip: 'Organizar o onboarding de clientes',
    steps: [
      'Entendendo o que você precisa',
      'Criando o cadastro de clientes novos',
      'Montando as telas: checklist, ficha e prazos',
      'Trazendo 42 clientes em onboarding',
      'Calculando prazos e pendências',
      'Montando seu painel ao vivo',
      'Preparando os avisos de cada etapa',
    ],
    title: 'Seu painel de onboarding — pronto',
    metrics: [
      { k: 'Em onboarding', format: 'count', target: 42 },
      { k: 'Etapas concluídas', format: 'count', target: 318 },
      { k: 'Com prazo estourado', format: 'count', target: 5 },
    ],
    drafts: [
      { tag: 'rascunho', text: 'Boas-vindas + próximos passos — 8 clientes' },
      { tag: 'aguardando seu OK', text: 'Cobrar documento pendente — 5 clientes' },
    ],
    done: 'Seu onboarding está montado — cada cliente novo com checklist e prazo.',
    ops: {
      title: 'Seu onboarding — dia 30 de operação',
      events: [
        {
          t: '09:05',
          kind: 'detect',
          tag: 'detectou',
          text: '2 clientes com documento pendente há 3 dias — prazo da implantação em risco.',
        },
        {
          t: '09:06',
          kind: 'prep',
          tag: 'aguardando seu OK',
          text: 'Preparou os avisos de pendência, cada um com o histórico do cliente.',
        },
        {
          t: '11:22',
          kind: 'reply',
          tag: 'processou',
          text: 'Contrato assinado recebido: etapa concluída, a próxima liberada na hora.',
        },
        {
          t: '15:47',
          kind: 'handoff',
          tag: 'humano assume',
          text: 'Um cliente pediu condição fora do padrão. Caso sensível: o app parou e chamou o seu time para decidir.',
        },
        {
          t: '16:05',
          kind: 'resume',
          tag: 'pessoa decidiu',
          text: 'Seu time aprovou a exceção. O app ajustou o checklist e avisou o cliente.',
        },
      ],
      metrics: [
        { k: 'Com prazo estourado', format: 'count', from: 5, target: 1, note: '−4 em 30 dias' },
        { k: 'Onboardings concluídos', format: 'count', from: 0, target: 17, note: 'no mês, nenhum esquecido' },
        { k: 'Escalados para humanos', format: 'count', from: 0, target: 2, note: 'exceções: pessoa decide' },
      ],
      done: 'Trinta dias de onboarding operado — cada cliente com prazo, dono e nada esquecido.',
    },
  },
];

const DEFAULT_SCENARIO = SCENARIOS[0];

function matchScenario(text: string): { scenario: Scenario; matched: boolean } {
  const t = text.toLowerCase();
  if (/venda|funil|pipeline|lead|oportunidad|prospec|negocia/.test(t)) {
    return { scenario: SCENARIOS[1], matched: true };
  }
  if (/onboard|cliente novo|implanta|boas-vindas|ativa[çc]/.test(t)) {
    return { scenario: SCENARIOS[2], matched: true };
  }
  if (/atras|cobran|inadimpl|pagamento|devedor|receb/.test(t)) {
    return { scenario: DEFAULT_SCENARIO, matched: true };
  }
  // sem match: fallback honesto — a UI avisa que está mostrando o cenário mais próximo
  return { scenario: DEFAULT_SCENARIO, matched: false };
}

function formatMetric(value: number, format: Metric['format']): string {
  const rounded = Math.round(value);
  return format === 'money'
    ? 'R$ ' + rounded.toLocaleString('pt-BR')
    : rounded.toLocaleString('pt-BR');
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const STEP_STAGGER = 170;
const STEP_DONE_DELAY = 850;
const COUNT_DURATION = 900;
const OPS_STAGGER = 950;

export default function DemoBuilder() {
  const [intent, setIntent] = useState('');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  // Ato 1 — construir
  const [phases, setPhases] = useState<number[]>([]); // 0 dim · 1 running · 2 done
  const [showPreview, setShowPreview] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [metricText, setMetricText] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // Ato 2 — operar
  const [opsStarted, setOpsStarted] = useState(false);
  const [opsShown, setOpsShown] = useState(0);
  const [showOpsPanel, setShowOpsPanel] = useState(false);
  const [showOpsDone, setShowOpsDone] = useState(false);
  const [opsMetricText, setOpsMetricText] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  const raf = useRef<number>(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => { window.clearTimeout(id); });
    timers.current = [];
    if (raf.current) {cancelAnimationFrame(raf.current);}
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startCount = useCallback((sc: Scenario) => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_DURATION, 1);
      setMetricText(sc.metrics.map((m) => formatMetric(m.target * p, m.format)));
      if (p < 1) {raf.current = requestAnimationFrame(tick);}
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const startOpsCount = useCallback((sc: Scenario) => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_DURATION, 1);
      setOpsMetricText(
        sc.ops.metrics.map((m) => formatMetric(m.from + (m.target - m.from) * p, m.format)),
      );
      if (p < 1) {raf.current = requestAnimationFrame(tick);}
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const run = useCallback(() => {
    clearTimers();

    let text = intent.trim();
    if (!text) {
      text = DEFAULT_SCENARIO.chip;
      setIntent(text);
    }
    const { scenario: sc, matched } = matchScenario(text);

    setIsFallback(!matched);
    setScenario(sc);
    setPhases(sc.steps.map(() => 0));
    setShowPreview(false);
    setShowDone(false);
    setMetricText(sc.metrics.map((m) => formatMetric(0, m.format)));
    setRunning(true);
    track('demo_run', { scenario: sc.id, matched });

    // reset do Ato 2 (permite rodar de novo com outro problema)
    setOpsStarted(false);
    setOpsShown(0);
    setShowOpsPanel(false);
    setShowOpsDone(false);
    setOpsMetricText([]);

    if (prefersReducedMotion()) {
      setPhases(sc.steps.map(() => 2));
      setMetricText(sc.metrics.map((m) => formatMetric(m.target, m.format)));
      setShowPreview(true);
      setShowDone(true);
      setRunning(false);
      track('demo_built', { scenario: sc.id });
      return;
    }

    const after = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    sc.steps.forEach((_, i) => {
      after(STEP_STAGGER * i, () =>
        { setPhases((prev) => prev.map((p, idx) => (idx === i ? 1 : p))); },
      );
      after(STEP_STAGGER * i + STEP_DONE_DELAY, () =>
        { setPhases((prev) => prev.map((p, idx) => (idx === i ? 2 : p))); },
      );
    });

    const total = STEP_STAGGER * sc.steps.length + 1000;
    after(total - 1100, () => {
      setShowPreview(true);
      startCount(sc);
    });
    after(total + 300, () => {
      setShowDone(true);
      setRunning(false);
      track('demo_built', { scenario: sc.id });
    });
  }, [intent, clearTimers, startCount]);

  const runOps = useCallback(() => {
    if (!scenario) {return;}
    clearTimers();
    const sc = scenario;

    setOpsStarted(true);
    setOpsShown(0);
    setShowOpsPanel(false);
    setShowOpsDone(false);
    setOpsMetricText(sc.ops.metrics.map((m) => formatMetric(m.from, m.format)));
    setRunning(true);
    track('demo_ops_run', { scenario: sc.id });

    if (prefersReducedMotion()) {
      setOpsShown(sc.ops.events.length);
      setOpsMetricText(sc.ops.metrics.map((m) => formatMetric(m.target, m.format)));
      setShowOpsPanel(true);
      setShowOpsDone(true);
      setRunning(false);
      track('demo_ops_done', { scenario: sc.id });
      return;
    }

    const after = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    sc.ops.events.forEach((_, i) => {
      after(OPS_STAGGER * (i + 1), () => { setOpsShown(i + 1); });
    });

    const total = OPS_STAGGER * (sc.ops.events.length + 1);
    after(total, () => {
      setShowOpsPanel(true);
      startOpsCount(sc);
    });
    after(total + COUNT_DURATION + 500, () => {
      setShowOpsDone(true);
      setRunning(false);
      track('demo_ops_done', { scenario: sc.id });
    });
  }, [scenario, clearTimers, startOpsCount]);

  const pickChip = (chip: string) => {
    setIntent(chip);
    inputRef.current?.focus();
  };

  return (
    <div className="demo">
      <style>{FMD_CSS}</style>

      <div className="dlbl">
        Ato 1 · Construir — descreva o que você precisa resolver:
      </div>
      <div className="promptrow">
        <input
          ref={inputRef}
          value={intent}
          onChange={(e) => { setIntent(e.target.value); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !running) {run();}
          }}
          autoComplete="off"
          placeholder="ex.: controlar meus clientes em atraso"
          aria-label="Descreva o que você precisa resolver"
        />
        <button className="btn btn-primary" onClick={run} disabled={running}>
          Montar →
        </button>
      </div>

      <div className="chips">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="chip"
            onClick={() => { pickChip(s.chip); }}
          >
            {s.chip}
          </button>
        ))}
      </div>

      {scenario && (
        <div className="stage" aria-live="polite">
          {isFallback && (
            <div className="fmd-fallback">
              A demonstração tem três cenários prontos — mostrando o mais
              próximo: <strong>{scenario.chip.toLowerCase()}</strong>.
            </div>
          )}
          <div className="steps">
            {scenario.steps.map((label, i) => {
              const phase = phases[i] ?? 0;
              const cls =
                'step' +
                (phase >= 1 ? ' show' : '') +
                (phase === 1 ? ' run' : '') +
                (phase === 2 ? ' done' : '');
              return (
                <div className={cls} key={i}>
                  <span className="ic">{phase === 2 ? '✓' : <span className="spin" />}</span>
                  <span className="tx">{label}</span>
                </div>
              );
            })}
          </div>

          {showPreview && (
            <div className="preview">
              <div className="pvbar">
                <span className="d" style={{ background: '#ff5f57' }} />
                <span className="d" style={{ background: '#febc2e' }} />
                <span className="d" style={{ background: '#28c840' }} />
                &nbsp; {scenario.title}
              </div>
              <div className="pvgrid">
                {scenario.metrics.map((m, i) => (
                  <div className="metric" key={m.k}>
                    <div className="k">{m.k}</div>
                    <div className="v">{metricText[i]}</div>
                  </div>
                ))}
              </div>
              <div className="emails">
                {scenario.drafts.map((d, i) => (
                  <div className="email" key={i}>
                    <span className="tag">{d.tag}</span> {d.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showDone && (
            <div className="done-row">
              <div className="ok">
                <b>Pronto.</b> {scenario.done}
              </div>
              {!opsStarted && (
                <>
                  <div className="fmd-next">
                    O que vem depois é o que quase ninguém te mostra:
                  </div>
                  <button className="btn btn-primary" onClick={runOps}>
                    Ver o app operando — 30 dias depois →
                  </button>
                </>
              )}
            </div>
          )}

          {opsStarted && (
            <div className="fmd-ops">
              <div className="fmd-divider">
                <span>Ato 2 · 30 dias depois — o app opera o dia a dia</span>
              </div>

              <div className="fmd-evs">
                {scenario.ops.events.slice(0, opsShown).map((ev, i) => (
                  <div className={`fmd-ev ${ev.kind}`} key={i}>
                    <span className="fmd-t">{ev.t}</span>
                    <span className={`fmd-tag ${ev.kind}`}>{ev.tag}</span>
                    <span className="fmd-tx">{ev.text}</span>
                  </div>
                ))}
              </div>

              {showOpsPanel && (
                <div className="preview">
                  <div className="pvbar">
                    <span className="d" style={{ background: '#ff5f57' }} />
                    <span className="d" style={{ background: '#febc2e' }} />
                    <span className="d" style={{ background: '#28c840' }} />
                    &nbsp; {scenario.ops.title}
                  </div>
                  <div className="pvgrid">
                    {scenario.ops.metrics.map((m, i) => (
                      <div className="metric" key={m.k}>
                        <div className="k">{m.k}</div>
                        <div className="v">{opsMetricText[i]}</div>
                        <div className="fmd-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showOpsDone && (
                <div className="done-row">
                  <div className="ok">
                    <b>Isso é operar.</b> {scenario.ops.done}
                  </div>
                  <a
                    className="btn btn-primary"
                    href="#comecar"
                    onClick={() => { track('demo_beta_click'); }}
                  >
                    {CTA.beta} →
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={PLATFORM_CONTACT}
                    onClick={() => { track('demo_contact_click'); }}
                  >
                    {CTA.contact}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <p className="fmd-honest">
        Demonstração ilustrativa, com cenários e números de exemplo. Na plataforma, o app opera
        os seus dados — e nada sensível acontece sem uma pessoa dar o OK.
      </p>
    </div>
  );
}

const FMD_CSS = `
.fmd-next { margin-top: 12px; font-size: 12.5px; color: #74808f; line-height: 1.5; }
.fmd-ops { margin-top: 4px; }
.fmd-divider { display: flex; align-items: center; gap: 12px; margin: 18px 0 10px; color: #9CA3AF; font-size: 12px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.fmd-divider::before, .fmd-divider::after { content: ""; height: 1px; flex: 1; background: rgba(255,255,255,.14); }
.fmd-evs { display: flex; flex-direction: column; gap: 7px; }
.fmd-ev { display: flex; gap: 9px; align-items: baseline; flex-wrap: wrap; background: #16181d; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 10px 12px; animation: fmdIn .38s ease both; }
@keyframes fmdIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
.fmd-ev.handoff { border-color: rgba(138,123,240,.5); background: rgba(138,123,240,.08); }
.fmd-t { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 11px; color: #6B7280; flex: 0 0 auto; }
.fmd-tag { font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; white-space: nowrap; border: 1px solid; flex: 0 0 auto; }
.fmd-tag.detect { color: #bfe0ff; border-color: rgba(77,171,247,.4); background: rgba(77,171,247,.12); }
.fmd-tag.prep { color: #fcd9a2; border-color: rgba(245,158,11,.45); background: rgba(245,158,11,.12); }
.fmd-tag.reply, .fmd-tag.resume { color: #a7f3d0; border-color: rgba(16,185,129,.4); background: rgba(16,185,129,.12); }
.fmd-tag.handoff { color: #cfc6ff; border-color: rgba(138,123,240,.55); background: rgba(138,123,240,.16); }
.fmd-tx { font-size: 13px; color: #E5E7EB; flex: 1 1 220px; line-height: 1.5; }
.fmd-note { font-size: 10.5px; color: #9CA3AF; margin-top: 4px; line-height: 1.4; }
.fmd-honest { margin-top: 12px; font-size: 11.5px; color: #6B7280; text-align: center; line-height: 1.5; padding: 0 6px; }
.fmd-fallback { margin-bottom: 12px; font-size: 12.5px; color: #C7CBD1; line-height: 1.5; background: rgba(245,158,11,.08); border: 1px solid rgba(245,158,11,.35); border-radius: 10px; padding: 9px 12px; }
.fmd-fallback strong { color: #fcd9a2; font-weight: 600; }
`;
