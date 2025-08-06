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
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.about')}
                </a>
                <a href="#tecnologia" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.technology')}
                </a>
                <a href="#valores" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.values')}
                </a>
              </nav>
              <LanguageSwitcher />
            </div>
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
              {t('hero.title1')}{' '}
              <span className="text-blue-600">{t('hero.title2')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle1')}
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              {t('hero.subtitle2')}
            </p>
          </div>
        </div>
      </section>

      {/* Sobre a Fluxomind */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.platform')}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h3>
              <p className="text-gray-600">
                {t('mission.description')}
              </p>
            </div>

            {/* Visão */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.title')}</h3>
              <p className="text-gray-600">
                {t('vision.description')}
              </p>
            </div>

            {/* Valores */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('values.title')}</h3>
              <ul className="text-gray-600 space-y-2">
                {t.raw('values.list').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
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
              {t('technology.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
              {t('technology.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('technology.generativeAI.title')}</h3>
              <p className="text-gray-600">
                {t('technology.generativeAI.description')}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('technology.metadata.title')}</h3>
              <p className="text-gray-600">
                {t('technology.metadata.description')}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('technology.secureArch.title')}</h3>
              <p className="text-gray-600">
                {t('technology.secureArch.description')}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('technology.footer')}
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
                {t('globalFooter.copyright', { year: currentYear })}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
