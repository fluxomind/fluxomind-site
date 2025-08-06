'use client';

import { Zap, Target, Heart, Cpu, Shield, Layers } from 'lucide-react';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: HomeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logoSVG/logo-light.svg" alt="FluxoMind" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Plataforma{' '}
              <span className="text-blue-600">IA-First</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Solução no-code para empresas de qualquer tamanho criarem workflows inteligentes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Começar Agora
              </button>
              <button className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; {currentYear} FluxoMind. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
