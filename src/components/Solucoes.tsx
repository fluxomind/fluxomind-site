import Link from 'next/link';

/* ------------------------------------------------------------------
   Soluções = as 6 perguntas de cliente (Message House §3 + GLOSSARY).
   Domínio · Experiência · Inteligência · Processo · Conexões · Confiança.
   Mapeia as capacidades existentes da plataforma a cada pergunta —
   nenhuma capacidade nova inventada. NUNCA chamar de "dimensão".
   ------------------------------------------------------------------ */

type Solucao = {
  icon: string;
  pergunta: string;
  titulo: string;
  desc: string;
  cobre: string;
};

const SOLUCOES: Solucao[] = [
  {
    icon: '🗂️',
    pergunta: 'Domínio',
    titulo: 'O que o meu negócio guarda?',
    desc: 'Descreva sua operação e a plataforma cria os cadastros, os campos e os dados — sob medida, sem template engessado e sem escrever código. O modelo nasce do seu pedido, não de uma planilha.',
    cobre: 'Apps montados conversando · cadastros e dados',
  },
  {
    icon: '🖥️',
    pergunta: 'Experiência',
    titulo: 'O que as pessoas veem e fazem?',
    desc: 'Lista, formulário, ficha e busca aparecem prontos pra cada cadastro — e evoluem quando você pede. A mesma operação no computador, no WhatsApp e por voz: seu time opera de onde já está.',
    cobre: 'Telas automáticas · WhatsApp e voz',
  },
  {
    icon: '🧠',
    pergunta: 'Inteligência',
    titulo: 'Como ela decide?',
    desc: 'Um cérebro semântico reconhece suas entidades, conecta os dados e enriquece o que você cadastra. E você cria agentes que executam de verdade — cobram, respondem, organizam — sob as suas regras.',
    cobre: 'Ontologia (Atlas) · agentes próprios',
  },
  {
    icon: '🔀',
    pergunta: 'Processo',
    titulo: 'O que acontece sozinho?',
    desc: 'Aprovações em níveis, gatilhos e rotinas que rodam sem ninguém puxar — com você no circuito nas decisões que importam. O processo trabalha; você só decide o que precisa.',
    cobre: 'Workflows · automação',
  },
  {
    icon: '🔌',
    pergunta: 'Conexões',
    titulo: 'Com o que minha operação conversa?',
    desc: 'Por API e MCP, a Fluxomind vira uma capacidade dentro da sua stack e puxa dados de onde você precisa. Suba documentos e contratos: ela organiza, extrai a informação e conecta ao resto. Integra com o que existe, não substitui na marra.',
    cobre: 'API & MCP · gestão de arquivos',
  },
  {
    icon: '🛡️',
    pergunta: 'Confiança',
    titulo: 'Quem pode o quê, com que prova?',
    desc: 'Cada empresa isolada por schema, dados sensíveis mascarados antes do processamento, e uma trilha de auditoria encadeada por hash que detecta qualquer adulteração. Governança arquitetural desde o primeiro dia — nada sai sem o seu OK.',
    cobre: 'Isolamento · masking · hash-chain · controle de acesso',
  },
];

export default function Solucoes({ withLink = true }: { withLink?: boolean }) {
  return (
    <div className="feats">
      {SOLUCOES.map((s) => (
        <div className="featx" key={s.pergunta}>
          <div className="fx">{s.icon}</div>
          <div
            className="kick"
            style={{ marginTop: 16, marginBottom: 0, fontSize: 12, color: 'var(--blue)' }}
          >
            {s.pergunta}
          </div>
          <h3 style={{ marginTop: 6 }}>{s.titulo}</h3>
          <p>{s.desc}</p>
          <span className="tag">{s.cobre}</span>
        </div>
      ))}
      {withLink && (
        <div
          style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          <Link href="/plataforma" style={{ color: 'var(--blue)', fontWeight: 600 }}>
            Quer ver como tudo isso é construído e provado? Veja a plataforma por dentro →
          </Link>
        </div>
      )}
    </div>
  );
}
