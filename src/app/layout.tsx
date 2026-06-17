import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluxomind — delegue a tarefa, receba a conclusão com a prova",
  description:
    "Plataforma operacional AI-first: você delega a tarefa e recebe a conclusão com a prova. Ela se constrói a partir do que você pede, opera sobre os seus dados e fica mais inteligente quanto mais você usa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
