/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'hero-code-before': {
          '0%, 30%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '34%': { opacity: '0', transform: 'translateY(-6px) scale(0.99)' },
          '34.01%, 72%': { opacity: '0', transform: 'translateY(-6px)' },
          '76%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '76.01%, 100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'hero-code-after': {
          '0%, 30%': { opacity: '0', transform: 'translateY(8px) scale(0.99)' },
          '34%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '34.01%, 68%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '72%': { opacity: '0', transform: 'translateY(-6px) scale(0.99)' },
          '72.01%, 100%': { opacity: '0', transform: 'translateY(8px)' },
        },
        'hero-title-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'hero-cursor-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'hero-sensitive-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 63, 94, 0.35)' },
          '50%': { boxShadow: '0 0 0 6px rgba(244, 63, 94, 0)' },
        },
        'hero-after-sql-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hub-shield-pop': {
          '0%': { transform: 'scale(0.82)', opacity: '0.5' },
          '45%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'hub-all-tools-chevron': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(5px)', opacity: '1' },
        },
        'hub-all-tools-hint': {
          '0%, 100%': { opacity: '0.72' },
          '50%': { opacity: '1' },
        },
        'progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.9' },
          '100%': { transform: 'translateY(600%)', opacity: '0' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'token-pop': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'badge-slide': {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'hero-code-before': 'hero-code-before 14s ease-in-out infinite',
        'hero-code-after': 'hero-code-after 14s ease-in-out infinite',
        'hero-title-shimmer': 'hero-title-shimmer 4s linear infinite',
        'hero-cursor-blink': 'hero-cursor-blink 1.1s steps(1, end) infinite',
        'hero-sensitive-pulse': 'hero-sensitive-pulse 2s ease-in-out infinite',
        'hero-after-sql-in': 'hero-after-sql-in 0.5s ease-out forwards',
        'hub-shield-pop': 'hub-shield-pop 0.55s ease-out forwards',
        'hub-all-tools-chevron': 'hub-all-tools-chevron 1.4s ease-in-out infinite',
        'hub-all-tools-hint': 'hub-all-tools-hint 2.2s ease-in-out infinite',
        'progress': 'progress 5s linear forwards',
        'float-y': 'float-y 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'fade-up': 'fade-up 0.35s ease-out forwards',
        'scan-line': 'scan-line 0.7s ease-in forwards',
        'progress-fill': 'progress-fill 4.5s linear forwards',
        'token-pop': 'token-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'badge-slide': 'badge-slide 0.3s ease-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      boxShadow: {
        'pro': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'pro-md': '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'pro-lg': '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
}

