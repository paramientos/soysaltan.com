/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./blog/**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              '&:hover': {
                color: theme('colors.primary.500'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              'scroll-margin-top': theme('spacing.24'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.400'),
              color: theme('colors.gray.700'),
            },
            code: {
              color: theme('colors.fuchsia.600'),
              fontWeight: '600',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            strong: { color: theme('colors.gray.900') },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': { color: theme('colors.primary.300') },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.fuchsia.400'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            strong: { color: theme('colors.gray.100') },
          },
        },
      }),
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

