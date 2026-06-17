import Link from 'next/link';
import { PLATFORM_SIGNUP, PLATFORM_CONTACT } from '@/lib/platform';

/* ------------------------------------------------------------------
   Seletor de 3 trilhas por tamanho (Message House §4).
   Núcleo idêntico — muda só ângulo, prova e CTA por faixa.
   Não força ninguém: o SMB pode ignorar e seguir o fluxo da home.
   ------------------------------------------------------------------ */

type Track = {
  tag: string;
  title: string;
  desc: string;
  cta: { label: string; href: string; external?: boolean };
};

const TRACKS: Track[] = [
  {
    tag: 'Para a minha operação',
    title: 'SMB · times pequenos',
    desc: 'Monte seu primeiro sistema conversando e veja a prova na tela — você descreve, ela faz, e nada sai sem o seu OK.',
    cta: { label: 'Criar meu sistema', href: PLATFORM_SIGNUP, external: true },
  },
  {
    tag: 'Operação assistida no seu processo',
    title: 'Mid-market · RevOps, CS, cobrança',
    desc: 'A Fluxomind opera assistida dentro do seu processo — cobrança, vendas, onboarding — com a conclusão por evidência a cada passo.',
    cta: { label: 'Ver na minha operação', href: PLATFORM_SIGNUP, external: true },
  },
  {
    tag: 'Governança que sobrevive à diligência',
    title: 'Enterprise · avaliar a fundo',
    desc: 'Governança arquitetural, BYOK, hash-chain, tenant da URL — verificável por evidência. Avalie a plataforma por dentro e fale com o time.',
    cta: { label: 'Falar com o time', href: PLATFORM_CONTACT, external: true },
  },
];

export default function TrackSelector() {
  return (
    <section className="tracksel">
      <div className="wrap">
        <div className="center">
          <div className="kick">Por onde você quer começar?</div>
          <h2>Mesma plataforma, mesmo núcleo — três pontos de entrada</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Você delega a tarefa e recebe a conclusão com a prova. Muda só a profundidade.
          </p>
        </div>
        <div className="uc" style={{ marginTop: 38 }}>
          {TRACKS.map((t) => (
            <div className="ucc" key={t.title}>
              <div className="tagm" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 13 }}>
                {t.tag}
              </div>
              <h4 style={{ marginTop: 6 }}>{t.title}</h4>
              <p>{t.desc}</p>
              <div style={{ marginTop: 14 }}>
                {t.cta.external ? (
                  <a className="btn btn-primary" href={t.cta.href}>
                    {t.cta.label}
                  </a>
                ) : (
                  <Link className="btn btn-primary" href={t.cta.href}>
                    {t.cta.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="center" style={{ marginTop: 24 }}>
          <Link href="/plataforma" style={{ color: 'var(--blue)', fontWeight: 600 }}>
            É técnico e quer avaliar a fundo? Veja a plataforma por dentro →
          </Link>
        </div>
      </div>
    </section>
  );
}
