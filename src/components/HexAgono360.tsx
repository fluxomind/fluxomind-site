'use client';

import { useState } from 'react';
import { FACES as CANON_FACES } from '@/lib/messages';

/**
 * Hexágono 360° — a âncora visual única da Fluxomind.
 * Porte fiel do protótipo (_product2/_prototypes/hexagono-360.html) para React.
 * Carrega a tese "componha, não gere": 6 faces de anatomia (centro) + anel de canais (borda).
 * As faces "respiram": rica acende (ouro), vazia apaga; Confiança nasce acesa (violeta).
 * Estado ilustrativo = a cena da Marina (1 objeto, 1 painel, Ally como Inteligência).
 */

const CX = 300;
const CY = 300;
const DEG = Math.PI / 180;
const R_FACE = 152;
const R_BADGE = 196;
const R_NODE = 248;

function hexPoint(angleDeg: number, r: number): [number, number] {
  const a = (angleDeg - 90) * DEG;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

interface Face { key: string; label: string; q: string; badge: string; live: boolean; trust: boolean }

// Perguntas/rótulos canônicos vêm de src/lib/messages.ts; aqui só o estado
// ilustrativo da cena (badge de conteúdo, face acesa, Confiança herdada).
const FACE_SCENE: Record<string, { badge: string; live: boolean; trust: boolean }> = {
  dominio: { badge: '4 objetos', live: true, trust: false },
  experiencia: { badge: '6 telas · 1 painel', live: true, trust: false },
  inteligencia: { badge: '2 agentes', live: true, trust: false },
  processo: { badge: '3 automações', live: true, trust: false },
  conexoes: { badge: 'WhatsApp · API', live: true, trust: false },
  confianca: { badge: 'herdada', live: true, trust: true },
};

const FACES: Face[] = CANON_FACES.map((f) => ({
  key: f.key,
  label: f.label,
  q: f.q,
  ...FACE_SCENE[f.key],
}));

const NODES = [
  { key: 'web', label: 'Web / Desktop', mode: 'destino', ang: 0 },
  { key: 'wpp', label: 'WhatsApp', mode: 'destino', ang: 60 },
  { key: 'voz', label: 'Voz', mode: 'destino', ang: 120 },
  { key: 'mcp', label: 'Claude · MCP', mode: 'capacidade', ang: 240 },
  { key: 'api', label: 'API', mode: 'capacidade', ang: 300 },
] as const;

// vértices-guia do hexágono (anatomia)
const HEX_VERTS = Array.from({ length: 6 }, (_, i) => hexPoint(i * 60, 210))
  .map((p) => `${p[0]},${p[1]}`)
  .join(' ');

// pré-computa cada face (setor trapezoidal entre dois raios)
const FACE_GEOM = FACES.map((f, i) => {
  const aMid = i * 60;
  const gap = 4;
  const rOuter = 210;
  const rInner = 78;
  const a0 = aMid - 30 + gap;
  const a1 = aMid + 30 - gap;
  const p0 = hexPoint(a0, rInner);
  const p1 = hexPoint(a0, rOuter);
  const p2 = hexPoint(a1, rOuter);
  const p3 = hexPoint(a1, rInner);
  const d = `M${p0[0]} ${p0[1]}L${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}L${p3[0]} ${p3[1]}Z`;
  const lp = hexPoint(aMid, R_FACE);
  const bp = hexPoint(aMid, R_BADGE);
  const bw = Math.max(46, f.badge.length * 6.6 + 18);
  const bh = 20;
  return { f, d, lp, bp, bw, bh };
});

const NODE_GEOM = NODES.map((n) => {
  const p = hexPoint(n.ang, R_NODE);
  const lp = hexPoint(n.ang, R_NODE + 24);
  const anchor: 'middle' | 'end' | 'start' =
    Math.abs(lp[0] - CX) < 24 ? 'middle' : lp[0] < CX ? 'end' : 'start';
  const dy = lp[1] < CY - 20 ? -2 : lp[1] > CY + 20 ? 12 : 4;
  return { n, p, lp, anchor, dy };
});

export default function HexAgono360() {
  const [mode, setMode] = useState<'destino' | 'capacidade'>('destino');

  return (
    <div className="hx-root">
      <style>{CSS}</style>

      <div className="hx-modes" role="group" aria-label="Modo de manifestação do app">
        <button
          className="hx-mode-btn"
          aria-pressed={mode === 'destino'}
          onClick={() => { setMode('destino'); }}
        >
          Modo Destino — o app vira tela e conversa
        </button>
        <button
          className="hx-mode-btn"
          aria-pressed={mode === 'capacidade'}
          onClick={() => { setMode('capacidade'); }}
        >
          Modo Capacidade — o app vira ferramenta (MCP)
        </button>
      </div>

      <div className="hx-stage">
        <div className="hx-svg-wrap">
          <svg
            className="hx"
            viewBox="0 0 600 600"
            role="img"
            aria-label="Hexágono 360°: seis faces de anatomia do app (Domínio, Experiência, Inteligência, Processo, Conexões, Confiança) com um anel orbital de canais (Web/Desktop, WhatsApp, Voz, Claude/MCP, API)."
          >
            <defs>
              <radialGradient id="hxCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5b942" stopOpacity="0.30" />
                <stop offset="45%" stopColor="#f5b942" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#f5b942" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hxSegLive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a2f17" />
                <stop offset="100%" stopColor="#1f1a10" />
              </linearGradient>
              <linearGradient id="hxSegDim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12192b" />
                <stop offset="100%" stopColor="#0d1322" />
              </linearGradient>
              <linearGradient id="hxSegTrust" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#241f44" />
                <stop offset="100%" stopColor="#161330" />
              </linearGradient>
              <filter id="hxSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="hxRingFade" cx="50%" cy="50%" r="50%">
                <stop offset="62%" stopColor="#5cd1e6" stopOpacity="0" />
                <stop offset="100%" stopColor="#5cd1e6" stopOpacity="0.14" />
              </radialGradient>
            </defs>

            {/* anel orbital (borda = projeção / canais) */}
            <circle cx="300" cy="300" r="266" fill="url(#hxRingFade)" />
            <circle cx="300" cy="300" r="248" fill="none" stroke="#1b2740" strokeWidth="1" />
            <circle
              cx="300"
              cy="300"
              r="248"
              fill="none"
              stroke="#5cd1e6"
              strokeWidth="1.2"
              strokeDasharray="2 12"
              opacity="0.55"
              className="hx-ring-rot"
            />

            {/* faces */}
            <g>
              <polygon points={HEX_VERTS} fill="none" stroke="#26334f" strokeWidth="1" strokeOpacity="0.5" />
              {FACE_GEOM.map(({ f, d, lp, bp, bw, bh }) => (
                <g key={f.key} className={`hx-face ${f.live ? 'live' : 'dim'}`} data-key={f.key}>
                  <path
                    className="seg"
                    d={d}
                    fill={f.trust ? 'url(#hxSegTrust)' : f.live ? 'url(#hxSegLive)' : 'url(#hxSegDim)'}
                    stroke={f.trust ? '#8a7bf0' : f.live ? '#f5b942' : '#22304d'}
                    strokeWidth={f.live ? 1.4 : 1}
                    strokeOpacity={f.live ? 0.85 : 0.6}
                  />
                  <text className="hx-face-label" x={lp[0]} y={lp[1] - 3} textAnchor="middle">
                    {f.label}
                  </text>
                  <text className="hx-face-q" x={lp[0]} y={lp[1] + 11} textAnchor="middle">
                    {f.q}
                  </text>
                  <g className="hx-badge">
                    <rect
                      x={bp[0] - bw / 2}
                      y={bp[1] - bh / 2}
                      width={bw}
                      height={bh}
                      rx={10}
                      fill={f.trust ? '#8a7bf0' : f.live ? '#f5b942' : '#0e1730'}
                      fillOpacity={f.live ? 1 : 0.55}
                      stroke={f.trust ? '#b3a8ff' : f.live ? '#f7cd6e' : '#27324d'}
                      strokeWidth="1"
                    />
                    <text x={bp[0]} y={bp[1] + 3.5} textAnchor="middle">
                      {f.badge}
                    </text>
                  </g>
                </g>
              ))}
            </g>

            {/* núcleo */}
            <g>
              <circle cx="300" cy="300" r="118" fill="url(#hxCoreGrad)" className="hx-core-glow" />
              <circle cx="300" cy="300" r="62" fill="#0b1120" stroke="#283452" strokeWidth="1.2" />
              <text x="300" y="294" textAnchor="middle" className="hx-core-sub">SEU</text>
              <text x="300" y="312" textAnchor="middle" className="hx-core-title">APP</text>
              <text x="300" y="328" textAnchor="middle" className="hx-core-sub">OPERANTE</text>
            </g>

            {/* anel de canais */}
            <g>
              {NODE_GEOM.map(({ n, p, lp, anchor, dy }) => {
                const live = n.mode === mode;
                return (
                  <g key={n.key} className={`hx-node ${live ? 'live' : 'off'}`} data-key={n.key}>
                    <circle className="hx-node-pulse" cx={p[0]} cy={p[1]} r="13" strokeWidth="1.2" />
                    <circle className="hx-node-dot" cx={p[0]} cy={p[1]} r="6.5" strokeWidth="1.5" />
                    <text className="hx-node-label" x={lp[0]} y={lp[1] + dy} textAnchor={anchor}>
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <div className="hx-legend" aria-label="Legenda">
        <span className="hx-leg-item"><span className="hx-chip live" /><b>Face acesa</b> — tem conteúdo</span>
        <span className="hx-leg-item"><span className="hx-chip dim" /><b>Face apagada</b> — vazia, a esculpir</span>
        <span className="hx-leg-item"><span className="hx-chip trust" /><b>Confiança</b> — herdada, nunca apaga</span>
        <span className="hx-leg-item"><span className="hx-chip chan" /><b>Canal aceso</b> — App publicado ali</span>
        <span className="hx-leg-item"><span className="hx-chip chanoff" /><b>Canal disponível</b> — basta acender</span>
      </div>

      <p className="hx-foot">
        Exemplo de um app operante: as <b>seis faces acesas</b>, com canais publicados —{' '}
        <b>Confiança</b> nasce acesa por herança (governança da plataforma). Construir e evoluir são
        o mesmo hexágono — esculpir uma face, <b>sem rebuild, sem drift</b>.
      </p>
    </div>
  );
}

const CSS = `
.hx-root{
  --fm-bg:#0a0e17; --fm-ink:#eef2fb; --fm-ink-soft:#9aa6c2; --fm-ink-dim:#5b647a;
  --fm-glow:#f5b942; --fm-channel:#5cd1e6; --fm-trust:#8a7bf0;
  background:
    radial-gradient(1200px 700px at 50% -10%, #14203a 0%, transparent 60%),
    radial-gradient(900px 600px at 85% 110%, #1a1430 0%, transparent 55%),
    var(--fm-bg);
  color:var(--fm-ink);
  border-radius:20px; padding:18px 12px 26px;
  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
.hx-root *{ box-sizing:border-box; }
.hx-modes{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; padding:6px 8px 4px; }
.hx-mode-btn{
  appearance:none; border:1px solid #283452; background:#0e1422; color:var(--fm-ink-soft);
  font:inherit; font-size:11.5px; font-weight:600; letter-spacing:.04em;
  padding:7px 16px; border-radius:999px; cursor:pointer; transition:all .25s ease;
}
.hx-mode-btn[aria-pressed="true"]{
  color:var(--fm-bg); background:var(--fm-channel); border-color:var(--fm-channel);
  box-shadow:0 0 16px 1px rgba(92,209,230,.4);
}
.hx-mode-btn:hover{ color:var(--fm-ink); }
.hx-stage{ display:flex; align-items:center; justify-content:center; padding:8px 8px 4px; }
.hx-svg-wrap{ width:min(620px,90vw); aspect-ratio:1/1; }
svg.hx{ width:100%; height:100%; display:block; overflow:visible; }
@keyframes hx-breathe{ 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.9;transform:scale(1.04)} }
@keyframes hx-orbit{ to{ transform:rotate(360deg); } }
@keyframes hx-pulse{ 0%,100%{opacity:.35} 50%{opacity:.85} }
@media (prefers-reduced-motion:reduce){ .hx-core-glow,.hx-ring-rot,.hx-node.live .hx-node-pulse{ animation:none !important; } }
.hx-core-glow{ transform-origin:center; animation:hx-breathe 5.5s ease-in-out infinite; }
.hx-ring-rot{ transform-origin:center; animation:hx-orbit 60s linear infinite; }
.hx-face{ transition:opacity .4s ease; }
.hx-face .seg{ transition:fill .4s ease, stroke .4s ease; }
.hx-face.dim{ opacity:.34; }
.hx-face.live .seg{ filter:url(#hxSoftGlow); }
.hx-face:hover{ opacity:1; }
.hx-face-label{ font-size:14px; font-weight:650; fill:var(--fm-ink); }
.hx-face.dim .hx-face-label{ fill:var(--fm-ink-dim); }
.hx-face-q{ font-size:9.6px; fill:var(--fm-ink-soft); }
.hx-face.dim .hx-face-q{ fill:#46506a; }
.hx-badge text{ font-size:10px; font-weight:600; }
.hx-face.live .hx-badge text{ fill:var(--fm-bg); }
.hx-face.dim .hx-badge text{ fill:var(--fm-ink-dim); }
.hx-node-dot{ transition:fill .4s ease, stroke .4s ease; }
.hx-node-label{ font-size:10.5px; font-weight:600; fill:var(--fm-ink-soft); }
.hx-node.live .hx-node-label{ fill:var(--fm-channel); }
.hx-node.live .hx-node-dot{ fill:var(--fm-channel); stroke:var(--fm-channel); }
.hx-node.off .hx-node-dot{ fill:#0e1730; stroke:#27324d; }
.hx-node.off .hx-node-label{ fill:#46506a; }
.hx-node-pulse{ fill:none; stroke:var(--fm-channel); }
.hx-node.live .hx-node-pulse{ animation:hx-pulse 3.2s ease-in-out infinite; }
.hx-core-title{ font-size:13px; font-weight:700; fill:var(--fm-ink); letter-spacing:.04em; }
.hx-core-sub{ font-size:9.5px; fill:var(--fm-ink-soft); letter-spacing:.16em; }
.hx-legend{ display:flex; flex-wrap:wrap; gap:9px 20px; justify-content:center; padding:6px 16px 14px; max-width:920px; margin:0 auto; }
.hx-leg-item{ display:flex; align-items:center; gap:7px; font-size:12px; color:var(--fm-ink-soft); }
.hx-leg-item b{ color:var(--fm-ink); font-weight:600; }
.hx-chip{ width:12px; height:12px; border-radius:4px; flex:0 0 auto; }
.hx-chip.live{ background:var(--fm-glow); box-shadow:0 0 9px 1px rgba(245,185,66,.55); }
.hx-chip.dim{ background:#15203a; border:1px solid #283452; }
.hx-chip.chan{ background:var(--fm-channel); box-shadow:0 0 9px 1px rgba(92,209,230,.5); }
.hx-chip.chanoff{ background:#0e1730; border:1px solid #27324d; }
.hx-chip.trust{ background:var(--fm-trust); box-shadow:0 0 9px 1px rgba(138,123,240,.5); }
.hx-foot{ text-align:center; color:#5b647a; font-size:11.5px; padding:2px 24px 4px; line-height:1.6; max-width:780px; margin:0 auto; }
.hx-foot b{ color:var(--fm-ink-soft); font-weight:600; }
`;
