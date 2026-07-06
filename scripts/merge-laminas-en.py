#!/usr/bin/env python3
"""Consolida as lâminas EN traduzidas (4 lotes) e valida contra o pt.

Entradas: laminas-en-1.json … laminas-en-4.json (diretório passado no argv[1])
Saídas:   public/catalogo-laminas-en.json
          src/lib/catalogo-hooks-en.ts (dor_hook EN por UC, usado nos cards SSR)

Validações: 67 UCs, mesmo schema por campo, mesmas contagens de listas que o
pt, termo "self-operating app" (nunca "operant/operating app" solto), sem
resíduo pt óbvio, sem nome de concorrente.
"""
import json, re, sys, glob, os

SRC = sys.argv[1]
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# jargão de engine → língua do cliente (EN); status de roadmap some — espelho
# das CLIENTE_SUBS do gera-catalogo-ucs.py (os tradutores preservam tokens
# verbatim; a limpeza acontece aqui, num lugar só)
CLIENT_SUBS_EN = [
    (r'\((?:via |e-?mail via )?commEngine,?\s*BIND\)', '(connected channel)'),
    (r'\bvia commEngine,?\s*BIND\b', 'through the connected channel'),
    (r'\bcommEngine,?\s*BIND\b', 'connected channel'),
    (r'\bcommEngine\b', 'communication engine'),
    (r'spreadsheet\s*→\s*SoR', 'spreadsheet imported for real'),
    (r'\bexternal SoR\b', 'external system of record'),
    (r'\bSoR\b', 'system of record'),
    (r'\bBIND\b', 'live data connection'),
    (r'\(ENUM( of status per (step|stage))?\)', '(standardized status)'),
    (r'\bENUM of ', 'standardized list of '),
    (r'\bENUM\b', 'standardized status'),
    (r'\bHITL:\s*', 'Human approval: '),
    (r'\bHITL\b', 'human approval'),
    (r'\bRBAC\b', 'role-based permissions'),
    (r'`?create_connector`?', 'system connectors'),
    (r'`?instantiate_template`?', 'installable template'),
    (r'`?face-web`?', 'public page'),
    (r'`?portal-logado`?', 'client portal'),
    (r'`?marketplace`?', 'app store'),
    (r'`?payout`?', 'creator payout'),
    (r'\bread-back\b', 'verification read-back'),
    (r'`?canal-dados-consentido`?', 'consented data channel'),
    (r'`?billing-creditos`?', 'credits'),
    (r'\bwhen (there is|it gets) an owning wave\b', 'on the roadmap'),
    (r'\bquando houver wave dona\b', 'on the roadmap'),
    (r'[,;]?\s*[—–-]?\s*\*{0,2}(sem wave dona|no owning wave)\*{0,2}', ''),
    (r'[,;]?\s*F2 blocked( by phase)?', ''),
    (r'[,;]?\s*F[12] bloqueada( por fase)?', ''),
    (r'\(DP092 W\d,?\s*PLANN?ED\)', '(planned)'),
    (r'\(DP092 W\d,?\s*PLANEJAD[OA]\)', '(planned)'),
    (r'\s*[—–-]\s*Phase \d', ''),
    (r'\bcore scenario depends on this;?\s*', ''),
    (r'[,;]?\s*[—–-]?\s*\*{0,2}core\*{0,2}(?=[\s).,;*]|$)', ''),
    (r'\(\s*[;,]?\s*\)', ''),
    (r'  +', ' '),
]

def client_en(txt):
    t = txt or ''
    for pat, rep in CLIENT_SUBS_EN:
        t = re.sub(pat, rep, t, flags=re.I)
    return t.strip(' ;,')

def deep_clean(v):
    if isinstance(v, str):
        return client_en(v)
    if isinstance(v, list):
        return [deep_clean(x) for x in v]
    if isinstance(v, dict):
        return {k: deep_clean(x) for k, x in v.items()}
    return v

en = {}
for f in sorted(glob.glob(f'{SRC}/laminas-en-*.json')):
    lote = json.load(open(f))
    dup = set(lote) & set(en)
    assert not dup, f'UCs duplicados entre lotes: {dup}'
    en.update(lote)

en = {uid: deep_clean(p) for uid, p in en.items()}
for p in en.values():  # placeholders de tabela interna fora (espelha o pt)
    p['objecoes'] = [o for o in p.get('objecoes', [])
                     if o['q'].strip('—- ') and not re.fullmatch(r'F\d|—|-', o['a'].strip())]

pt = json.load(open(f'{RAIZ}/public/catalogo-laminas.json'))
faltam = set(pt) - set(en)
assert not faltam, f'faltam na tradução: {sorted(faltam)}'

erros = []
PT_RESIDUO = re.compile(r'\b(você|não|então|também|já|até|função|ção\b)', re.I)
VETO = re.compile(r'Lovable|Palantir|\boperant app\b|chatbot(?!s? (are|is) not)', re.I)
for uid, p in pt.items():
    e = en[uid]
    for k in ('dor_hook', 'problema', 'pedido', 'kpi'):
        if bool(p.get(k)) != bool(e.get(k)):
            erros.append(f'{uid}.{k}: presença difere')
    for k in ('dentro', 'fora', 'evol'):
        if len(p['escopo'][k]) != len(e.get('escopo', {}).get(k, [])):
            erros.append(f'{uid}.escopo.{k}: contagem difere')
    if len(p['dims']) != len(e.get('dims', [])):
        erros.append(f'{uid}.dims: contagem difere')
    if len(p['objecoes']) != len(e.get('objecoes', [])):
        erros.append(f'{uid}.objecoes: contagem difere')
    blob = json.dumps(e, ensure_ascii=False)
    if VETO.search(blob):
        erros.append(f'{uid}: léxico vetado → {VETO.search(blob).group(0)}')
    m = PT_RESIDUO.search(blob)
    if m:
        erros.append(f'{uid}: possível resíduo pt → "{m.group(0)}"')

if erros:
    print('\n'.join(erros[:40]))
    sys.exit(f'{len(erros)} problemas — corrigir antes de publicar')

json.dump(en, open(f'{RAIZ}/public/catalogo-laminas-en.json', 'w'), ensure_ascii=False)
hooks = {uid: e.get('dor_hook', '') for uid, e in sorted(en.items())}
ts = ('// GERADO por scripts/merge-laminas-en.py — NÃO editar à mão.\n'
      '// dor_hook em inglês por UC (camada de tradução do site; ver ADR-0005).\n'
      f'export const DOR_HOOK_EN: Record<string, string> = {json.dumps(hooks, ensure_ascii=False, indent=1)};\n')
open(f'{RAIZ}/src/lib/catalogo-hooks-en.ts', 'w').write(ts)
print(f'ok: {len(en)} lâminas EN · '
      f'{os.path.getsize(f"{RAIZ}/public/catalogo-laminas-en.json")//1024} KB')
