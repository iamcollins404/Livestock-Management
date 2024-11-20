/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff624d',
        'primary-dark': '#e54935',
        'primary-light': '#ff7a69',
      },
    },
  },
  plugins: [],
};