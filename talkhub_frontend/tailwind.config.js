module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#3B82F6', 
        accent: '#F59E0B', 
        neutral: '#9CA3AF', 
        'base-100': '#FFFFFF', 
        'base-200': '#F9FAFB', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(20%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateY(10%)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
        slideInUp: 'slideInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  darkMode: 'class',
};