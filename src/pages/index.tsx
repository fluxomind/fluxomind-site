import { redirect } from 'next/navigation';

export default function RootPage() {
  // Garante o redirecionamento mesmo em URLs que não são capturadas pelo middleware
  console.log("Index.js raiz executado - redirecionando para /pt");
  redirect('/pt');
}
