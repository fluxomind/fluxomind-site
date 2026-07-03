import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fluxomind.com"),
  title: {
    default: "Fluxomind — delegue a tarefa, receba a conclusão com a prova",
    template: "%s · Fluxomind",
  },
  description:
    "Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas. Se constrói a partir do que você pede e fica mais inteligente quanto mais você usa.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fluxomind",
    title: "Fluxomind — delegue a tarefa, receba a conclusão com a prova",
    description:
      "Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Fluxomind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
