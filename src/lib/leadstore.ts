import { appendFile, mkdir, readFile } from 'fs/promises';
import path from 'path';

// Armazenamento de leads em arquivo NDJSON — o "banco" do beta.
// Funciona onde o filesystem persiste (dev local, VM, Cloud Run com volume);
// em serverless efêmero (Vercel) o arquivo NÃO persiste — lá o caminho é
// LEAD_WEBHOOK_URL. Ver docs/leads-analytics.md § Ver os leads.

const FILE =
  process.env.LEADS_FILE ?? path.join(process.cwd(), 'data', 'leads.ndjson');

export type StoredLead = {
  nome?: string;
  email?: string;
  empresa?: string;
  processo?: string;
  ts: string;
  source?: string;
  /** true = capturado pelo honeypot (provável bot; pode ser autofill de humano) */
  hp?: boolean;
};

export async function appendLead(lead: StoredLead): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await appendFile(FILE, JSON.stringify(lead) + '\n', 'utf8');
}

export async function readLeads(): Promise<StoredLead[]> {
  try {
    const raw = await readFile(FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as StoredLead;
        } catch {
          return null;
        }
      })
      .filter((l): l is StoredLead => l !== null);
  } catch {
    return [];
  }
}
