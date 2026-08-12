/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        surface: '#FFFFFF',
        ink: '#161A2E',
        inkmute: '#565B77',
        navy: {
          DEFAULT: '#1C2B5C',
          deep: '#0F1830',
          soft: '#E9EDF7',
        },
        violet: {
          DEFAULT: '#8778E0',
          soft: '#EFECFC',
          deep: '#5B4CB8',
        },
        teal: {
          DEFAULT: '#159E82',
          soft: '#E1F5EF',
          deep: '#0D6E5C',
        },
        amber: {
          DEFAULT: '#E2A73B',
          soft: '#FBF0DA',
          deep: '#A8721E',
        },
        coral: {
          DEFAULT: '#DD6B58',
          soft: '#FBE7E2',
          deep: '#A9432F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(22,26,46,0.04), 0 8px 24px rgba(22,26,46,0.06)',
        lift: '0 4px 8px rgba(22,26,46,0.05), 0 16px 40px rgba(22,26,46,0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(6px,-10px)' },
        },
        dash: {
          to: { strokeDashoffset: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
