import { redirect } from 'next/navigation';

export default function NotFound() {
  // Redirecionar todas as páginas não encontradas para a página inicial em português
  console.log("Página não encontrada - redirecionando para /pt");
  redirect('/pt');
}
