#!/usr/bin/env python3
"""Gera os dados do catálogo de UCs do site a partir da fonte upstream
(fluxomind-platform → fmd-docs/8-journeys/use-cases — contrato em
docs/fontes-upstream.md).

Saídas:
  src/lib/catalogo-ucs-index.ts  — índice leve (cards do grid, SSR)
  public/catalogo-laminas.json   — lâminas completas (carregadas sob demanda)

Uso:  python3 scripts/gera-catalogo-ucs.py [caminho-do-use-cases]
Sanitização: frases com jargão de pipeline interno (F1-F5, dogfood, matrix,
shortlist etc.) são removidas dos campos voltados ao cliente.
"""
import json, re, sys, glob, os

BASE = sys.argv[1] if len(sys.argv) > 1 else \
    '/Users/ralfo/dev/fluxomind-platform/worktrees/dp087-app-authoring-experience/fmd-docs/8-journeys/use-cases'
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INTERNO = re.compile(
    r'F[1-5]\b|dogfood|hero de venda|matrix|[Rr]anking|BCM|DP0\d\d|shortlist|'
    r'lighthouse|first-party|criador-âncora|product-plan|wave', re.I)

def limpa(txt):
    frases = re.split(r'(?<=[.!?])\s+', txt or '')
    return ' '.join(f for f in frases if not INTERNO.search(f)).strip()

# parênteses com referência interna somem sem derrubar a célula toda
PAREN_INTERNO = re.compile(
    r'\s*\((?:[^()]*(?:DP0\d\d|Fase \d|trilho|marketplace|UC-\d{3} cobre)[^()]*)\)')

def scrub(txt):
    return PAREN_INTERNO.sub('', txt or '').strip()

def kpi_cliente(txt):
    """Meta-linguagem de pipeline vira benefício na língua do cliente."""
    t = limpa(txt)
    t = re.sub(r'^KPI\s+primário:\s*', '', t)
    t = re.sub(r'Meta\s+de\s+reconhecimento[^:"]*:', 'No fim, você vai dizer:', t)
    return t.strip()

# ---- catálogo L0 ----
cat = open(f'{BASE}/catalog.md').read()
cur_fam, ucs = None, {}
for line in cat.splitlines():
    m = re.match(r'## ([A-G]) — ', line)
    if m:
        cur_fam = m.group(1); continue
    m = re.match(r'\| \[?(UC-\d{3})\]?\S* \| (.+?) \| (.+?) \| (\S+?) \| (.+?) \|', line)
    if m and cur_fam:
        uid, titulo, seg, fase, caps = m.groups()
        ucs[uid] = {
            'id': uid, 'fam': cur_fam,
            'titulo': titulo.replace('🌐', '').strip().strip('*').strip(),
            'seg': [s.strip() for s in seg.split(',')],
            'caps': [c for c in (re.sub(r'\*.*', '', x).strip() for x in caps.split('·')) if c],
        }

# ---- packages ----
for d in sorted(glob.glob(f'{BASE}/_backlog/UC-*/package.md')):
    s = open(d).read()
    uid = re.search(r'^id: (UC-\d{3})', s, re.M).group(1)
    if uid not in ucs:
        continue
    fm = lambda k: (re.search(rf'^{k}: (.*)$', s, re.M).group(1).strip()
                    if re.search(rf'^{k}: ', s, re.M) else '')
    p = {'dor_hook': fm('dor_hook').strip('"')}
    m = re.search(r'## 1\. O problema.*?\n\n(.*?)(?=\n## )', s, re.S)
    p['problema'] = limpa(m.group(1).strip()) if m else ''
    m = re.search(r'```\n(.*?)```', s, re.S)
    p['pedido'] = m.group(1).strip() if m else ''
    m = re.search(r'## 3\. Escopo v1\n\n\|.*?\n\|[-| ]+\|?\n(.*?)(?=\n\n|\n## )', s, re.S)
    esc = {'dentro': [], 'fora': [], 'evol': []}
    if m:
        for row in m.group(1).strip().splitlines():
            cells = [c.strip() for c in row.strip('|').split('|')]
            if len(cells) >= 3:
                for k, v in zip(('dentro', 'fora', 'evol'), cells[:3]):
                    if v:
                        esc[k].append(scrub(v))
    p['escopo'] = esc
    m = re.search(r'## 4\..*?\n\|[-| ]+\|?\n(.*?)(?=\n\n|\n## )', s, re.S)
    p['dims'] = [{'d': c[0], 't': c[1]} for c in
                 ([x.strip() for x in r.strip('|').split('|')] for r in
                  (m.group(1).strip().splitlines() if m else [])) if len(c) >= 2]
    m = re.search(r'## 5\..*?\n\n(.*?)(?=\n## )', s, re.S)
    p['kpi'] = kpi_cliente(re.sub(r'\*\*', '', m.group(1).strip())) if m else ''
    m = re.search(r'## 9\..*?\n\|[-| ]+\|?\n(.*?)(?=\n\n---|\n---|\n## |\Z)', s, re.S)
    p['objecoes'] = [{'q': scrub(c[0].strip('"')), 'a': scrub(c[1].strip('"'))} for c in
                     ([x.strip() for x in r.strip('|').split('|')] for r in
                      (m.group(1).strip().splitlines() if m else [])) if len(c) >= 2 and c[0]]
    ucs[uid]['pack'] = p

assert len(ucs) >= 67, f'esperava ≥67 UCs, achei {len(ucs)}'

# ---- saídas ----
index = [{'id': u['id'], 'fam': u['fam'], 'titulo': u['titulo'], 'seg': u['seg'],
          'caps': u['caps'], 'dorHook': u.get('pack', {}).get('dor_hook', '')}
         for u in ucs.values()]
laminas = {u['id']: u['pack'] for u in ucs.values() if 'pack' in u}

ts = ('// GERADO por scripts/gera-catalogo-ucs.py — NÃO editar à mão.\n'
      '// Fonte upstream: catálogo de UCs da plataforma (docs/fontes-upstream.md).\n'
      'export type UcIndex = {\n'
      "  id: string; fam: 'A'|'B'|'C'|'D'|'E'|'F'|'G'; titulo: string;\n"
      '  seg: string[]; caps: string[]; dorHook: string;\n};\n\n'
      f'export const UC_INDEX: UcIndex[] = {json.dumps(index, ensure_ascii=False, indent=1)};\n')
open(f'{RAIZ}/src/lib/catalogo-ucs-index.ts', 'w').write(ts)
json.dump(laminas, open(f'{RAIZ}/public/catalogo-laminas.json', 'w'), ensure_ascii=False)
print(f'ok: {len(index)} UCs no índice · {len(laminas)} lâminas · '
      f'json {os.path.getsize(f"{RAIZ}/public/catalogo-laminas.json")//1024} KB')
