import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Fluxomind</h1>
        <p className="text-xl mb-8">Escolha seu idioma / Choose your language</p>
        
        <div className="flex justify-center space-x-6">
          <Link href="/pt" 
                className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Português
          </Link>
          <Link href="/en"
                className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
