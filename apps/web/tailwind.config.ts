import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          950: '#02080c',
          900: '#07151b',
          850: '#10242c'
        },
        cyan: {
          200: '#8de1e8',
          300: '#76c2d0',
          400: '#45acbf',
          500: '#298ea5',
          600: '#1a6b80',
          700: '#123f4e'
        },
        silver: {
          50: '#f8fafc',
          100: '#eef2f4',
          200: '#d8d9dd',
          300: '#c7d1d6',
          500: '#8da0aa'
        },
        signal: {
          green: '#8cffc7',
          red: '#ff6b6b'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Rajdhani', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        cyan: '0 0 36px rgba(141, 225, 232, 0.3)',
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
