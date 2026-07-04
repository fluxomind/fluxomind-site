import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.fluxomind.com';

// lastModified omitido de propósito: um new Date() dinâmico mudaria o XML a
// cada build sem mudança real de conteúdo.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/demo`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/app-operante`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/casos-de-uso`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/casos-de-uso/gestao-de-leads`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/casos-de-uso/cobranca-e-contas-a-receber`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/casos-de-uso/atendimento-whatsapp`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/o-que-tem`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plataforma`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/acelere`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/por-que`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/precos`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/seguranca`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/en/demo`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/self-operating-app`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/en/pricing`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/what-it-does`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/security`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/accelerate`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/platform`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/why`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/use-cases`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/en/use-cases/collections-and-accounts-receivable`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/use-cases/lead-management`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/use-cases/whatsapp-support`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/en/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacidade`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
