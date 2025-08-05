import { redirect } from 'next/navigation';

export default function Page() {
  // Redirecionamento para a página em português (padrão)
  redirect('/pt');
  
  // Esta linha não será executada devido ao redirecionamento acima,
  // mas é necessária para satisfazer o TypeScript
  return null;
}
