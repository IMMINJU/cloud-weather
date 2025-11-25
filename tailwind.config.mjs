const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Weather styles - sunny
    'bg-gradient-to-br',
    'from-yellow-400/90',
    'via-orange-400/90',
    'to-orange-500/90',
    'border-yellow-300/80',
    'text-yellow-900',
    'bg-yellow-200/90',
    'shadow-yellow-500/50',
    // Weather styles - cloudy
    'from-slate-300/90',
    'via-gray-400/90',
    'to-slate-400/90',
    'border-slate-300/80',
    'text-slate-900',
    'bg-slate-200/90',
    'shadow-slate-400/50',
    // Weather styles - overcast
    'from-gray-500/90',
    'via-slate-600/90',
    'to-gray-600/90',
    'border-gray-400/80',
    'text-white',
    'bg-gray-300/90',
    'text-gray-900',
    'shadow-gray-600/50',
    // Weather styles - rainy
    'from-blue-600/90',
    'via-indigo-700/90',
    'to-blue-700/90',
    'border-blue-500/80',
    'bg-blue-200/90',
    'text-blue-900',
    'shadow-blue-700/50',
    // Weather styles - stormy
    'from-purple-800/90',
    'via-indigo-900/90',
    'to-slate-900/90',
    'border-purple-700/80',
    'bg-purple-200/90',
    'text-purple-900',
    'shadow-purple-900/50',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shake': 'shake 0.5s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-slide-up': 'fadeSlideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeSlideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
