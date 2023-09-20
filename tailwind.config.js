/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
        profile: 'max-content 1fr max-content',
      },
      maxWidth: {
        app: '700px',
      },
      colors: {
        grayTableCell: '#E7E3E2',
        grayTableTitle: '#7C7C8A',
        gray600: '#3C4448',
        gray700: '#2D3132',
        selectiveYellow: '#FFBC00',
        blueLagoon: '#006667',

        emerald: {
          25: '#F7FCFC',
        },
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
      },
      borderWidth: {
        6: '6px',
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightIn: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightOut: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateY(-2px)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightIn: 'slideRightIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightOut: 'slideRightOut 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
