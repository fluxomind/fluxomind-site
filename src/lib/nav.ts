// Links do cabeçalho — fonte única para o nav desktop (SiteHeader) e o
// menu mobile (MobileNav). Ordem e rótulos são canônicos.
// Ordem = jornada do visitante: as 3 perguntas universais (resolve? o que
// faz? confio?), depois os desvios de público (Acelere, Plataforma), a
// camada de marca (Por quê) e Preços na ponta direita (convenção).
export const NAV_LINKS = [
  // "O que resolvo" apontava para /#usos (seção-teaser da home); com o hub
  // de casos de uso ele leva às páginas completas — a seção da home segue lá.
  { href: '/casos-de-uso', label: 'O que resolvo' },
  { href: '/o-que-tem', label: 'O que faz' },
  { href: '/seguranca', label: 'Segurança' },
  { href: '/plataforma', label: 'Plataforma' },
  { href: '/por-que', label: 'Por quê' },
] as const;
