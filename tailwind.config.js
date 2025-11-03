/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        jungle: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bde4c9',
          300: '#8fcfa4',
          400: '#5bb075',
          500: '#3d8f52',
          600: '#2f6f3f',
          700: '#265833',
          800: '#20462a',
          900: '#1a3822',
        },
      },
    },
  },
  plugins: [],
}
