'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const changeLocale = (newLocale: string) => {
    // Remove current locale from path
    const segments = pathname.split('/');
    const newPath = segments.length > 2 ? 
      `/${newLocale}/${segments.slice(2).join('/')}` : 
      `/${newLocale}`;
      
    router.push(newPath);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{locale.toUpperCase()}</span>
        <svg
          className={`h-4 w-4 transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 w-24 bg-white rounded-md shadow-lg z-50">
          <button
            className={`block px-3 py-1 text-sm ${locale === 'en' ? 'text-blue-600 font-medium' : 'text-gray-700'} hover:bg-gray-100 w-full text-right`}
            onClick={() => changeLocale('en')}
          >
            EN
          </button>
          <button
            className={`block px-3 py-1 text-sm ${locale === 'pt' ? 'text-blue-600 font-medium' : 'text-gray-700'} hover:bg-gray-100 w-full text-right`}
            onClick={() => changeLocale('pt')}
          >
            PT
          </button>
        </div>
      )}
    </div>
  );
}
