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
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
