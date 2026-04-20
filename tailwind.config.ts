import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        muted: 'var(--color-text-secondary)',
        paper: 'var(--color-paper)',
        line: 'var(--color-hairline)',
        gold: {
          DEFAULT: 'var(--color-gold)',
          dim: 'var(--color-gold-dim)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        label: ['var(--font-label)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        measure: '680px',
      },
      transitionDuration: {
        link: '200ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
