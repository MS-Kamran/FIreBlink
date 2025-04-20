/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b1900',
        secondary: '#ff4c00',
        'text-primary': '#2D3748',
        'text-secondary': '#4A5568',
        'text-light': '#718096'
      }
    },
  },
  plugins: [],
}

