// Rate-limit em memória por chave (IP), por instância serverless — melhor
// esforço: instâncias frias/paralelas têm mapas próprios. Suficiente para
// cortar flood barato no beta; ver docs/leads-analytics.md § Deploy.

const buckets = new Map<string, Map<string, number[]>>();

export function rateLimited(
  bucket: string,
  key: string,
  max: number,
  windowMs: number,
): boolean {
  let hits = buckets.get(bucket);
  if (!hits) {
    hits = new Map();
    buckets.set(bucket, hits);
  }
  const now = Date.now();

  // eviction: impede crescimento sem teto em instâncias de vida longa
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) {hits.delete(k);}
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {return true;}
  recent.push(now);
  hits.set(key, recent);
  return false;
}

// IP do cliente: prioriza header de plataforma; em cadeia x-forwarded-for,
// usa o ÚLTIMO salto (anexado pelo proxy confiável), não o primeiro (spoofável).
export function clientIp(req: Request): string {
  const real = req.headers.get('x-real-ip');
  if (real) {return real.trim();}
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',');
    return (parts[parts.length - 1] ?? 'local').trim() || 'local';
  }
  return 'local';
}
