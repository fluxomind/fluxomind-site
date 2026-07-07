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
    default: "Fluxomind — app que trabalha para o seu negócio, não o contrário",
    template: "%s · Fluxomind",
  },
  description:
    "Um app que resolve o seu problema e se opera sozinho — integrado ao que você já tem, governado, em semanas. Se constrói a partir do que você pede e fica mais inteligente quanto mais você usa.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fluxomind",
    title: "Fluxomind — app que trabalha para o seu negócio, não o contrário",
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

// JSON-LD (schema.org) — dados estruturados da organização e do site.
const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fluxomind',
  url: 'https://www.fluxomind.com',
  logo: 'https://www.fluxomind.com/logoSVG/logo-dark.svg',
  email: 'contato@fluxomind.com',
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fluxomind',
  url: 'https://www.fluxomind.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
