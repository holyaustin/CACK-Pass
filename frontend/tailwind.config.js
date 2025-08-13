// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',    // Green
        secondary: '#F97316',  // Orange
        success: '#22C55E',
        danger: '#EF4444',
        dark: '#1F2937',
        light: '#F3F4F6',
      },
      backgroundColor: {
        DEFAULT: '#F3F4F6',
        body: '#F9FAFB',
      },
    },
  },
  plugins: [],
}