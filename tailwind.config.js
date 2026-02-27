/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          magenta: '#BE3455', // Viva Magenta (Trend & Visual Impact)
          red: '#E63946', // Strong Red (CTA)
          coral: '#FF7F50', // Coral
          peach: '#FFDAB9', // Peach
          blue: '#1D4ED8', // Blue (Trust/Stability)
          neutral: '#FFF5F0', // Warm Neutral background
          dark: '#1F2937', // Text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(190, 52, 85, 0.1), 0 2px 4px -1px rgba(190, 52, 85, 0.06)', // Soft magenta shadow
        'glow': '0 0 15px rgba(230, 57, 70, 0.4)', // Red glow for CTA
      }
    },
  },
  plugins: [],
}