import { redirect } from 'next/navigation';

// Esta é a página raiz que redireciona para /pt
export default function RootRedirect() {
  console.log("Página raiz executada - redirecionando para /pt");
  redirect('/pt');
}
