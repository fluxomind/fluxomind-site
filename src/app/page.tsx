import { ArrowRight, Zap, Target, Heart, Cpu, Shield, Layers } from 'lucide-react';

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/Logo SVG/logo-light.svg" alt="FluxoMind" className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">Sobre</a>
              <a href="#tecnologia" className="text-gray-600 hover:text-gray-900 transition-colors">Tecnologia</a>
              <a href="#valores" className="text-gray-600 hover:text-gray-900 transition-colors">Valores</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-blue-100"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Construa com IA.{' '}
              <span className="text-blue-600">Escale sem limites.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              A Fluxomind é uma startup brasileira criada para democratizar o uso da inteligência artificial em empresas de qualquer tamanho.
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Estamos desenvolvendo uma plataforma IA-First, no-code e baseada em metadados — combinando velocidade, arquitetura sólida e simplicidade de uso.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre a Fluxomind */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sobre a Fluxomind
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Acreditamos que a inteligência artificial deve ser acessível, segura e escalável. Nossa missão é permitir que empresas construam aplicações, automações e fluxos de decisão de forma inteligente, sem depender de times técnicos ou altos investimentos.
              </p>
              <p className="text-lg text-gray-600">
                A plataforma da Fluxomind abstrai a complexidade do desenvolvimento com um motor de inteligência artificial, automações visuais e uma infraestrutura que isola e protege os dados de cada cliente. Tudo pensado para acelerar a entrega de valor real com responsabilidade e performance.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-600">
                Democratizar a construção de software com IA para empresas de qualquer tamanho, usando tecnologia no-code, metadados e arquitetura segura.
              </p>
            </div>

            {/* Visão */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-600">
                Ser a principal plataforma IA-First da América Latina, referência em acessibilidade, eficiência e impacto empresarial com inteligência artificial.
              </p>
            </div>

            {/* Valores */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Clareza e arquitetura em primeiro lugar</li>
                <li>• Inovação orientada a impacto real</li>
                <li>• Responsabilidade com dados e confiança</li>
                <li>• Simplicidade que entrega profundidade</li>
                <li>• Respeito ao tempo e autonomia dos usuários</li>
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
              Nossa abordagem combina IA generativa, modelagem baseada em metadados e uma experiência de construção visual para que empresas possam criar e evoluir seus próprios sistemas sem depender de desenvolvedores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Generativa</h3>
              <p className="text-gray-600">
                Tecnologia avançada de inteligência artificial que permite criação automática de conteúdo e soluções personalizadas.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Metadados</h3>
              <p className="text-gray-600">
                Modelagem inteligente baseada em metadados que facilita a criação e manutenção de sistemas complexos.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Arquitetura Segura</h3>
              <p className="text-gray-600">
                Cada camada da plataforma foi pensada para ser extensível, segura e pronta para escala empresarial.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Desde o fluxo de automações até a forma como dados e layouts são definidos semanticamente, tudo foi projetado para máxima eficiência e facilidade de uso.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/Logo SVG/logo-dark.svg" alt="FluxoMind" className="h-8 w-auto" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {currentYear} Fluxomind — Plataforma IA-First no-code para empresas de qualquer tamanho.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
