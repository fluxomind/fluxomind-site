import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.fluxomind.com';

// lastModified omitido de propósito: um new Date() dinâmico mudaria o XML a
// cada build sem mudança real de conteúdo.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/demo`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/o-que-tem`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/plataforma`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/acelere`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/por-que`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/precos`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/seguranca`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
