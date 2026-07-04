'use client';

import JourneyDemo from '@/components/JourneyDemo';
import { DEMO_COPY_PT } from '@/lib/demo-copy-pt';

// Ponte client para /demo. O dicionário (funções em cenarios/flow/currency) não
// atravessa a fronteira server→client como prop de um Server Component; por isso
// o copy é importado e injetado já do lado client, aqui.
export default function DemoPt() {
  return <JourneyDemo copy={DEMO_COPY_PT} />;
}
