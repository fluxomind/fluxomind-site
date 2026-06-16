import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluxomind — monte o sistema da sua operação só conversando",
  description:
    "Cadastros, painéis, automações e cobranças prontos em minutos — sem programar e sem esperar a TI. Você descreve o que precisa; a Fluxomind monta e opera com você.",
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
