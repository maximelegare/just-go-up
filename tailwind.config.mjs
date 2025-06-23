const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        clamp(value) {
          // load font sizes from theme
          const sizes = theme('fontSize')

          // parse the value passed in from class name
          // split it by "-" and compare pieces to fontSize values
          const split = value.split('-').map((v) => (sizes[v] ? sizes[v]['0'] : v))

          // return a clamped font-size
          return {
            fontSize: `clamp(${split[0]}, ${split[1]}, ${split[2]})`,
          }
        },
      })
    }),
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '12rem',
        DEFAULT: '1rem',
        lg: '10rem',
        md: '6rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      boxShadow: {
        "input-focus": "0 0 6px 3px rgba(0, 0, 0, 0.2), 0 0 8px 2px hsl(var(--accent))"
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        globals:{
          DEFAULT:'hsl(var(--globals-background))',
          foreground:'hsl(var(--globals-foreground))'
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        button:{
          foreground:'hsl(var(--button-foreground))',
          "foreground-hover":'hsl(var(--button-foreground-hover))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',

            h1: {
              fontWeight: '400',
              letterSpacing: "0.05em"
            },
            h2: {
              // fontSize: '2.3rem',
              fontWeight: '400',
              lineheight: "0",
              letterSpacing: "0.15em",
              opacity: "90%"
            },
            h3: {
              // fontSize: '1.9rem',
              fontWeight: '400',
            },
            h4: {
              // fontSize: '1.3rem',
              fontWeight: '800',
              letterSpacing: "0.14em",
              opacity: "90%"

            },
            h5: {
              // fontSize: '0.9rem',
              fontWeight: '600',
              opacity: "90%",
              letterSpacing: "0.15em"
            },
            h6: {
              // fontSize: '0.9rem',
              fontWeight: '400',
              opacity: "90%",
              letterSpacing: "0.15em"
              
            },
            label: {
              fontWeight: '600',
              opacity: "90%",
              letterSpacing: "0.15em"
            },
            a: {
              fontSize: "1.2em",
              fontWeight: "400",
              letterSpacing: "0.15em"
            },
            p: {
              fontSize: '1rem',
              fontWeight: '300',
              opacity: '0.85',
            },
            li: {
              fontSize: '1rem',
              fontWeight: '300',
              opacity: '0.85',
            },
          },
        },
      }),
    },
  },
}
