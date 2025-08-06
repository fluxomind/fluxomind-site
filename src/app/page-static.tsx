'use client';

import { Zap, Target, Heart, Cpu, Shield, Layers } from 'lucide-react';

export default function Home() {
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
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sobre
                </a>
                <a href="#tecnologia" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Tecnologia
                </a>
                <a href="#valores" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Valores
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-blue-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Plataforma{' '}
              <span className="text-blue-600">IA-First</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Solução no-code para empresas de qualquer tamanho criarem workflows inteligentes
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Automatize processos, tome decisões baseadas em dados e escale sua operação com inteligência artificial integrada
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

      {/* Sobre a Fluxomind */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sobre a FluxoMind
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                A FluxoMind é uma startup brasileira dedicada a democratizar o acesso à inteligência artificial para empresas de todos os tamanhos. Fundada com a visão de que a IA deve ser acessível, prática e orientada por resultados, desenvolvemos soluções que permitem às organizações automatizar processos complexos sem a necessidade de conhecimento técnico profundo.
              </p>
              <p className="text-lg text-gray-600">
                Nossa plataforma no-code capacita equipes a criarem workflows inteligentes, integrarem sistemas diversos e tomarem decisões baseadas em dados de forma intuitiva e eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section id="valores" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Missão */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
              <p className="text-gray-600">
                Democratizar o acesso à inteligência artificial, capacitando empresas de todos os portes a automatizar processos, otimizar operações e acelerar a inovação através de soluções no-code intuitivas e poderosas.
              </p>
            </div>

            {/* Visão */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser a principal plataforma IA-First do Brasil, reconhecida por tornar a inteligência artificial acessível e prática para qualquer organização, independentemente de seu tamanho ou expertise técnica.
              </p>
            </div>

            {/* Valores */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• <strong>Acessibilidade:</strong> IA para todos, sem barreiras técnicas</li>
                <li>• <strong>Inovação:</strong> Tecnologia de ponta com simplicidade</li>
                <li>• <strong>Transparência:</strong> Processos claros e resultados mensuráveis</li>
                <li>• <strong>Colaboração:</strong> Crescimento conjunto com nossos clientes</li>
                <li>• <strong>Excelência:</strong> Qualidade em cada solução entregue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologia IA-First */}
      <section id="tecnologia" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tecnologia IA-First
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
              Nossa plataforma é construída com inteligência artificial no centro de tudo. Cada funcionalidade, cada processo e cada decisão é potencializada por IA avançada, mas apresentada de forma simples e intuitiva.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Generativa Integrada</h3>
              <p className="text-gray-600">
                Motores de IA generativa que automatizam a criação de workflows, sugerem otimizações e geram insights acionáveis a partir dos seus dados empresariais.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestão Inteligente de Metadados</h3>
              <p className="text-gray-600">
                Sistema avançado que compreende e organiza automaticamente os metadados dos seus processos, permitindo integrações mais inteligentes e análises mais profundas.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Arquitetura Segura e Escalável</h3>
              <p className="text-gray-600">
                Infraestrutura robusta com segurança enterprise, compliance com regulamentações brasileiras e escalabilidade automática conforme sua empresa cresce.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa tecnologia IA-First não apenas automatiza tarefas, mas reimagina completamente como o trabalho é feito, criando oportunidades para inovação e crescimento sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/logoSVG/logo-dark.svg" alt="FluxoMind" className="h-8 w-auto" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {currentYear} FluxoMind. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
