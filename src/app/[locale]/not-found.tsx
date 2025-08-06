import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('error');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
      <div className="flex flex-col items-center max-w-md p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('notFoundTitle')}</h2>
        <p className="text-gray-600 mb-8">
          {t('notFoundDescription')}
        </p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
