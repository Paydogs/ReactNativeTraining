/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#ffcdc8',
          300: '#fea9a1',
          400: '#fb766b',
          500: '#f24a3d',
          600: '#e02d1f',
          700: '#bc2216',
          800: '#9b2016',
          900: '#802119',
        },
        surface: {
          light: '#ffffff',
          dark: '#1a1a2e',
        },
        background: {
          light: '#f5f5f7',
          dark: '#0f0f1a',
        },
        card: {
          light: '#ffffff',
          dark: '#242438',
        },
        text: {
          light: '#1f2937',
          dark: '#f9fafb',
        },
        muted: {
          light: '#6b7280',
          dark: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
};
