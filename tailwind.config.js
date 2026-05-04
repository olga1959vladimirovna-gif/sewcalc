/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#2b231a',
        bg: '#f7f3ed',
        surface: '#ede8df',
        accent: '#b8862a',
        accent2: '#d4a54a',
        muted: '#9a8068',
        'text-main': '#3d3128',
        border: '#d8cfbf',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
