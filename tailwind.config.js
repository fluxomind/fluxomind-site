/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marca Fluxomind — alinhado aos design tokens (#2B66DD)
        primary: {
          DEFAULT: '#2B66DD',
          dark: '#1E4FB0',
          light: '#4DABF7',
        },
        secondary: {
          DEFAULT: '#333333',
          light: '#666666',
        },
        ink: '#0E0F11',
        charcoal: '#1A1B1E',
        sky: '#4DABF7',
        slate: '#475569',
        mute: '#6B7280',
        line: '#E6EAF1',
        panel: '#F5F8FC',
        success: '#10B981',
        warn: '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
