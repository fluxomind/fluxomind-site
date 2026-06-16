'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PLATFORM_SIGNUP } from '@/lib/platform';

/* ------------------------------------------------------------------
   Demo "live-build" da home (F0 — animação mockada).
   Correção vs. protótipo: o build responde ao que o usuário digita /
   ao chip escolhido. Cada cenário tem passos, métricas e rascunhos
   próprios — nada de digitar "vendas" e ver um painel de cobrança.
   Respeita prefers-reduced-motion (pula a animação).
   ------------------------------------------------------------------ */

type Metric = { k: string; format: 'count' | 'money'; target: number };
type Draft = { tag: string; text: string };
type Scenario = {
  id: string;
  chip: string;
  steps: string[];
  title: string;
  metrics: Metric[];
  drafts: Draft[];
  done: string;
};

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
  },
];

const DEFAULT_SCENARIO = SCENARIOS[0];

function matchScenario(text: string): Scenario {
  const t = text.toLowerCase();
  if (/venda|funil|pipeline|lead|oportunidad|prospec|negocia/.test(t)) {
    return SCENARIOS[1];
  }
  if (/onboard|cliente novo|implanta|boas-vindas|ativa[çc]/.test(t)) {
    return SCENARIOS[2];
  }
  return DEFAULT_SCENARIO; // atraso / cobrança / inadimplência / padrão
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

export default function DemoBuilder() {
  const [intent, setIntent] = useState('');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [phases, setPhases] = useState<number[]>([]); // 0 dim · 1 running · 2 done
  const [showPreview, setShowPreview] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [metricText, setMetricText] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  const raf = useRef<number>(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startCount = useCallback((sc: Scenario) => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_DURATION, 1);
      setMetricText(sc.metrics.map((m) => formatMetric(m.target * p, m.format)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
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
    const sc = matchScenario(text);

    setScenario(sc);
    setPhases(sc.steps.map(() => 0));
    setShowPreview(false);
    setShowDone(false);
    setMetricText(sc.metrics.map((m) => formatMetric(0, m.format)));
    setRunning(true);

    if (prefersReducedMotion()) {
      setPhases(sc.steps.map(() => 2));
      setMetricText(sc.metrics.map((m) => formatMetric(m.target, m.format)));
      setShowPreview(true);
      setShowDone(true);
      setRunning(false);
      return;
    }

    const after = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    sc.steps.forEach((_, i) => {
      after(STEP_STAGGER * i, () =>
        setPhases((prev) => prev.map((p, idx) => (idx === i ? 1 : p))),
      );
      after(STEP_STAGGER * i + STEP_DONE_DELAY, () =>
        setPhases((prev) => prev.map((p, idx) => (idx === i ? 2 : p))),
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
    });
  }, [intent, clearTimers, startCount]);

  const pickChip = (chip: string) => {
    setIntent(chip);
    inputRef.current?.focus();
  };

  return (
    <div className="demo" id="demo">
      <div className="dlbl">Experimente agora — escreva o que você precisa organizar:</div>
      <div className="promptrow">
        <input
          ref={inputRef}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          autoComplete="off"
          placeholder="ex.: controlar meus clientes em atraso"
          aria-label="Descreva o que você precisa organizar"
        />
        <button className="btn btn-primary" onClick={run} disabled={running}>
          Montar →
        </button>
      </div>

      <div className="chips">
        {SCENARIOS.map((s) => (
          <span key={s.id} className="chip" onClick={() => pickChip(s.chip)}>
            {s.chip}
          </span>
        ))}
      </div>

      {scenario && (
        <div className="stage" aria-live="polite">
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
              <a className="btn btn-primary" href={PLATFORM_SIGNUP}>
                Quero este sistema na minha empresa →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
