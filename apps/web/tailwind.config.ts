import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: {
          950: 'rgb(var(--app-bg-rgb) / <alpha-value>)',
          900: 'rgb(var(--app-teal-rgb) / <alpha-value>)',
          850: 'rgb(var(--app-teal-rgb) / <alpha-value>)'
        },
        cyan: {
          200: 'rgb(var(--app-cyan-rgb) / <alpha-value>)',
          300: 'rgb(var(--app-aqua-rgb) / <alpha-value>)',
          400: 'rgb(var(--app-aqua-rgb) / <alpha-value>)',
          500: 'rgb(var(--app-teal-rgb) / <alpha-value>)',
          600: 'rgb(var(--app-teal-rgb) / <alpha-value>)',
          700: 'rgb(var(--app-teal-rgb) / <alpha-value>)'
        },
        silver: {
          50: 'rgb(var(--app-fg-rgb) / <alpha-value>)',
          100: 'rgb(var(--app-fg-rgb) / <alpha-value>)',
          200: 'rgb(var(--app-muted-rgb) / <alpha-value>)',
          300: 'rgb(var(--app-muted-rgb) / <alpha-value>)',
          500: 'rgb(var(--app-muted-rgb) / <alpha-value>)'
        },
        signal: {
          green: '#8cffc7',
          red: '#ff6b6b'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: [
          'Rajdhani',
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ]
      },
      boxShadow: {
        cyan: '0 0 36px rgb(var(--app-cyan-rgb) / 0.3)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.34)'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.42' },
          '50%': { opacity: '0.82' }
        }
      },
      animation: {
        scan: 'scan 4.8s linear infinite',
        pulseGlow: 'pulseGlow 3.2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}

export default config
