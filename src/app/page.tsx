import { redirect } from 'next/navigation';

export default function RootRedirect() {
  // Redireciona automaticamente para a versão em português
  redirect('/pt');
}
