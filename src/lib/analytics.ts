// Analytics first-party do site — sem cookies, sem vendor, sem PII.
// Eventos vão para /api/event (que loga e/ou repassa a EVENTS_WEBHOOK_URL).
// Identificador de sessão anônimo vive em sessionStorage (morre com a aba).
//
// Taxonomia de eventos: docs/leads-analytics.md.

function sid(): string {
  try {
    const k = 'fm_sid';
    let v = sessionStorage.getItem(k);
    if (!v) {
      v = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      sessionStorage.setItem(k, v);
    }
    return v;
  } catch {
    return 'anon';
  }
}

export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') {return;}
  try {
    const payload = JSON.stringify({
      event,
      props: props ?? {},
      path: window.location.pathname,
      sid: sid(),
      ts: Date.now(),
    });
    const blob = new Blob([payload], { type: 'application/json' });
    if (navigator.sendBeacon('/api/event', blob)) {return;}
    void fetch('/api/event', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch {
    // analytics nunca quebra a página
  }
}
