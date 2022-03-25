module.exports = {
  mode : 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  content: ["./src/**/*.{html,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor : theme => ({
        'brand-color': '#818383'
      }),
     
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
