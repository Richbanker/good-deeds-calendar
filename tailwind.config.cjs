/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Цветовые классы
    'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300',
    'text-yellow-800', 'text-yellow-900',
    'border-yellow-400',

    'bg-blue-100', 'bg-blue-200',
    'text-blue-800', 'text-blue-900',
    'border-blue-200',

    'hover:bg-yellow-50', 'hover:bg-yellow-300',
    'hover:bg-blue-200',

    // Utility классы
    'font-bold', 'rounded-xl', 'rounded-lg', 'border-2',
    'transition-all', 'duration-200', 'duration-150',
    'hover:scale-110', 'active:scale-95',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fef3c7', // светло-жёлтый
        accent: '#bae6fd',  // голубой
        success: '#bbf7d0', // зелёный
      },
    },
  },
  plugins: [],
};
